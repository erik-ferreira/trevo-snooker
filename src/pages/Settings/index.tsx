import * as XLSX from "xlsx"
import { useState } from "react"
import Modal from "react-native-modal"
import * as Sharing from "expo-sharing"
import * as FileSystem from "expo-file-system"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { players } from "@/defaults/players"
import { storageKey } from "@/constants/storage"

import { Button } from "@/components/Button"

import { MatchesByUniqueDateLocal } from "@/dtos/MatchDTO"

import { showToast } from "@/utils/showToast"
import { calculatePlayersStatistics } from "@/utils/calculatePlayersStatistics"

import {
  Container,
  modalStyle,
  ModalContent,
  ModalPicker,
  ModalHeader,
  ModalMessage,
  ContentButtons,
} from "./styles"

type ValueTable = [
  string,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number
]

export function Settings() {
  const [modalIsVisible, setModalIsVisible] = useState(false)

  function requestConfirmClearStorage() {
    setModalIsVisible(true)
  }

  function handleCloseModal() {
    setModalIsVisible(false)
  }

  async function handleClearStorage() {
    await AsyncStorage.clear()

    handleCloseModal()

    showToast.info("O storage foi limpo com sucesso!")
  }

  const [loadingStatistics, setLoadingStatistics] = useState(false)
  const [playersStatistics, setPlayersStatistics] = useState<ValueTable[]>([])

  async function onGetPlayersStatistics() {
    try {
      const storage = await AsyncStorage.getItem(storageKey)

      if (!storage) {
        showToast.info("Não foi possível buscar os dados do storage")

        return
      }
      setLoadingStatistics(true)

      const matchesStorage = JSON.parse(storage)

      const formatPlayers = [...players].map((player) => {
        const filterMatches = matchesStorage
          .map((match: MatchesByUniqueDateLocal) => {
            return match.playersIds.includes(player.id)
              ? {
                  matchId: match.id,
                  playerId: player.id,
                  match: {
                    id: match.id,
                    isCapote: match.isCapote,
                    isSuicide: match.isSuicide,
                    createdAt: match.createdAt,
                    winnerPlayerId: match.winnerPlayerId,
                  },
                }
              : null
          })
          .filter(Boolean)

        return {
          ...player,
          matches: filterMatches,
        }
      })

      const calculatePlayers = formatPlayers.map((player) =>
        calculatePlayersStatistics(player)
      )

      const playerFormatted: ValueTable[] = calculatePlayers.map((player) => {
        const {
          numberOfMatchesWon,
          numberOfMatchesLose,
          numberOfMatchesWonPerNormal,
          numberOfMatchesLosePerNormal,
          numberOfMatchesWonPerCapote,
          numberOfMatchesLosePerCapote,
          numberOfMatchesWonPerSuicide,
          numberOfMatchesLosePerSuicide,
          points,
        } = player.statistics

        return [
          player.name,
          numberOfMatchesWon,
          numberOfMatchesLose,
          numberOfMatchesWonPerNormal,
          numberOfMatchesLosePerNormal,
          numberOfMatchesWonPerCapote,
          numberOfMatchesLosePerCapote,
          numberOfMatchesWonPerSuicide,
          numberOfMatchesLosePerSuicide,
          points,
        ]
      })

      setPlayersStatistics(playerFormatted)
    } catch (err) {
      showToast.error("Não foi possível carregar a lista das partidas")

      setPlayersStatistics([])
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 1200))

      setLoadingStatistics(false)
    }
  }

  async function handleGenerateFile() {
    const wb = XLSX.utils.book_new()

    const rows: unknown[][] = [
      [
        "Jogador",
        "Vitórias",
        "Derrotas",
        "Vitórias normais",
        "Derrotas normais",
        "Vitórias capote",
        "Derrotas capote",
        "Vitórias suicídio",
        "Derrotas suicídio",
        "Pontos",
      ],
    ]

    if (playersStatistics) {
      rows.push(...playersStatistics)
    }

    const ws = XLSX.utils.aoa_to_sheet(rows)

    ws["!cols"] = [
      { wch: 16 },
      { wch: 10 },
      { wch: 10 },
      { wch: 14 },
      { wch: 14 },
      { wch: 14 },
      { wch: 14 },
      { wch: 14 },
      { wch: 14 },
      { wch: 8 },
    ]

    XLSX.utils.book_append_sheet(wb, ws, "SheetJS", true)

    const base64 = XLSX.write(wb, { type: "base64" })
    const filename = FileSystem.documentDirectory + "statistics.xlsx"

    FileSystem.writeAsStringAsync(filename, base64, {
      encoding: FileSystem.EncodingType.Base64,
    }).then(() => {
      Sharing.shareAsync(filename)
    })
  }

  return (
    <Container>
      <Button label="Limpar storage" onPress={requestConfirmClearStorage} />
      <Button
        label="Gerar dados"
        onPress={onGetPlayersStatistics}
        loading={loadingStatistics}
      />
      <Button
        label="Compartilhar arquivo"
        onPress={handleGenerateFile}
        disabled={playersStatistics?.length <= 0 || loadingStatistics}
      />

      <Modal
        isVisible={modalIsVisible}
        onSwipeComplete={handleCloseModal}
        onBackButtonPress={handleCloseModal}
        onBackdropPress={handleCloseModal}
        style={modalStyle}
        statusBarTranslucent
        swipeDirection={["down"]}
        propagateSwipe
      >
        <ModalContent>
          <ModalPicker />

          <ModalHeader>
            <ModalMessage>
              Você tem certeza que deseja limpar o storage?
            </ModalMessage>
          </ModalHeader>

          <ContentButtons>
            <Button
              label="Não"
              variant="secondary"
              isFullWidth={false}
              onPress={handleCloseModal}
            />
            <Button
              label="Sim"
              isFullWidth={false}
              onPress={handleClearStorage}
            />
          </ContentButtons>
        </ModalContent>
      </Modal>
    </Container>
  )
}
