import { TouchableOpacityProps } from "react-native"

import player from "@/assets/player.png"

import { TouchableOpacityContainer, ImagePlayer, Box } from "./styles"

interface PlayerOfTheMatchProps extends TouchableOpacityProps {}

export function PlayerOfTheMatch({ ...rest }: PlayerOfTheMatchProps) {
  return (
    <TouchableOpacityContainer activeOpacity={0.7} {...rest}>
      <ImagePlayer source={player} width={80} height={80} />

      <Box />
    </TouchableOpacityContainer>
  )
}
