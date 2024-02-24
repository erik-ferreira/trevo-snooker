import styled from "styled-components/native"
// import { ToastType } from "react-native-toast-message"

export const ToastContainer = styled.View`
  width: 90%;
  background-color: ${({ theme }) => theme.colors.slate[800]};
  border-radius: 4px;

  padding: 12px 24px;

  flex-direction: row;
  gap: 12px;
`

export interface ToastContainerProps {
  // variant?: "success" | "alert" | "info" | "error"
}

export const ToastContentIcon = styled.View`
  width: 24px;
  height: 24px;

  align-items: center;
  justify-content: center;
`

export const ToastLabel = styled.Text`
  color: ${({ theme }) => theme.colors.slate[200]};
  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.raj.semiBold};
`
