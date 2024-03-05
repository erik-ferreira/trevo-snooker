import { ViewProps } from "react-native"
import { useTheme } from "styled-components/native"

import { Icon } from "@/components/Icon"

import { BoxCheckContainer } from "./styles"

interface BoxCheckProps extends ViewProps {
  showCheck?: boolean
}

export function BoxCheck({ showCheck, ...rest }: BoxCheckProps) {
  const { colors } = useTheme()

  return (
    <BoxCheckContainer {...rest}>
      {showCheck && <Icon name="Check" color={colors.emerald[500]} />}
    </BoxCheckContainer>
  )
}
