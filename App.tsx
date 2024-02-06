import { Text, View } from "react-native"
import { StatusBar } from "expo-status-bar"
import {
  Rajdhani_400Regular,
  Rajdhani_700Bold,
} from "@expo-google-fonts/rajdhani"
import {
  useFonts,
  Orbitron_400Regular,
  Orbitron_600SemiBold,
} from "@expo-google-fonts/orbitron"
import {
  JetBrainsMono_400Regular,
  JetBrainsMono_700Bold,
} from "@expo-google-fonts/jetbrains-mono"

export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    Orbitron_400Regular,
    Orbitron_600SemiBold,
    Rajdhani_400Regular,
    Rajdhani_700Bold,
    JetBrainsMono_400Regular,
    JetBrainsMono_700Bold,
  })

  if (!fontsLoaded && !fontError) {
    return null
  }

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-emerald-500 text-2xl font-orbi-normal">
        Hello guys
      </Text>
      <Text className="text-emerald-500 text-2xl font-orbi-semibold">
        Hello guys
      </Text>
      <Text className="text-emerald-500 text-2xl font-raj-normal">
        Hello guys
      </Text>
      <Text className="text-emerald-500 text-2xl font-raj-bold">
        Hello guys
      </Text>
      <Text className="text-emerald-500 text-2xl font-mono-normal">
        Hello guys
      </Text>
      <Text className="text-emerald-500 text-2xl font-mono-bold">
        Hello guys
      </Text>
      <StatusBar style="auto" />
    </View>
  )
}
