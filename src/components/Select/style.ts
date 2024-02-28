import { StyleProp, TextStyle } from "react-native"

import { defaultTheme as theme } from "@/theme/default"

export const pickerStyle: StyleProp<TextStyle> = {
  color: theme.colors.slate[500],
  backgroundColor: theme.colors.section,
}

export const pickerItemStyle: StyleProp<TextStyle> = {
  fontSize: 18,
  fontFamily: theme.fonts.orbi.normal,
  color: theme.colors.slate[600],
}
