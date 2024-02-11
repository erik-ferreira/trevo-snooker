import { PlayerDTO } from "@/dtos/PlayerDTO"

import antonio from "@/assets/antonio.png"
import breno from "@/assets/breno.png"
import erik from "@/assets/erik.png"
import david from "@/assets/david.png"

export const players: PlayerDTO[] = [
  {
    id: 1,
    name: "Antonio Gomes",
    avatarUrl: antonio,
    matches: [],
  },
  {
    id: 2,
    name: "Breno Alves",
    avatarUrl: breno,
    matches: [],
  },
  {
    id: 3,
    name: "Erik Ferreira",
    avatarUrl: erik,
    matches: [],
  },
  {
    id: 4,
    name: "David Teixeira",
    avatarUrl: david,
    matches: [],
  },
]
