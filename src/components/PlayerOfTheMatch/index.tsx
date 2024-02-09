import { TouchableOpacityProps } from "react-native"

import player from "@/assets/player.png"

import {
  Box,
  ImagePlayer,
  TouchableOpacityContainer,
  TouchableOpacityContainerProps,
} from "./styles"

type PlayerOfTheMatchProps = TouchableOpacityProps &
  TouchableOpacityContainerProps & {}

export function PlayerOfTheMatch({
  variant = "player-one",
  ...rest
}: PlayerOfTheMatchProps) {
  return (
    <TouchableOpacityContainer activeOpacity={0.7} variant={variant} {...rest}>
      <ImagePlayer source={player} width={80} height={80} />

      <Box />
    </TouchableOpacityContainer>
  )
}
