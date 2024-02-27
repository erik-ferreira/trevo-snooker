import { TouchableOpacityProps } from "react-native"

import { Avatar } from "@/components/Avatar"
import { BoxCheck } from "@/components/BoxCheck"

import { PlayerDTO } from "@/dtos/PlayerDTO"

import {
  ContentImagePlayerProps,
  PlayerOfTheMatchContainer,
  PlayerOfTheMatchContainerProps,
} from "./styles"

type PlayerOfTheMatchProps = TouchableOpacityProps &
  PlayerOfTheMatchContainerProps &
  ContentImagePlayerProps & {
    isReadOnly?: boolean
    player: PlayerDTO | null
  }

export function PlayerOfTheMatch({
  variant = "playerOne",
  isWinner = false,
  isReadOnly = false,
  player,
  ...rest
}: PlayerOfTheMatchProps) {
  return (
    <PlayerOfTheMatchContainer
      variant={variant}
      disabled={isReadOnly || rest.disabled}
      {...rest}
    >
      <Avatar slugAvatar={player?.slugAvatar} isWinner={isWinner} />

      {!isReadOnly && <BoxCheck showCheck={isWinner} />}
    </PlayerOfTheMatchContainer>
  )
}
