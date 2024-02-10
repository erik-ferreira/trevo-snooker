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
  ContentImagePlayerProps & {
    isReadOnly?: boolean
  }

export function PlayerOfTheMatch({
  variant = "player-one",
  isWinner = false,
  isReadOnly = false,
  ...rest
}: PlayerOfTheMatchProps) {
  return (
    <TouchableOpacityContainer
      activeOpacity={0.7}
      variant={variant}
      disabled={isReadOnly || rest.disabled}
      {...rest}
    >
      <ContentImagePlayer isWinner={isWinner}>
        <Image source={player} width={80} height={80} />
      </ContentImagePlayer>

      {!isReadOnly && <BoxCheck showCheck={isWinner} />}
    </TouchableOpacityContainer>
  )
}
