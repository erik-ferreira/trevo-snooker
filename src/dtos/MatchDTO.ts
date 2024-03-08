import { PlayerDTO } from "./PlayerDTO"

export interface MatchDTO {
  id: string
  isCapote: boolean
  isSuicide: boolean
  createdAt: string
  winnerPlayerId: string
}

interface PlayerMatchDTO {
  matchId: string
  playerId: string
  player: PlayerDTO
}

export interface MatchesByUniqueDate extends MatchDTO {
  players: PlayerMatchDTO[]
}

export interface MatchesNormalByUniqueDateLocal extends MatchDTO {
  players: PlayerDTO[]
}

export interface MatchesByUniqueDateLocal extends MatchDTO {
  playersIds: string[]
}

export type MatchesDates = Pick<MatchDTO, "id" | "createdAt">

export type OptionMatchProps = "isCapote" | "isSuicide" | null
