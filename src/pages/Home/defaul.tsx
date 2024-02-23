import { useState } from "react"
import Modal from "react-native-modal"
import Toast from "react-native-toast-message"
import { Image, FlatList } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { Player } from "@/components/Player"
import { Button } from "@/components/Button"
import { Option } from "@/components/Option"
import { Divider } from "@/components/Divider"
import { PlayerOfTheMatch } from "@/components/PlayerOfTheMatch"

import { players } from "@/defaults/players"

import { MatchDTO } from "@/dtos/MatchDTO"
import { PlayerDTO } from "@/dtos/PlayerDTO"

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
  const currentDate = "12/12/2012"
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

  async function handleSaveMatch() {
    if (!winnerPlayer) {
      return Toast.show({
        type: "info",
        text1: "Ops...",
        text2: "Selecione o jogador que venceu a partida para salvar",
        visibilityTime: 2000,
      })
    }

    const key = "@trevo-snooker"

    const newMatch: MatchDTO = {
      id: Math.random(),
      playerOneId: playerOne.id,
      playerTwoId: playerTwo.id,
      playerWinnerId:
        winnerPlayer === "player-one" ? playerOne.id : playerTwo.id,
      isCapote: optionMatch === "is-capote",
      isSuicide: optionMatch === "is-suicide",
      createdAt: new Date(),
    }

    let matches: MatchDTO[] = []

    try {
      const value = await AsyncStorage.getItem(key)

      if (!value) {
        await AsyncStorage.setItem(key, JSON.stringify(matches))
      } else {
        matches = JSON.parse(value)
      }

      matches = [...matches, newMatch]

      // console.log("matches", matches)

      await AsyncStorage.setItem(key, JSON.stringify(matches))

      Toast.show({
        type: "success",
        text1: "Show",
        text2: "Partida cadastrada com sucesso!",
        visibilityTime: 2000,
      })

      setWinnerPlayer(null)
      setOptionMatch(null)
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Ops...",
        text2: "Não foi possível criar uma partida",
        visibilityTime: 2000,
      })
      console.log("problem", e)
    }
  }

  // async function handleTeste() {
  //   const value = await AsyncStorage.getItem("@trevo-snooker")
  //   const listValue = value ? JSON.parse(value) : []

  //   listValue.map((val: MatchDTO, index: number) => {
  //     console.log(index + 1, " - ", JSON.stringify(val, null, 2))
  //   })
  // }

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
      {/* <Button label="Test" onPress={handleTeste} /> */}

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
