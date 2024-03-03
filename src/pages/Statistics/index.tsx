import { View } from "react-native"
import { useState, useEffect, JSX } from "react"
import { useTheme } from "styled-components/native"

import { api } from "@/services/api"

import { Icon } from "@/components/Icon"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { MessageNotFound } from "@/components/MessageNotFound"

import { PlayerStatisticsProps } from "@/dtos/PlayerDTO"

import { showToast } from "@/utils/showToast"

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

type ValueTable = [JSX.Element, number, number, number, number, number, number]

interface ReturnGetPlayersStatistics {
  players: PlayerStatisticsProps[]
}

export function Statistics() {
  const { colors } = useTheme()

  const [previewMode, setPreviewMode] = useState<"vertical" | "horizontal">(
    "horizontal"
  )
  const isSelectedHorizontal = previewMode === "horizontal"
  const isSelectedVertical = previewMode === "vertical"

  const tableHeader = ["F", "V", "D", "CF", "CS", "S", "P"]
  const [loadingPlayersStatistics, setLoadingPlayersStatistics] =
    useState(false)
  const [playersStatistics, setPlayersStatistics] = useState<ValueTable[]>([])

  async function onGetPlayersStatistics() {
    try {
      setLoadingPlayersStatistics(true)

      const response = await api.get<ReturnGetPlayersStatistics>(
        "/players/statistics"
      )

      const formatStatistics: ValueTable[] = response.data.players.map(
        (player) => {
          const {
            numberOfMatchesWon,
            numberOfMatchesLose,
            numberOfMatchesWonPerCapote,
            numberOfMatchesLosePerCapote,
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
            numberOfMatchesLosePerSuicide,
            points,
          ]
        }
      )

      setPlayersStatistics(formatStatistics)
    } catch (err) {
      showToast.error("Não foi possível carregar a lista das partidas")
    } finally {
      setLoadingPlayersStatistics(false)
    }
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
        <MessageNotFound message="Nenhuma estatística encontrada" />
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
