import { Button } from "@/components/Button"
import { PlayerOfTheMatch } from "@/components/PlayerOfTheMatch"

import { Container, DateToday } from "./styles"

interface HomeProps {}

export function Home({ ...rest }: HomeProps) {
  return (
    <Container>
      <DateToday>07/02/2024</DateToday>

      <PlayerOfTheMatch />

      <Button label="Salvar" />
    </Container>
  )
}
