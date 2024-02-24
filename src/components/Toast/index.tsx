import { View, Text } from "react-native"
import { ToastConfigParams } from "react-native-toast-message"

import { Icon } from "@/components/Icon"

import { ToastContainer, ToastContentIcon, ToastLabel } from "./styles"

interface ToastProps extends ToastConfigParams<any> {}

export function Toast({ ...rest }: ToastProps) {
  // rest.type
  return (
    <ToastContainer>
      <ToastContentIcon>
        <Icon name="Check" />
      </ToastContentIcon>
      <ToastLabel>{rest.text1}</ToastLabel>
    </ToastContainer>
  )
}
