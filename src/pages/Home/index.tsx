import { useState } from "react"
import { format } from "date-fns"
import uuid from "react-native-uuid"
import { Image } from "react-native"
import Modal from "react-native-modal"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { players } from "@/defaults/players"
import { storageKey } from "@/constants/storage"

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
import { OptionMatchProps, MatchesByUniqueDateLocal } from "@/dtos/MatchDTO"

import { showToast } from "@/utils/showToast"

import vs from "@/assets/vs.png"

import {
  // page
  Container,
  DateToday,
  ContentMatchesList,
  ContentOptions,
  // modal
  modalStyle,
  ModalContent,
  ModalPicker,
  ModalHeader,
  ModalTitle,
  NumberOfPlayers,
  ModalPlayersList,
} from "./styles"

interface ReturnGetListPlayers {
  players: PlayerWithQuantityMatchesProps[]
}

interface ModalProps {
  isVisible: boolean
  playerPressed: PlayerPressProps
}

export function Home() {
  const currentDate = format(new Date(), "dd/MM/yyyy")

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
      return showToast.info(
        "Selecione o jogador que venceu a partida para salvar"
      )
    }

    try {
      const winnerPlayerId =
        winnerPlayer === "playerOne" ? playerOne?.id : playerTwo?.id

      const storage = await AsyncStorage.getItem(storageKey)

      let matches: MatchesByUniqueDateLocal[] = []

      if (!storage) {
        // create storage key
        await AsyncStorage.setItem(storageKey, JSON.stringify(matches))
      } else {
        // get storage
        matches = JSON.parse(storage)
      }

      const createdAt = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
      const newMatch: MatchesByUniqueDateLocal = {
        id: uuid.v4() as string,
        isCapote: optionMatch === "isCapote",
        isSuicide: optionMatch === "isSuicide",
        playersIds: [playerOne.id, playerTwo.id],
        winnerPlayerId,
        createdAt,
      }

      matches = [...matches, newMatch]

      // save match
      await AsyncStorage.setItem(storageKey, JSON.stringify(matches))

      showToast.success("Partida criada com sucesso")

      setOptionMatch(null)
      setWinnerPlayer(null)
    } catch (e) {
      showToast.error("Não foi possível salvar a partida")
      console.log("problem", e)
    }
  }

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
        style={modalStyle}
        statusBarTranslucent
        swipeDirection={["down"]}
        propagateSwipe
      >
        <ModalContent>
          <ModalPicker />

          <ModalHeader>
            <ModalTitle>Jogadores</ModalTitle>
            <NumberOfPlayers>Total {players.length}</NumberOfPlayers>
          </ModalHeader>

          <ModalPlayersList
            data={players}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={Divider}
            renderItem={({ item }) => (
              <Player
                player={item}
                disabled={
                  item.id === playerOne?.id || item.id === playerTwo?.id
                }
                onPress={() => handleUpdatePlayerInMatcher(item)}
              />
            )}
          />
        </ModalContent>
      </Modal>
    </Container>
  )
}
