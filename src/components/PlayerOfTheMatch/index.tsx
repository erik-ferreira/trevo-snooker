import { TouchableOpacityProps, Image, ImageSourcePropType } from "react-native"

import { BoxCheck } from "@/components/BoxCheck"

import { PlayerDTO } from "@/dtos/PlayerDTO"

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
    player: PlayerDTO
  }

export function PlayerOfTheMatch({
  variant = "player-one",
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
      <ContentImagePlayer isWinner={isWinner}>
        <Image source={player.avatarUrl} width={80} height={80} />
      </ContentImagePlayer>

      {!isReadOnly && <BoxCheck showCheck={isWinner} />}
    </PlayerOfTheMatchContainer>
  )
}
