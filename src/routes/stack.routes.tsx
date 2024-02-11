import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { TabRoutes } from "./tab.routes"
import { Test } from "@/pages/Test"

const { Navigator, Screen } = createNativeStackNavigator()

export function StackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="First" component={TabRoutes} />
      <Screen name="Test" component={Test} />
    </Navigator>
  )
}
