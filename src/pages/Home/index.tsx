import { Image, View } from "react-native"

import { Button } from "@/components/Button"
import { Option } from "@/components/Option"
import { PlayerOfTheMatch } from "@/components/PlayerOfTheMatch"

import { getCurrentDate } from "@/utils/getCurrentDate"

import vs from "@/assets/vs.png"

import {
  Container,
  DateToday,
  ContentMatchesList,
  ContentOptions,
} from "./styles"

export function Home() {
  const currentDate = getCurrentDate()

  return (
    <Container>
      <DateToday>{currentDate}</DateToday>

      <ContentMatchesList>
        <PlayerOfTheMatch />
        <Image source={vs} width={50} />
        <PlayerOfTheMatch variant="player-two" isWinner />
      </ContentMatchesList>

      <ContentOptions>
        <Option />
        <Option label="Suicídio" />
      </ContentOptions>

      <Button label="Salvar" />
    </Container>
  )
}
