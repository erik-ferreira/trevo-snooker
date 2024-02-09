import { useTheme } from "styled-components/native"
import { ActivityIndicator, TouchableOpacityProps } from "react-native"

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
    <ButtonContainer activeOpacity={0.7} {...rest}>
      {loading ? (
        <ActivityIndicator color={theme.colors.slate[100]} />
      ) : (
        <TextButtonContainer>{label}</TextButtonContainer>
      )}
    </ButtonContainer>
  )
}
