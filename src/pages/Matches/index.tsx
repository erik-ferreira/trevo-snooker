import { View, Text, FlatList, Image } from "react-native"

import { Option } from "@/components/Option"
import { Divider } from "@/components/Divider"
import { PlayerOfTheMatch } from "@/components/PlayerOfTheMatch"

import vs from "@/assets/vs.png"

import {
  Container,
  ContentSection,
  MatchNumber,
  ContentMatch,
  ContentOptionsByMatch,
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
          <ContentSection key={item?.matchNumber}>
            <MatchNumber>{item?.matchNumber}º partida</MatchNumber>
            <ContentMatch>
              <PlayerOfTheMatch isReadOnly />
              <Image source={vs} width={50} />
              <PlayerOfTheMatch variant="player-two" isReadOnly isWinner />
            </ContentMatch>

            <ContentOptionsByMatch>
              <Option label="Capote" />
              <Option label="Suicídio" />
            </ContentOptionsByMatch>
          </ContentSection>
        )}
        ItemSeparatorComponent={Divider}
      />
    </Container>
  )
}
