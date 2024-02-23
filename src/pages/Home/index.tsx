import { useEffect, useState } from "react"
import { format } from "date-fns"
import Modal from "react-native-modal"
import Toast from "react-native-toast-message"
import { Image, FlatList } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { Player } from "@/components/Player"
import { Button } from "@/components/Button"
import { Option } from "@/components/Option"
import { Divider } from "@/components/Divider"
import { PlayerOfTheMatch } from "@/components/PlayerOfTheMatch"

import { MatchDTO } from "@/dtos/MatchDTO"
import { PlayerDTO, PlayerWithQuantityMatchesProps } from "@/dtos/PlayerDTO"

import vs from "@/assets/vs.png"

import {
  // page
  Container,
  DateToday,
  ContentMatchesList,
  ContentOptions,
  // modal
  ModalStyle,
  ModalContent,
  ModalPicker,
  ModalHeader,
  ModalTitle,
  NumberOfPlayers,
  ModalBodyStyle,
} from "./styles"
import { api } from "@/services/api"

export function Home() {
  const currentDate = format(new Date(), "dd/MM/yyyy")

  const [players, setPlayers] = useState<PlayerWithQuantityMatchesProps[]>([])
  const totalPlayers = players.length

  const playerOne = {
    id: "f517ea00-9341-427f-ab38-6ee4c4c9a3f6",
    name: "Antonio Gomes",
    slugAvatar: "antonio",
    createdAt: new Date("2024-02-23T01:56:05.286Z"),
  } as PlayerDTO

  const playerTwo = {
    id: "ba684a94-f746-443d-b09b-a19edb8bb732",
    name: "Breno Alves",
    slugAvatar: "breno",
    createdAt: new Date("2024-02-23T01:56:05.286Z"),
  } as PlayerDTO

  async function onGetListPlayers() {
    const response = await api.get("/players")

    setPlayers(response.data)
  }

  useEffect(() => {
    onGetListPlayers()
  }, [])

  return (
    <Container>
      <DateToday>{currentDate}</DateToday>

      <ContentMatchesList>
        <PlayerOfTheMatch player={playerOne} variant="playerOne" />
        <Image source={vs} width={50} />
        <PlayerOfTheMatch player={playerTwo} variant="playerTwo" />
      </ContentMatchesList>

      <ContentOptions>
        <Option label="Capote" />
        <Option label="Suicídio" />
      </ContentOptions>

      <Button label="Salvar" />
    </Container>
  )
}
