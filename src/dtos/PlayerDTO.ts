import { ImageSourcePropType } from "react-native"

import { MatchDTO } from "./MatchDTO"

export interface PlayerDTO {
  id: number
  name: string
  avatarUrl: ImageSourcePropType
  matches: MatchDTO[]
}
