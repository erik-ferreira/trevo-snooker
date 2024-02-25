import { useTheme } from "styled-components/native"
import { ToastConfigParams } from "react-native-toast-message"

import { Icon, NameIconProps } from "@/components/Icon"

import {
  ToastContainer,
  ToastContentIcon,
  ToastContentIconType,
  ToastLabel,
} from "./styles"

const variantsIcons: Record<ToastContentIconType, NameIconProps> = {
  success: "Check",
  warning: "AlertCircle",
  error: "X",
  info: "Info",
}

interface ToastProps extends ToastConfigParams<any> {}

export function Toast({ ...rest }: ToastProps) {
  const { colors } = useTheme()
  const nameIcon = variantsIcons[rest.type]

  return (
    <ToastContainer>
      <ToastContentIcon type={rest.type}>
        <Icon name={nameIcon} color={colors.black} />
      </ToastContentIcon>
      <ToastLabel>{rest.text1}</ToastLabel>
    </ToastContainer>
  )
}
