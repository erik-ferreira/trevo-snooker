import { useState } from "react"
import Modal from "react-native-modal"
import { Image, FlatList } from "react-native"

import { Player } from "@/components/Player"
import { Button } from "@/components/Button"
import { Option } from "@/components/Option"
import { Divider } from "@/components/Divider"
import { PlayerOfTheMatch } from "@/components/PlayerOfTheMatch"

import { getCurrentDate } from "@/utils/getCurrentDate"

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

const players = [
  {
    id: 1,
    name: "Erik Ferreira",
    matchesPlayed: 4,
  },
  {
    id: 2,
    name: "José David",
    matchesPlayed: 4,
  },
  {
    id: 3,
    name: "Breno Alves",
    matchesPlayed: 4,
  },
  {
    id: 4,
    name: "Antonio",
    matchesPlayed: 4,
  },
  {
    id: 5,
    name: "Erik Ferreira",
    matchesPlayed: 4,
  },
  {
    id: 6,
    name: "Erik Ferreira",
    matchesPlayed: 4,
  },
  {
    id: 7,
    name: "Erik Ferreira",
    matchesPlayed: 4,
  },
  {
    id: 8,
    name: "Erik Ferreira",
    matchesPlayed: 4,
  },
  {
    id: 9,
    name: "Erik Ferreira",
    matchesPlayed: 4,
  },
  {
    id: 10,
    name: "Erik Ferreira",
    matchesPlayed: 4,
  },
]

export function Home() {
  const currentDate = getCurrentDate()

  const [visibleModal, setVisibleModal] = useState(false)

  function handleCloseModal() {
    setVisibleModal(false)
  }

  return (
    <Container>
      <DateToday>{currentDate}</DateToday>

      <ContentMatchesList>
        <PlayerOfTheMatch onLongPress={() => setVisibleModal(true)} />
        <Image source={vs} width={50} />
        <PlayerOfTheMatch
          variant="player-two"
          isWinner
          onLongPress={() => setVisibleModal(true)}
        />
      </ContentMatchesList>

      <ContentOptions>
        <Option />
        <Option label="Suicídio" />
      </ContentOptions>

      <Button label="Salvar" />

      <Modal
        isVisible={visibleModal}
        onSwipeComplete={handleCloseModal}
        onBackButtonPress={handleCloseModal}
        onBackdropPress={handleCloseModal}
        style={ModalStyle}
        statusBarTranslucent
        swipeDirection={["down"]}
      >
        <ModalContent>
          <ModalPicker />

          <ModalHeader>
            <ModalTitle>Jogadores</ModalTitle>
            <NumberOfPlayers>Total 4</NumberOfPlayers>
          </ModalHeader>

          <FlatList
            data={players}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={Divider}
            renderItem={({ item }) => (
              <Player
                playerName={item.name}
                numberOfMatchesPlayed={item.matchesPlayed}
              />
            )}
            contentContainerStyle={ModalBodyStyle}
          />
        </ModalContent>
      </Modal>
    </Container>
  )
}
