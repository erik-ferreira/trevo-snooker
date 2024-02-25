import { useEffect, useState } from "react"
import { format } from "date-fns"
import Modal from "react-native-modal"
import Toast from "react-native-toast-message"
import { Image, FlatList } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { api } from "@/services/api"

import { Player } from "@/components/Player"
import { Button } from "@/components/Button"
import { Option } from "@/components/Option"
import { Divider } from "@/components/Divider"
import { PlayerOfTheMatch } from "@/components/PlayerOfTheMatch"

import { MatchDTO, OptionMatchProps } from "@/dtos/MatchDTO"
import {
  PlayerDTO,
  PlayerWithQuantityMatchesProps,
  WinnerPlayerProps,
  PlayerPressProps,
} from "@/dtos/PlayerDTO"

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

interface ModalProps {
  isVisible: boolean
  playerPressed: PlayerPressProps
}

export function Home() {
  const currentDate = format(new Date(), "dd/MM/yyyy")

  const [players, setPlayers] = useState<PlayerWithQuantityMatchesProps[]>([])
  const [playerOne, setPlayerOne] = useState<PlayerDTO>(players[0])
  const [playerTwo, setPlayerTwo] = useState<PlayerDTO>(players[1])

  const [optionMatch, setOptionMatch] = useState<OptionMatchProps>(null)
  const [winnerPlayer, setWinnerPlayer] = useState<WinnerPlayerProps>(null)

  const [modal, setModal] = useState<ModalProps>({
    isVisible: false,
    playerPressed: "playerOne",
  })

  const totalPlayers = players.length

  function handleShowModal(playerPressed: PlayerPressProps) {
    setModal({
      playerPressed,
      isVisible: true,
    })
  }

  function handleCloseModal() {
    setModal((prevState) => ({ ...prevState, isVisible: false }))
  }

  function handleChangeWinnerPlayer(winner: WinnerPlayerProps) {
    setWinnerPlayer((prevState) => (prevState === winner ? null : winner))
  }

  function handleChangeOptionMatch(option: OptionMatchProps) {
    setOptionMatch((prevState) => (prevState === option ? null : option))
  }

  function handleSaveMatch() {
    Toast.show({
      type: "info",
      text1: "Selecione o jogador que venceu a partida para salvar",
      visibilityTime: 10000,
    })
  }

  async function onGetListPlayers() {
    const response = await api.get("/players")

    setPlayers(response.data)
  }

  useEffect(() => {
    onGetListPlayers()

    return () => {
      setPlayers([])
    }
  }, [])

  return (
    <Container>
      <DateToday>{currentDate}</DateToday>

      <ContentMatchesList>
        <PlayerOfTheMatch
          player={playerOne}
          variant="playerOne"
          isWinner={winnerPlayer === "playerOne"}
          onLongPress={() => handleShowModal("playerOne")}
          onPress={() => handleChangeWinnerPlayer("playerOne")}
        />
        <Image source={vs} width={50} />
        <PlayerOfTheMatch
          player={playerTwo}
          variant="playerTwo"
          isWinner={winnerPlayer === "playerTwo"}
          onLongPress={() => handleShowModal("playerTwo")}
          onPress={() => handleChangeWinnerPlayer("playerTwo")}
        />
      </ContentMatchesList>

      <ContentOptions>
        <Option
          label="Capote"
          isChecked={optionMatch === "isCapote"}
          onPress={() => handleChangeOptionMatch("isCapote")}
        />
        <Option
          label="Suicídio"
          isChecked={optionMatch === "isSuicide"}
          onPress={() => handleChangeOptionMatch("isSuicide")}
        />
      </ContentOptions>

      <Button label="Salvar" onPress={handleSaveMatch} />

      <Modal
        isVisible={modal.isVisible}
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
                // onPress={() => handleUpdatePlayerInMatcher(item)}
              />
            )}
            contentContainerStyle={ModalBodyStyle}
          />
        </ModalContent>
      </Modal>
    </Container>
  )
}
