import { useState } from "react"
import { View, Text } from "react-native"
import { useTheme } from "styled-components/native"
import { Picker } from "@react-native-picker/picker"

interface SelectProps {}

export function Select({ ...rest }: SelectProps) {
  const theme = useTheme()

  const [selectedValue, setSelectedValue] = useState("")

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
      <Picker.Item label="Java" value="java" />
      <Picker.Item label="JavaScript" value="js" />
    </Picker>
  )
}
