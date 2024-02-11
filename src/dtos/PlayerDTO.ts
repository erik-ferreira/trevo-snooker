import { MatchDTO } from "./MatchDTO"

export interface PlayerDTO {
  id: number
  name: string
  avatarUrl: string
  matches: MatchDTO[]
}
