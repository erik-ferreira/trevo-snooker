import { TouchableOpacityProps, Image } from "react-native"

import player from "@/assets/player.png"

import {
  ContainerPlayer,
  ContentPlayerAvatar,
  ContentPlayerDescriptions,
  PlayerName,
  NumberOfMatchesPlayed,
} from "./styles"

interface PlayerProps extends TouchableOpacityProps {
  playerName?: string
  numberOfMatchesPlayed?: number
}

export function Player({
  playerName = "Erik Ferreira",
  numberOfMatchesPlayed = 2,
  ...rest
}: PlayerProps) {
  let formatDescriptionByNumberOfMatchesPlayed = `${numberOfMatchesPlayed} partidas jogadas`

  if (numberOfMatchesPlayed === 0) {
    formatDescriptionByNumberOfMatchesPlayed = "Nenhuma partida jogada"
  } else if (numberOfMatchesPlayed === 1) {
    formatDescriptionByNumberOfMatchesPlayed = `${numberOfMatchesPlayed} partida jogada`
  }

  return (
    <ContainerPlayer {...rest}>
      <ContentPlayerAvatar>
        <Image source={player} width={80} height={80} />
      </ContentPlayerAvatar>

      <ContentPlayerDescriptions>
        <PlayerName>{playerName}</PlayerName>
        <NumberOfMatchesPlayed>
          {formatDescriptionByNumberOfMatchesPlayed}
        </NumberOfMatchesPlayed>
      </ContentPlayerDescriptions>
    </ContainerPlayer>
  )
}
