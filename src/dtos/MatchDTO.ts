import { PlayerDTO } from "./PlayerDTO"

export interface MatchDTO {
  id: string
  isCapote: false
  isSuicide: false
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

export type MatchesDates = Pick<MatchDTO, "id" | "createdAt">

export type OptionMatchProps = "isCapote" | "isSuicide" | null
