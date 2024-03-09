import { TouchableOpacityProps } from "react-native"

import { LoadingSpinner } from "@/components/LoadingSpinner"

import {
  ButtonContainerProps,
  ButtonContainer,
  TextButtonContainer,
} from "./styles"

interface ButtonProps extends TouchableOpacityProps, ButtonContainerProps {
  label?: string
  loading?: boolean
}

export function Button({
  label = "Salvar",
  loading = false,
  variant = "primary",
  isFullWidth = true,
  ...rest
}: ButtonProps) {
  return (
    <ButtonContainer variant={variant} isFullWidth={isFullWidth} {...rest}>
      {loading ? (
        <LoadingSpinner variant="secondary" />
      ) : (
        <TextButtonContainer>{label}</TextButtonContainer>
      )}
    </ButtonContainer>
  )
}
