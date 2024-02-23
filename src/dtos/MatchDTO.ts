export interface MatchDTO {
  id: string
  isCapote: false
  isSuicide: false
  createdAt: Date
  winnerPlayerId: string
}

export type MatchesDates = Pick<MatchDTO, "id" | "createdAt">
