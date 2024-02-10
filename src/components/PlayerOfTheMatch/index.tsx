import { TouchableOpacityProps, Image } from "react-native"

import { BoxCheck } from "@/components/BoxCheck"

import player from "@/assets/player.png"

import {
  ContentImagePlayer,
  ContentImagePlayerProps,
  TouchableOpacityContainer,
  TouchableOpacityContainerProps,
} from "./styles"

type PlayerOfTheMatchProps = TouchableOpacityProps &
  TouchableOpacityContainerProps &
  ContentImagePlayerProps & {}

export function PlayerOfTheMatch({
  variant = "player-one",
  isWinner = false,
  ...rest
}: PlayerOfTheMatchProps) {
  return (
    <TouchableOpacityContainer activeOpacity={0.7} variant={variant} {...rest}>
      <ContentImagePlayer isWinner={isWinner}>
        <Image source={player} width={80} height={80} />
      </ContentImagePlayer>

      <BoxCheck showCheck={isWinner} />
    </TouchableOpacityContainer>
  )
}
