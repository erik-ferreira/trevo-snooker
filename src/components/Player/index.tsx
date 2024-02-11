import { TouchableOpacityProps, Image } from "react-native"

import { PlayerDTO } from "@/dtos/PlayerDTO"

import {
  ContainerPlayer,
  ContentPlayerAvatar,
  ContentPlayerDescriptions,
  PlayerName,
  NumberOfMatchesPlayed,
} from "./styles"

interface PlayerProps extends TouchableOpacityProps {
  player: PlayerDTO
}

export function Player({ player, ...rest }: PlayerProps) {
  const numberOfMatchesPlayed = player.matches.length

  let formatDescriptionByNumberOfMatchesPlayed = `${numberOfMatchesPlayed} partidas jogadas`

  if (numberOfMatchesPlayed === 0) {
    formatDescriptionByNumberOfMatchesPlayed = "Nenhuma partida jogada"
  } else if (numberOfMatchesPlayed === 1) {
    formatDescriptionByNumberOfMatchesPlayed = `${numberOfMatchesPlayed} partida jogada`
  }

  return (
    <ContainerPlayer {...rest}>
      <ContentPlayerAvatar>
        <Image source={player.avatarUrl} width={80} height={80} />
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
