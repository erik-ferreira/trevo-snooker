import { StatusBar } from "expo-status-bar"
import { Text, View } from "react-native"
import { useFonts, Orbitron_400Regular } from "@expo-google-fonts/orbitron"
import { Rajdhani_400Regular } from "@expo-google-fonts/rajdhani"
import { JetBrainsMono_400Regular } from "@expo-google-fonts/jetbrains-mono"
import { NativeWindStyleSheet } from "nativewind"

NativeWindStyleSheet.setOutput({
  default: "native",
})

export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    Orbitron_400Regular,
    Rajdhani_400Regular,
    JetBrainsMono_400Regular,
  })

  if (!fontsLoaded && !fontError) {
    return null
  }

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-emerald-500 font-bold text-2xl text-center mb-10">
        Open up App.js to start working on your app!
      </Text>
      <Text className="text-emerald-500 font-bold text-2xl text-center">
        Open up App.js to start working on your app!
      </Text>
      <StatusBar style="auto" />
    </View>
  )
}
