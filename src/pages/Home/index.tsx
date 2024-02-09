import { Image } from "react-native"

import { Button } from "@/components/Button"
import { PlayerOfTheMatch } from "@/components/PlayerOfTheMatch"

import vs from "@/assets/vs.png"

import { Container, DateToday, ContentMatchesList } from "./styles"

export function Home() {
  return (
    <Container>
      <DateToday>07/02/2024</DateToday>

      <ContentMatchesList>
        <PlayerOfTheMatch />
        <Image source={vs} width={50} />
        <PlayerOfTheMatch variant="player-two" isWinner />
      </ContentMatchesList>

      <Button label="Salvar" />
    </Container>
  )
}
