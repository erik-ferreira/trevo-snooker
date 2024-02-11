import { useState } from "react"
import Modal from "react-native-modal"
import ToastD from "react-native-toast-message"
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

type WinnerPlayerProps = "player-one" | "player-two" | null
type OptionMatchProps = "is-capote" | "is-suicide" | null

export function Home() {
  const currentDate = getCurrentDate()

  const [visibleModal, setVisibleModal] = useState(false)
  const [winnerPlayer, setWinnerPlayer] = useState<WinnerPlayerProps>(null)
  const [optionMatch, setOptionMatch] = useState<OptionMatchProps>(null)

  function handleShowModal() {
    setVisibleModal(true)
  }

  function handleCloseModal() {
    setVisibleModal(false)
  }

  function handleChangeWinnerPlayer(winner: WinnerPlayerProps) {
    setWinnerPlayer((prevState) => (prevState === winner ? null : winner))
  }

  function handleChangeOptionMatch(option: OptionMatchProps) {
    setOptionMatch((prevState) => (prevState === option ? null : option))
  }

  function handleSaveMatch() {
    if (!winnerPlayer) {
      ToastD.show({
        type: "info",
        text1: "Ops...",
        text2: "Selecione o jogador que venceu a partida para salvar",
        visibilityTime: 10000,
      })
    }
  }

  return (
    <Container>
      <DateToday>{currentDate}</DateToday>

      <ContentMatchesList>
        <PlayerOfTheMatch
          variant="player-one"
          onLongPress={handleShowModal}
          isWinner={winnerPlayer === "player-one"}
          onPress={() => handleChangeWinnerPlayer("player-one")}
        />
        <Image source={vs} width={50} />
        <PlayerOfTheMatch
          variant="player-two"
          onLongPress={handleShowModal}
          isWinner={winnerPlayer === "player-two"}
          onPress={() => handleChangeWinnerPlayer("player-two")}
        />
      </ContentMatchesList>

      <ContentOptions>
        <Option
          label="Capote"
          isChecked={optionMatch === "is-capote"}
          onPress={() => handleChangeOptionMatch("is-capote")}
        />
        <Option
          label="Suicídio"
          isChecked={optionMatch === "is-suicide"}
          onPress={() => handleChangeOptionMatch("is-suicide")}
        />
      </ContentOptions>

      <Button label="Salvar" onPress={handleSaveMatch} />

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
