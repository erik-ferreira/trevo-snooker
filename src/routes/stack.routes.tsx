import { StatusBar } from "react-native"
import { useTheme } from "styled-components/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { TabRoutes } from "./tab.routes"

import { Matches } from "@/pages/Matches"

const { Navigator, Screen } = createNativeStackNavigator()

export function StackRoutes() {
  const theme = useTheme()

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="First" component={TabRoutes} />
      <Screen
        name="Matches"
        component={Matches}
        options={{
          headerShown: true,
          headerTitle: "Partidas",
          contentStyle: {
            height: (StatusBar?.currentHeight ?? 0) + 56,
          },
          headerStyle: {
            backgroundColor: theme.colors.gray["900"],
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: theme.fonts.orbi.semiBold,
          },
          headerTintColor: theme.colors.slate["100"],
        }}
      />
    </Navigator>
  )
}
