import * as XLSX from "xlsx"
import { useState } from "react"
import { View } from "react-native"
import Modal from "react-native-modal"
import * as Sharing from "expo-sharing"
import * as FileSystem from "expo-file-system"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { players } from "@/defaults/players"
import { storageKey } from "@/constants/storage"

import { Button } from "@/components/Button"

import { StatisticsDTO } from "@/dtos/StatisticsDTO"
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

  const [playersStatistics, setPlayersStatistics] = useState<ValueTable[]>([])

  async function onGetPlayersStatistics() {
    try {
      const storage = await AsyncStorage.getItem(storageKey)

      if (!storage) {
        throw new Error("Não foi possível buscar os dados do storage")
      }

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
      let message = "Não foi possível carregar a lista das partidas"

      if (err instanceof Error) {
        message = err.message
      }

      showToast.error(message)
    }
  }

  async function handleGenerateFile() {
    await onGetPlayersStatistics()

    // playersStatistics.map((player) => {
    //   return [
    //     player[0],
    //     player[1],
    //     player[2],
    //     player[3],
    //     player[4],
    //     player[5],
    //     player[6],
    //     player[7],
    //     player[8],
    //     player[9],
    //   ]
    // })

    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.aoa_to_sheet([
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
      ...playersStatistics,
    ])

    // numberOfMatchesWon,
    // numberOfMatchesLose,
    // numberOfMatchesWonPerNormal,
    // numberOfMatchesLosePerNormal,
    // numberOfMatchesWonPerCapote,
    // numberOfMatchesLosePerCapote,
    // numberOfMatchesWonPerSuicide,
    // numberOfMatchesLosePerSuicide,
    // points,

    XLSX.utils.book_append_sheet(wb, ws, "SheetJS", true)

    const base64 = XLSX.write(wb, { type: "base64" })
    const filename = FileSystem.documentDirectory + "teste.xlsx"

    FileSystem.writeAsStringAsync(filename, base64, {
      encoding: FileSystem.EncodingType.Base64,
    }).then(() => {
      Sharing.shareAsync(filename)
    })
  }

  return (
    <Container>
      <Button label="Limpar storage" onPress={requestConfirmClearStorage} />
      <Button label="Gerar arquivo" onPress={handleGenerateFile} />

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
