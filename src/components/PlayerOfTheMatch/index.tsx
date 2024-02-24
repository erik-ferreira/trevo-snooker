import { TouchableOpacityProps, Image, ImageSourcePropType } from "react-native"

import { BoxCheck } from "@/components/BoxCheck"

import { PlayerDTO } from "@/dtos/PlayerDTO"

import antonio from "@/assets/antonio.png"
import breno from "@/assets/breno.png"
import david from "@/assets/david.png"
import erik from "@/assets/erik.png"

const imagesProfile = {
  antonio,
  breno,
  david,
  erik,
} as const

type VariantsImagesProfile = keyof typeof imagesProfile

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
  variant = "playerOne",
  isWinner = false,
  isReadOnly = false,
  player,
  ...rest
}: PlayerOfTheMatchProps) {
  const imageSource = imagesProfile["erik" as VariantsImagesProfile]

  return (
    <PlayerOfTheMatchContainer
      variant={variant}
      disabled={isReadOnly || rest.disabled}
      {...rest}
    >
      <ContentImagePlayer isWinner={isWinner}>
        <Image source={imageSource} width={80} height={80} />
      </ContentImagePlayer>

      {!isReadOnly && <BoxCheck showCheck={isWinner} />}
    </PlayerOfTheMatchContainer>
  )
}
