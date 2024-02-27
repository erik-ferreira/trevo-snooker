import { TouchableOpacityProps, Image, View, Text } from "react-native"

import { PlayerWithQuantityMatchesProps } from "@/dtos/PlayerDTO"

import antonio from "@/assets/antonio.png"
import breno from "@/assets/breno.png"
import david from "@/assets/david.png"
import erik from "@/assets/erik.png"

import {
  ContainerPlayer,
  ContentPlayerAvatar,
  ContentPlayerDescriptions,
  PlayerName,
  NumberOfMatchesPlayed,
} from "./styles"

const sourcesAvatar = {
  antonio: antonio,
  breno: breno,
  david: david,
  erik: erik,
}

interface PlayerProps extends TouchableOpacityProps {
  player: PlayerWithQuantityMatchesProps
}

export function Player({ player, ...rest }: PlayerProps) {
  const { numberOfMatchesPlayed, slugAvatar } = player

  let formatDescriptionByNumberOfMatchesPlayed = `${numberOfMatchesPlayed} partidas jogadas`

  if (numberOfMatchesPlayed === 0) {
    formatDescriptionByNumberOfMatchesPlayed = "Nenhuma partida jogada"
  } else if (numberOfMatchesPlayed === 1) {
    formatDescriptionByNumberOfMatchesPlayed = `${numberOfMatchesPlayed} partida jogada`
  }

  // const source = slugAvatar

  return (
    <ContainerPlayer {...rest}>
      <ContentPlayerAvatar>
        <Image source={erik} width={80} height={80} />
      </ContentPlayerAvatar>

      <ContentPlayerDescriptions>
        <PlayerName>{player.name}</PlayerName>
        <NumberOfMatchesPlayed>
          {formatDescriptionByNumberOfMatchesPlayed}
        </NumberOfMatchesPlayed>
      </ContentPlayerDescriptions>
    </ContainerPlayer>
  )
}
