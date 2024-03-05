import { TouchableOpacityProps } from "react-native"

import { BoxCheck } from "@/components/BoxCheck"

import { ContainerOption, OptionLabel } from "./styles"

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
  return (
    <ContainerOption disabled={isReadOnly || rest.disabled} {...rest}>
      <BoxCheck showCheck={isChecked} />
      <OptionLabel>{label}</OptionLabel>
    </ContainerOption>
  )
}
