import { useEffect, useState } from "react"
import Toast from "react-native-toast-message"
import { useRoute } from "@react-navigation/native"
import { View, Text, FlatList, Image } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { api } from "@/services/api"

import { players } from "@/defaults/players"
import { MatchDTO } from "@/dtos/MatchDTO"

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
import { PlayerDTO } from "@/dtos/PlayerDTO"

interface RouteProps {
  date: string
}

interface ReturnGetListMatchesDates {
  matches: MatchDTO[]
}

interface NewMatchesDTO extends MatchDTO {
  playerOne: PlayerDTO
  playerTwo: PlayerDTO
}

export function Matches() {
  const route = useRoute()
  const { date } = route.params as RouteProps

  const [matches, setMatches] = useState<NewMatchesDTO[]>([])
  const [loadingMatches, setLoadingMatches] = useState(false)

  async function onGetListMatches() {
    try {
      setLoadingMatches(true)

      const response = await api.get<ReturnGetListMatchesDates>("/matches", {
        params: {
          date,
        },
      })

      console.log(date)
      console.log(response.data.matches.length)
    } catch (err) {
      showToast.error("Não foi possível carregar a lista das datas de partidas")
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
        renderItem={({ item, index }) => (
          <MatchContent key={item?.id}>
            <MatchNumber>{index + 1}º partida</MatchNumber>

            {/* <MatchContentPlayers>
              <PlayerOfTheMatch
                player={item.playerOne}
                variant="player-one"
                isReadOnly
                isWinner={item.playerOneId === item.playerWinnerId}
                disabled
              />
              <Image source={vs} width={50} />
              <PlayerOfTheMatch
                player={item.playerTwo}
                variant="player-two"
                isReadOnly
                isWinner={item.playerTwoId === item.playerWinnerId}
                disabled
              />
            </MatchContentPlayers> */}

            <MatchContentOptions>
              <Option label="Capote" isChecked={item.isCapote} disabled />
              <Option label="Suicídio" isChecked={item.isSuicide} disabled />
            </MatchContentOptions>
          </MatchContent>
        )}
        ItemSeparatorComponent={Divider}
      />
    </Container>
  )
}
