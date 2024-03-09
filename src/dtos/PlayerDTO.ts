import { MatchDTO } from "./MatchDTO"
import { StatisticsDTO } from "./StatisticsDTO"

export interface PlayerDTO {
  id: string
  name: string
  slugAvatar: string
  createdAt: string
}

export interface PlayerWithQuantityMatchesProps extends PlayerDTO {
  numberOfMatchesPlayed: number
}

export interface PlayerStatisticsProps extends PlayerDTO {
  statistics: StatisticsDTO
}

export type WinnerPlayerProps = "playerOne" | "playerTwo" | null

export type PlayerPressProps = "playerOne" | "playerTwo"

export type SourceName = "antonio" | "breno" | "david" | "erik"

type MatchesProps = Array<{
  match: MatchDTO
  matchId: string
  playerId: string
}>

export interface PlayerStorageProps extends PlayerDTO {
  matches: MatchesProps
}

export interface Statistics {
  numberOfMatchesWon: number
  numberOfMatchesLose: number
  numberOfMatchesWonPerNormal: number
  numberOfMatchesLosePerNormal: number
  numberOfMatchesWonPerCapote: number
  numberOfMatchesLosePerCapote: number
  numberOfMatchesWonPerSuicide: number
  numberOfMatchesLosePerSuicide: number
  points: number
}

export interface ReturnPlayersStatistics extends PlayerDTO {
  statistics: Statistics
}
