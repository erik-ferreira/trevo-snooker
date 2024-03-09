import { useState, useEffect, JSX } from "react"
import { useTheme } from "styled-components/native"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { players } from "@/defaults/players"
import { storageKey } from "@/constants/storage"

import { Icon } from "@/components/Icon"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { MessageNotFound } from "@/components/MessageNotFound"

import { MatchesByUniqueDateLocal, ValueTable } from "@/dtos/MatchDTO"

import { showToast } from "@/utils/showToast"
import { calculatePlayersStatistics } from "@/utils/calculatePlayersStatistics"

import {
  Container,
  ContentTitle,
  Title,
  ButtonPreviewMode,
  Table,
  Line,
  Box,
  InfoBox,
  AvatarContent,
  AvatarLetter,
} from "./styles"

export function Statistics() {
  const { colors } = useTheme()

  const [previewMode, setPreviewMode] = useState<"vertical" | "horizontal">(
    "horizontal"
  )
  const isSelectedHorizontal = previewMode === "horizontal"
  const isSelectedVertical = previewMode === "vertical"

  const tableHeader = ["F", "V", "D", "VC", "DC", "VS", "DS", "P"]
  const [loadingPlayersStatistics, setLoadingPlayersStatistics] =
    useState(false)
  const [playersStatistics, setPlayersStatistics] = useState<ValueTable[]>([])

  async function onGetPlayersStatistics() {
    try {
      setLoadingPlayersStatistics(true)

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
          numberOfMatchesWonPerCapote,
          numberOfMatchesLosePerCapote,
          numberOfMatchesWonPerSuicide,
          numberOfMatchesLosePerSuicide,
          points,
        } = player.statistics

        const firstLetterPlayerName = player.name.charAt(0).toUpperCase()

        return [
          <AvatarContent slugAvatar={player.slugAvatar}>
            <AvatarLetter>{firstLetterPlayerName}</AvatarLetter>
          </AvatarContent>,
          numberOfMatchesWon,
          numberOfMatchesLose,
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
    } finally {
      setLoadingPlayersStatistics(false)
    }
  }

  async function onTryGetListPlayersAgain() {
    onGetPlayersStatistics()
  }

  useEffect(() => {
    onGetPlayersStatistics()
  }, [])

  return (
    <Container>
      {playersStatistics.length !== 0 && (
        <ContentTitle>
          <Title>Visualizar tabela em modo:</Title>

          <ButtonPreviewMode
            isSelected={isSelectedHorizontal}
            onPress={() => setPreviewMode("horizontal")}
          >
            <Icon name="RectangleHorizontal" color={colors.slate[200]} />
          </ButtonPreviewMode>

          <ButtonPreviewMode
            isSelected={isSelectedVertical}
            onPress={() => setPreviewMode("vertical")}
          >
            <Icon name="RectangleVertical" color={colors.slate[200]} />
          </ButtonPreviewMode>
        </ContentTitle>
      )}

      {loadingPlayersStatistics ? (
        <LoadingSpinner />
      ) : playersStatistics.length === 0 ? (
        <MessageNotFound
          message="Nenhuma estatística encontrada"
          onTryAgain={onTryGetListPlayersAgain}
        />
      ) : (
        <Table direction={previewMode}>
          <Line direction={previewMode}>
            {tableHeader.map((item) => (
              <Box key={item} isHead>
                <InfoBox>{item}</InfoBox>
              </Box>
            ))}
          </Line>

          {playersStatistics.map((player, index) => {
            return (
              <Line key={index} direction={previewMode}>
                {player.map((stats, index) => (
                  <Box key={index}>
                    {typeof stats === "number" ? (
                      <InfoBox>{stats}</InfoBox>
                    ) : (
                      stats
                    )}
                  </Box>
                ))}
              </Line>
            )
          })}
        </Table>
      )}
    </Container>
  )
}
