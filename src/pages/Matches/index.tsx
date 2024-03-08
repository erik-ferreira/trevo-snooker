import { Image } from "react-native"
import { useEffect, useState } from "react"
import { useRoute } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { players } from "@/defaults/players"
import { storageKey } from "@/constants/storage"

import {
  MatchesByUniqueDate,
  MatchesByUniqueDateLocal,
  MatchesNormalByUniqueDateLocal,
} from "@/dtos/MatchDTO"

import { Option } from "@/components/Option"
import { Divider } from "@/components/Divider"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { MessageNotFound } from "@/components/MessageNotFound"
import { PlayerOfTheMatch } from "@/components/PlayerOfTheMatch"

import { showToast } from "@/utils/showToast"

import vs from "@/assets/vs.png"

import {
  Container,
  ContentListMatches,
  MatchContent,
  MatchNumber,
  MatchContentPlayers,
  MatchContentOptions,
} from "./styles"

interface RouteProps {
  date: string
}

interface ReturnGetListMatchesDates {
  matches: MatchesByUniqueDate[]
}

export function Matches() {
  const route = useRoute()
  const { date } = route.params as RouteProps

  const [loadingMatches, setLoadingMatches] = useState(false)
  const [matches, setMatches] = useState<MatchesNormalByUniqueDateLocal[]>([])

  async function onGetListMatches() {
    try {
      if (!date) {
        throw new Error("Data não informada")
      }

      setLoadingMatches(true)

      const storage = await AsyncStorage.getItem(storageKey)

      if (!storage) {
        throw new Error("Não foi possível buscar as partidas do storage")
      }

      const formatPlayers = {} as any
      players.map((player) => {
        formatPlayers[player.id] = player
      })

      const matchesStorage = JSON.parse(storage) as MatchesByUniqueDateLocal[]

      const formatMatches: MatchesNormalByUniqueDateLocal[] =
        matchesStorage.map((match) => ({
          ...match,
          players: match.playersIds.map((playerId) => formatPlayers[playerId]),
        }))

      setMatches(formatMatches)
    } catch (err) {
      let message = "Não foi possível carregar a lista das partidas"

      if (err instanceof Error) {
        message = err.message
      }

      showToast.error(message)
    } finally {
      setLoadingMatches(false)
    }
  }

  useEffect(() => {
    onGetListMatches()
  }, [])

  return (
    <Container>
      {loadingMatches ? (
        <LoadingSpinner />
      ) : matches.length === 0 ? (
        <MessageNotFound message="Nenhuma partida encontrada" />
      ) : (
        <ContentListMatches
          data={matches}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            const [playerOne, playerTwo] = item.players

            return (
              <MatchContent key={item?.id}>
                <MatchNumber>{index + 1}º partida</MatchNumber>

                <MatchContentPlayers>
                  <PlayerOfTheMatch
                    player={playerOne}
                    variant="playerOne"
                    isReadOnly
                    isWinner={item.winnerPlayerId === playerOne.id}
                  />

                  <Image source={vs} width={50} />

                  <PlayerOfTheMatch
                    player={playerTwo}
                    variant="playerTwo"
                    isReadOnly
                    isWinner={item.winnerPlayerId === playerTwo.id}
                  />
                </MatchContentPlayers>

                <MatchContentOptions>
                  <Option label="Capote" isChecked={item.isCapote} disabled />
                  <Option
                    label="Suicídio"
                    isChecked={item.isSuicide}
                    disabled
                  />
                </MatchContentOptions>
              </MatchContent>
            )
          }}
          ItemSeparatorComponent={Divider}
        />
      )}
    </Container>
  )
}
