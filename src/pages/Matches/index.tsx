import { useEffect, useState } from "react"
import Toast from "react-native-toast-message"
import { useRoute } from "@react-navigation/native"
import { View, Text, FlatList, Image } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { api } from "@/services/api"

import { players } from "@/defaults/players"

import { MatchesByUniqueDate } from "@/dtos/MatchDTO"

import { Option } from "@/components/Option"
import { Divider } from "@/components/Divider"
import { PlayerOfTheMatch } from "@/components/PlayerOfTheMatch"

import { showToast } from "@/utils/showToast"

import vs from "@/assets/vs.png"

import {
  Container,
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
  const [matches, setMatches] = useState<MatchesByUniqueDate[]>([])

  async function onGetListMatches() {
    try {
      setLoadingMatches(true)

      const response = await api.get<ReturnGetListMatchesDates>("/matches", {
        params: {
          date,
        },
      })

      setMatches(response.data.matches)
    } catch (err) {
      showToast.error("Não foi possível carregar a lista das partidas")
    } finally {
      setLoadingMatches(false)
    }
  }

  useEffect(() => {
    onGetListMatches()
  }, [])

  return (
    <Container>
      <FlatList
        data={matches}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => {
          const [playerOne, playerTwo] = item.players

          return (
            <MatchContent key={item?.id}>
              <MatchNumber>{index + 1}º partida</MatchNumber>

              <MatchContentPlayers>
                <PlayerOfTheMatch
                  player={playerOne.player}
                  variant="playerOne"
                  isReadOnly
                  isWinner={item.winnerPlayerId === playerOne.playerId}
                />

                <Image source={vs} width={50} />

                <PlayerOfTheMatch
                  player={playerTwo.player}
                  variant="playerTwo"
                  isReadOnly
                  isWinner={item.winnerPlayerId === playerTwo.playerId}
                />
              </MatchContentPlayers>

              <MatchContentOptions>
                <Option label="Capote" isChecked={item.isCapote} disabled />
                <Option label="Suicídio" isChecked={item.isSuicide} disabled />
              </MatchContentOptions>
            </MatchContent>
          )
        }}
        ItemSeparatorComponent={Divider}
      />
    </Container>
  )
}
