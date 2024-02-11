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

import { PlayerDTO } from "@/dtos/PlayerDTO"

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
type PlayerPressProps = "player-one" | "player-two"

interface ModalProps {
  visibleModal: boolean
  playerPress: PlayerPressProps
}

export function Home() {
  const currentDate = getCurrentDate()
  const totalPlayers = players.length

  const [modalProps, setModalProps] = useState<ModalProps>({
    playerPress: "player-one",
    visibleModal: false,
  })
  const [winnerPlayer, setWinnerPlayer] = useState<WinnerPlayerProps>(null)
  const [optionMatch, setOptionMatch] = useState<OptionMatchProps>(null)
  const [playerOne, setPlayerOne] = useState<PlayerDTO>(players[0])
  const [playerTwo, setPlayerTwo] = useState<PlayerDTO>(players[1])

  function handleShowModal(playerPress: PlayerPressProps) {
    setModalProps({
      playerPress,
      visibleModal: true,
    })
  }

  function handleCloseModal() {
    setModalProps((prevState) => ({ ...prevState, visibleModal: false }))
  }

  function handleChangeWinnerPlayer(winner: WinnerPlayerProps) {
    setWinnerPlayer((prevState) => (prevState === winner ? null : winner))
  }

  function handleChangeOptionMatch(option: OptionMatchProps) {
    setOptionMatch((prevState) => (prevState === option ? null : option))
  }

  function handleUpdatePlayerInMatcher(player: PlayerDTO) {
    if (modalProps.playerPress === "player-one") {
      setPlayerOne(player)
    } else {
      setPlayerTwo(player)
    }

    handleCloseModal()
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
          player={playerOne}
          variant="player-one"
          onLongPress={() => handleShowModal("player-one")}
          isWinner={winnerPlayer === "player-one"}
          onPress={() => handleChangeWinnerPlayer("player-one")}
        />
        <Image source={vs} width={50} />
        <PlayerOfTheMatch
          player={playerTwo}
          variant="player-two"
          onLongPress={() => handleShowModal("player-two")}
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
        isVisible={modalProps.visibleModal}
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
            renderItem={({ item }) => (
              <Player
                player={item}
                disabled={item.id === playerOne.id || item.id === playerTwo.id}
                onPress={() => handleUpdatePlayerInMatcher(item)}
              />
            )}
            contentContainerStyle={ModalBodyStyle}
          />
        </ModalContent>
      </Modal>
    </Container>
  )
}
