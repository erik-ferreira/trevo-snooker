import { Image } from "react-native"

import { Button } from "@/components/Button"
import { Option } from "@/components/Option"
import { PlayerOfTheMatch } from "@/components/PlayerOfTheMatch"

import vs from "@/assets/vs.png"

import { Container, DateToday, ContentMatchesList } from "./styles"
import { View } from "lucide-react-native"

export function Home() {
  return (
    <Container>
      <DateToday>07/02/2024</DateToday>

      <ContentMatchesList>
        <PlayerOfTheMatch />
        <Image source={vs} width={50} />
        <PlayerOfTheMatch variant="player-two" isWinner />
      </ContentMatchesList>

      <Option />
      <Option label="Suicídio" />

      <Button label="Salvar" />
    </Container>
  )
}
