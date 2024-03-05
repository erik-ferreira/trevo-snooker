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
