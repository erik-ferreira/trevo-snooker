import { View, Text, FlatList, Image } from "react-native"

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

const matches = [
  {
    matchNumber: 1,
    playerOneSrc: "",
    playerTwoSrc: "",
    winningPlayerId: 1,
    isSuicide: false,
    isSnookerHood: false,
  },
  {
    matchNumber: 2,
    playerOneSrc: "",
    playerTwoSrc: "",
    winningPlayerId: 1,
    isSuicide: false,
    isSnookerHood: false,
  },
]

export function Matches() {
  return (
    <Container>
      <FlatList
        data={matches}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <MatchContent key={item?.matchNumber}>
            <MatchNumber>{item?.matchNumber}º partida</MatchNumber>

            <MatchContentPlayers>
              <PlayerOfTheMatch isReadOnly />
              <Image source={vs} width={50} />
              <PlayerOfTheMatch variant="player-two" isReadOnly isWinner />
            </MatchContentPlayers>

            <MatchContentOptions>
              <Option label="Capote" />
              <Option label="Suicídio" />
            </MatchContentOptions>
          </MatchContent>
        )}
        ItemSeparatorComponent={Divider}
      />
    </Container>
  )
}
