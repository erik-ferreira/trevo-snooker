import { useState } from "react"
import Modal from "react-native-modal"
import ToastD from "react-native-toast-message"
import { Image, FlatList } from "react-native"

import { Player } from "@/components/Player"
import { Button } from "@/components/Button"
import { Option } from "@/components/Option"
import { Divider } from "@/components/Divider"
import { PlayerOfTheMatch } from "@/components/PlayerOfTheMatch"

import { players } from "@/defaults/players"

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

type WinnerPlayerProps = "player-one" | "player-two" | null
type OptionMatchProps = "is-capote" | "is-suicide" | null

export function Home() {
  const currentDate = getCurrentDate()
  const totalPlayers = players.length

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
            <NumberOfPlayers>Total {totalPlayers}</NumberOfPlayers>
          </ModalHeader>

          <FlatList
            data={players}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={Divider}
            renderItem={({ item }) => <Player player={item} />}
            contentContainerStyle={ModalBodyStyle}
          />
        </ModalContent>
      </Modal>
    </Container>
  )
}
