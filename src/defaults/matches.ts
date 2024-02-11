import { MatchDTO } from "@/dtos/MatchDTO"

export const matches: MatchDTO[] = [
  {
    id: 1,
    playerOneId: 1,
    playerTwoId: 2,
    playerWinnerId: 2,
    isCapote: true,
    isSuicide: false,
    createdAt: new Date("02/11/2024"),
  },
  {
    id: 1,
    playerOneId: 2,
    playerTwoId: 3,
    playerWinnerId: 3,
    isCapote: false,
    isSuicide: false,
    createdAt: new Date("02/11/2024"),
  },
  {
    id: 1,
    playerOneId: 3,
    playerTwoId: 4,
    playerWinnerId: 3,
    isCapote: false,
    isSuicide: true,
    createdAt: new Date("02/11/2024"),
  },
  {
    id: 1,
    playerOneId: 4,
    playerTwoId: 1,
    playerWinnerId: 1,
    isCapote: false,
    isSuicide: false,
    createdAt: new Date("02/11/2024"),
  },
]
