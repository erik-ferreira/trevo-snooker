import { Image } from "react-native"
import Modal from "react-native-modal"
import { useEffect, useState } from "react"
import { useRoute } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { players } from "@/defaults/players"
import { storageKey } from "@/constants/storage"

import {
  MatchesByUniqueDate,
  MatchesByUniqueDateLocal,
  MatchesNormalByUniqueDateLocal,
} from "@/dtos/MatchDTO"

import { Button } from "@/components/Button"
import { Option } from "@/components/Option"
import { Divider } from "@/components/Divider"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { MessageNotFound } from "@/components/MessageNotFound"
import { PlayerOfTheMatch } from "@/components/PlayerOfTheMatch"

import { showToast } from "@/utils/showToast"
import { formatDate } from "@/utils/formatDate"

import vs from "@/assets/vs.png"

import {
  Container,
  ContentListMatches,
  MatchContent,
  MatchNumber,
  MatchContentPlayers,
  MatchContentOptions,
} from "./styles"

import {
  modalStyle,
  ModalContent,
  ModalPicker,
  ModalHeader,
  ModalMessage,
  ContentButtons,
} from "../Settings/styles"

interface RouteProps {
  date: string
}

interface ReturnGetListMatchesDates {
  matches: MatchesByUniqueDate[]
}

export function Matches() {
  const route = useRoute()
  const { date } = route.params as RouteProps

  const [modalIsVisible, setModalIsVisible] = useState(false)

  const [loadingMatches, setLoadingMatches] = useState(false)
  const [matches, setMatches] = useState<MatchesNormalByUniqueDateLocal[]>([])

  const [matchIdToDelete, setMatchIdToDelete] = useState<null | string>(null)

  async function onGetListMatches() {
    try {
      if (!date) {
        throw new Error("Data não informada")
      }

      setLoadingMatches(true)

      const storage = await AsyncStorage.getItem(storageKey)

      if (!storage) {
        throw new Error("Não foi possível buscar as partidas do storage")
      }

      const formatPlayers = {} as any
      players.map((player) => {
        formatPlayers[player.id] = player
      })

      const matchesStorage = JSON.parse(storage) as MatchesByUniqueDateLocal[]

      const formatMatches: MatchesNormalByUniqueDateLocal[] =
        matchesStorage.map((match) => ({
          ...match,
          players: match.playersIds.map((playerId) => formatPlayers[playerId]),
          createdAt: formatDate(match.createdAt, true),
        }))

      const filteredMatches = formatMatches.filter(
        (match) => match.createdAt === date
      )

      setMatches(filteredMatches)
    } catch (err) {
      let message = "Não foi possível carregar a lista das partidas"

      if (err instanceof Error) {
        message = err.message
      }

      showToast.error(message)
    } finally {
      setLoadingMatches(false)
    }
  }

  function handleOpenModal(matchId: string) {
    setMatchIdToDelete(matchId)

    setModalIsVisible(true)
  }

  function handleCloseModal() {
    setModalIsVisible(false)
  }

  async function handleDeleteMatch() {
    if (!matchIdToDelete) {
      return showToast.info(
        "Não foi possível excluir a partida, tente novamente mais tarde"
      )
    }

    const storage = await AsyncStorage.getItem(storageKey)

    if (!storage) {
      return showToast.info("Não foi possível buscar a partida do storage")
    }

    const matchesStorage = JSON.parse(storage) as MatchesByUniqueDateLocal[]

    const filterMatches = matchesStorage.filter(
      (match) => match.id !== matchIdToDelete
    )

    await AsyncStorage.setItem(storageKey, JSON.stringify(filterMatches))

    handleCloseModal()

    onGetListMatches()
  }

  useEffect(() => {
    onGetListMatches()
  }, [])

  return (
    <Container>
      {loadingMatches ? (
        <LoadingSpinner />
      ) : matches.length === 0 ? (
        <MessageNotFound message="Nenhuma partida encontrada" />
      ) : (
        <>
          <ContentListMatches
            data={matches}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => {
              const [playerOne, playerTwo] = item.players

              return (
                <MatchContent
                  key={item?.id}
                  onPress={() => handleOpenModal(item.id)}
                >
                  <MatchNumber>{index + 1}º partida</MatchNumber>

                  <MatchContentPlayers>
                    <PlayerOfTheMatch
                      player={playerOne}
                      variant="playerOne"
                      isReadOnly
                      isWinner={item.winnerPlayerId === playerOne.id}
                    />

                    <Image source={vs} width={50} />

                    <PlayerOfTheMatch
                      player={playerTwo}
                      variant="playerTwo"
                      isReadOnly
                      isWinner={item.winnerPlayerId === playerTwo.id}
                    />
                  </MatchContentPlayers>

                  <MatchContentOptions>
                    <Option label="Capote" isChecked={item.isCapote} disabled />
                    <Option
                      label="Suicídio"
                      isChecked={item.isSuicide}
                      disabled
                    />
                  </MatchContentOptions>
                </MatchContent>
              )
            }}
            ItemSeparatorComponent={Divider}
          />

          <Modal
            isVisible={modalIsVisible}
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
                <ModalMessage>
                  Você tem certeza que deseja excluir a partida?
                </ModalMessage>
              </ModalHeader>

              <ContentButtons>
                <Button
                  label="Não"
                  variant="secondary"
                  isFullWidth={false}
                  onPress={handleCloseModal}
                />
                <Button
                  label="Sim"
                  isFullWidth={false}
                  onPress={handleDeleteMatch}
                />
              </ContentButtons>
            </ModalContent>
          </Modal>
        </>
      )}
    </Container>
  )
}
