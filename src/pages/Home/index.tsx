import { format } from "date-fns"
import Modal from "react-native-modal"
import { useEffect, useState } from "react"
import Toast from "react-native-toast-message"
import { Image, FlatList, Text } from "react-native"

import { api } from "@/services/api"

import { Player } from "@/components/Player"
import { Button } from "@/components/Button"
import { Option } from "@/components/Option"
import { Divider } from "@/components/Divider"
import { PlayerOfTheMatch } from "@/components/PlayerOfTheMatch"

import {
  PlayerWithQuantityMatchesProps,
  WinnerPlayerProps,
  PlayerPressProps,
} from "@/dtos/PlayerDTO"
import { OptionMatchProps } from "@/dtos/MatchDTO"

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
  const [playerOne, setPlayerOne] = useState<PlayerWithQuantityMatchesProps>(
    players[0]
  )
  const [playerTwo, setPlayerTwo] = useState<PlayerWithQuantityMatchesProps>(
    players[1]
  )

  const [optionMatch, setOptionMatch] = useState<OptionMatchProps>(null)
  const [winnerPlayer, setWinnerPlayer] = useState<WinnerPlayerProps>(null)

  const [modal, setModal] = useState<ModalProps>({
    isVisible: false,
    playerPressed: "playerOne",
  })

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

  function handleUpdatePlayerInMatcher(player: PlayerWithQuantityMatchesProps) {
    if (modal.playerPressed === "playerOne") {
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
        text1: "Selecione o jogador que venceu a partida para salvar",
        visibilityTime: 2000,
      })
    }

    try {
      const winnerPlayerId =
        winnerPlayer === "playerOne" ? playerOne.id : playerTwo.id

      const data = {
        isCapote: optionMatch === "isCapote",
        isSuicide: optionMatch === "isSuicide",
        winnerPlayerId,
        playersIds: [playerOne.id, playerTwo.id],
      }

      const response = await api.post("/matches", data)

      if (response.status === 201) {
        Toast.show({
          type: "success",
          text1: "Partida criada com sucesso",
          visibilityTime: 2000,
        })
      }
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Não foi possível salvar a partida",
        visibilityTime: 2000,
      })
      console.log("problem", e)
    }
  }

  async function onGetListPlayers() {
    const response = await api.get("/players")

    setPlayers(response.data.players)
    setPlayerOne(response.data.players[0])
    setPlayerTwo(response.data.players[1])
  }

  useEffect(() => {
    onGetListPlayers()
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
            <NumberOfPlayers>Total {players.length}</NumberOfPlayers>
          </ModalHeader>

          <FlatList
            data={players}
            keyExtractor={(item) => item.id}
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
