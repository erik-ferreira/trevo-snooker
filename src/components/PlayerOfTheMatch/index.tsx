import { TouchableOpacityProps, Image } from "react-native"

import { BoxCheck } from "@/components/BoxCheck"

import player from "@/assets/player.png"

import {
  ContentImagePlayer,
  ContentImagePlayerProps,
  PlayerOfTheMatchContainer,
  PlayerOfTheMatchContainerProps,
} from "./styles"

type PlayerOfTheMatchProps = TouchableOpacityProps &
  PlayerOfTheMatchContainerProps &
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
    <PlayerOfTheMatchContainer
      variant={variant}
      disabled={isReadOnly || rest.disabled}
      {...rest}
    >
      <ContentImagePlayer isWinner={isWinner}>
        <Image source={player} width={80} height={80} />
      </ContentImagePlayer>

      {!isReadOnly && <BoxCheck showCheck={isWinner} />}
    </PlayerOfTheMatchContainer>
  )
}
