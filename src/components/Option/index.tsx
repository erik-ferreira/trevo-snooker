import { TouchableOpacityProps } from "react-native"

import { Icon } from "@/components/Icon"
import { useTheme } from "styled-components/native"

import { ContainerOption, OptionBox, OptionLabel } from "./styles"

interface OptionProps extends TouchableOpacityProps {
  label?: string
  isReadOnly?: boolean
  isChecked?: boolean
}

export function Option({
  label = "Capote",
  isReadOnly = false,
  isChecked = false,
  ...rest
}: OptionProps) {
  const { colors } = useTheme()

  return (
    <ContainerOption
      activeOpacity={0.7}
      disabled={isReadOnly || rest.disabled}
      {...rest}
    >
      <OptionBox>
        {isChecked && <Icon name="Check" color={colors.emerald[500]} />}
      </OptionBox>
      <OptionLabel>{label}</OptionLabel>
    </ContainerOption>
  )
}
