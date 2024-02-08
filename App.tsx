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
import { ThemeProvider } from "styled-components/native"
import { NavigationContainer } from "@react-navigation/native"

import { TabRoutes } from "@/routes/tab.routes"
import { defaultTheme } from "@/theme/default"

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
    <ThemeProvider theme={defaultTheme}>
      <NavigationContainer>
        <TabRoutes />
        <StatusBar style="light" />
      </NavigationContainer>
    </ThemeProvider>
  )
}
