import { TouchableOpacityProps } from "react-native"

import { Avatar } from "@/components/Avatar"
import { PlayerWithQuantityMatchesProps } from "@/dtos/PlayerDTO"

import {
  ContainerPlayer,
  ContentPlayerDescriptions,
  PlayerName,
  NumberOfMatchesPlayed,
} from "./styles"

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

  return (
    <ContainerPlayer {...rest}>
      <Avatar slugAvatar={player.slugAvatar} isListPlayer />

      <ContentPlayerDescriptions>
        <PlayerName>{player.name}</PlayerName>
        <NumberOfMatchesPlayed>
          {formatDescriptionByNumberOfMatchesPlayed}
        </NumberOfMatchesPlayed>
      </ContentPlayerDescriptions>
    </ContainerPlayer>
  )
}
