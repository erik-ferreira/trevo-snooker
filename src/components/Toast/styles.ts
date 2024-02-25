import styled, { css } from "styled-components/native"
import { ToastType } from "react-native-toast-message"

import { defaultTheme } from "@/theme/default"

export const ToastContainer = styled.View`
  width: 90%;
  background-color: ${({ theme }) => theme.colors.slate[800]};
  border-radius: 4px;

  padding: 12px 20px;

  flex-direction: row;
  gap: 12px;
  align-items: flex-start;
`
export type ToastContentIconType = ToastType | "warning"

const variantsColors: Record<ToastContentIconType, string> = {
  success: defaultTheme.colors.emerald[600],
  warning: defaultTheme.colors.yellow[400],
  info: defaultTheme.colors["blue-dark"][400],
  error: defaultTheme.colors.red[500],
}

export interface ToastContentIconProps {
  type: ToastContentIconType
}

export const ToastContentIcon = styled.View<ToastContentIconProps>`
  width: 28px;
  height: 28px;
  border-radius: 14px;

  align-items: center;
  justify-content: center;

  ${(props) => css`
    background-color: ${variantsColors[props.type]};
  `}
`

export const ToastLabel = styled.Text`
  flex: 1;

  color: ${({ theme }) => theme.colors.slate[200]};
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.raj.semiBold};
`
