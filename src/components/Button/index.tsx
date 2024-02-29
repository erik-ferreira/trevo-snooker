import { useTheme } from "styled-components/native"
import { TouchableOpacityProps } from "react-native"

import { LoadingSpinner } from "@/components/LoadingSpinner"

import { ButtonContainer, TextButtonContainer } from "./styles"

interface ButtonProps extends TouchableOpacityProps {
  label?: string
  loading?: boolean
}

export function Button({
  label = "Salvar",
  loading = false,
  ...rest
}: ButtonProps) {
  const theme = useTheme()

  return (
    <ButtonContainer {...rest}>
      {loading ? (
        <LoadingSpinner variant="secondary" />
      ) : (
        <TextButtonContainer>{label}</TextButtonContainer>
      )}
    </ButtonContainer>
  )
}
