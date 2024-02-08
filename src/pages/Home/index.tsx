import { View, Text } from "react-native"

import { Container, Label, Label2, Label3 } from "./styles"

interface HomeProps {}

export function Home({ ...rest }: HomeProps) {
  return (
    <Container>
      <Label>Home</Label>
      <Label2>Home</Label2>
      <Label3>Home</Label3>
    </Container>
  )
}
