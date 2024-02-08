import { ButtonContainer, TextButtonContainer } from "./styles"

interface ButtonProps {}

export function Button({ ...rest }: ButtonProps) {
  return (
    <ButtonContainer>
      <TextButtonContainer>Salvar</TextButtonContainer>
    </ButtonContainer>
  )
}
