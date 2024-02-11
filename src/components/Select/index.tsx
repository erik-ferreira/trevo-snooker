import { useState } from "react"
import { View, Text } from "react-native"
import { useTheme } from "styled-components/native"
import { Picker } from "@react-native-picker/picker"

interface SelectProps {}

export function Select({ ...rest }: SelectProps) {
  const theme = useTheme()

  const [selectedValue, setSelectedValue] = useState("one")

  return (
    <Picker
      selectedValue={selectedValue}
      onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      style={{
        width: "100%",
        backgroundColor: theme.colors.section,
        color: theme.colors.slate[500],
        borderRadius: 16,
      }}
      dropdownIconColor={theme.colors.slate[500]}
      placeholder="Selecione uma data..."
    >
      <Picker.Item label="11/02/2024" value="one" />
      <Picker.Item label="20/02/2024" value="two" />
    </Picker>
  )
}
