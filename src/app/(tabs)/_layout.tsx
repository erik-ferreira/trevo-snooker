import { Tabs } from "expo-router"
import { MaterialIcons } from "@expo/vector-icons"
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
import { styled } from "nativewind"

const TabStyled = styled(Tabs)

export default function TabsRoutesLayout() {
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
    <TabStyled tw="bg-emerald-500">
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
    </TabStyled>
  )
}
