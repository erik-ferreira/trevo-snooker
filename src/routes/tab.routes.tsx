import { StatusBar } from "react-native"
import { useTheme } from "styled-components/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { Home } from "@/pages/Home"
import { History } from "@/pages/History"
import { Settings } from "@/pages/Settings"
import { Statistics } from "@/pages/Statistics"

import { Icon } from "@/components/Icon"

const { Navigator, Screen } = createBottomTabNavigator()

export function TabRoutes() {
  const theme = useTheme()

  return (
    <Navigator
      screenOptions={{
        tabBarStyle: {
          height: 72,
          backgroundColor: theme.colors.gray["900"],
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: theme.colors.blue["500"],
        tabBarInactiveTintColor: theme.colors.slate["400"],
        tabBarShowLabel: false,

        // header
        headerStyle: {
          height: (StatusBar?.currentHeight ?? 0) + 56,
          backgroundColor: theme.colors.gray["900"],
        },
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: theme.fonts.orbi.semiBold,
        },
        headerTintColor: theme.colors.slate["100"],
      }}
    >
      <Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ size, color }) => {
            return <Icon name="Home" size={size} color={color} />
          },
        }}
      />
      <Screen
        name="History"
        component={History}
        options={{
          headerTitle: "Histórico de partidas",
          tabBarIcon: ({ size, color }) => {
            return <Icon name="Menu" size={size} color={color} />
          },
        }}
      />
      <Screen
        name="Statistics"
        component={Statistics}
        options={{
          headerTitle: "Estatísticas",
          tabBarIcon: ({ size, color }) => {
            return <Icon name="LineChart" size={size} color={color} />
          },
        }}
      />
      <Screen
        name="Settings"
        component={Settings}
        options={{
          headerTitle: "Configurações",
          tabBarIcon: ({ size, color }) => {
            return <Icon name="Settings" size={size} color={color} />
          },
        }}
      />
    </Navigator>
  )
}
