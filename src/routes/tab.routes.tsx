import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { Home } from "@/pages/Home"

const { Navigator, Screen } = createBottomTabNavigator()

export function TabRoutes() {
  return (
    <Navigator>
      <Screen name="Home" component={Home} />
      {/* <Screen name="Settings" component={<} /> */}
    </Navigator>
  )
}
