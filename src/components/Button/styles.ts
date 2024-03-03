import styled from "styled-components/native"

import { defaultTheme } from "@/theme/default"

export interface ButtonContainerProps {
  variant?: "primary" | "secondary"
}

export const ButtonContainer = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7,
}))<ButtonContainerProps>`
  width: 100%;
  border-radius: 4px;
  padding: 12px 16px;
  background-color: ${(props) =>
    props.variant === "primary"
      ? props.theme.colors.blue["500"]
      : props.theme.colors.red["500"]};

  display: flex;
  align-items: center;
  justify-content: center;
`
export const TextButtonContainer = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.colors.slate["100"]};
  font-family: ${(props) => props.theme.fonts.mono.bold};
`
