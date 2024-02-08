import { Container, Label } from "./styles"

interface HomeProps {}

export function Home({ ...rest }: HomeProps) {
  return (
    <Container>
      <Label>Home</Label>
    </Container>
  )
}
