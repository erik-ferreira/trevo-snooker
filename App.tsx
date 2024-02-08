import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"
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
import { ThemeProvider } from "styled-components/native"

import { Home } from "./src/pages/Home"

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
    <ThemeProvider
      theme={{ fonts: { orbi: { normal: "Orbitron_400Regular" } } }}
    >
      <Home />
      <StatusBar style="auto" />
    </ThemeProvider>
  )
}
