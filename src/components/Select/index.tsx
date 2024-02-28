import { useTheme } from "styled-components/native"
import { Picker, PickerProps } from "@react-native-picker/picker"

import { pickerStyle, pickerItemStyle } from "./style"

export interface SelectOptions {
  label: string
  value: string
}

interface SelectProps extends PickerProps {
  options: SelectOptions[]
}

export function Select({ options, ...rest }: SelectProps) {
  const theme = useTheme()

  const formatOptions: SelectOptions[] = [
    { label: "Selecione uma data...", value: "default" },
    ...options,
  ]

  return (
    <Picker
      style={pickerStyle}
      dropdownIconColor={theme.colors.slate[500]}
      placeholder="Selecione uma data..."
      {...rest}
    >
      {formatOptions.map((option) => (
        <Picker.Item
          key={option.value}
          label={option.label}
          value={option.label}
          style={pickerItemStyle}
        />
      ))}
    </Picker>
  )
}
