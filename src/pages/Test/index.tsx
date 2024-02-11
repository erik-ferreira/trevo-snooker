import { View, Text } from "react-native"

interface TestProps {}

export function Test({ ...rest }: TestProps) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Test</Text>
    </View>
  )
}
