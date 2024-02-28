import { useEffect, useState } from "react"
import Toast from "react-native-toast-message"
import { View, Text, FlatList, Image } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { players } from "@/defaults/players"
import { MatchDTO } from "@/dtos/MatchDTO"

import { Option } from "@/components/Option"
import { Divider } from "@/components/Divider"
import { PlayerOfTheMatch } from "@/components/PlayerOfTheMatch"

import vs from "@/assets/vs.png"

import {
  Container,
  MatchContent,
  MatchNumber,
  MatchContentPlayers,
  MatchContentOptions,
} from "./styles"
import { PlayerDTO } from "@/dtos/PlayerDTO"

interface NewMatchesDTO extends MatchDTO {
  playerOne: PlayerDTO
  playerTwo: PlayerDTO
}

export function Matches() {
  const [matches, setMatches] = useState<NewMatchesDTO[]>([])

  async function getListMatches() {
    try {
      const key = "@trevo-snooker"

      const value = await AsyncStorage.getItem(key)

      if (!value) {
        // await AsyncStorage.setItem(key, JSON.stringify(matches))

        throw new Error("Valor não encontrado")
      } else {
        const matches = JSON.parse(value) as MatchDTO[]

        const newMatches: NewMatchesDTO[] = matches.map((match) => {
          const playerOne = players.find(
            (player) => player.id === match.playerOneId
          ) as PlayerDTO
          const playerTwo = players.find(
            (player) => player.id === match.playerTwoId
          ) as PlayerDTO

          // console.log("playerOne", playerOne)
          // console.log("playerTwo", playerTwo)

          return {
            ...match,
            playerOne,
            playerTwo,
          }
        })

        setMatches(newMatches)
      }
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Ops...",
        text2: "Não foi possível buscar as partidas",
        visibilityTime: 2000,
      })
      console.log("problem", e)
    }
  }

  useEffect(() => {
    getListMatches()
  }, [])

  return (
    <Container>
      <FlatList
        data={matches}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <MatchContent key={item?.id}>
            <MatchNumber>{index + 1}º partida</MatchNumber>

            <MatchContentPlayers>
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
            </MatchContentPlayers>

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
