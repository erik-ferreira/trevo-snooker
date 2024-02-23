import { StatisticsDTO } from "./StatisticsDTO"

export interface PlayerDTO {
  id: string
  name: string
  slugAvatar: string
  createdAt: Date
}

export interface PlayerWithQuantityMatchesProps extends PlayerDTO {
  numberOfMatchesPlayed: number
}

export interface PlayerStatisticsProps extends PlayerDTO {
  statistics: StatisticsDTO
}
