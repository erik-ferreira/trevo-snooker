import { useState } from "react"
import Modal from "react-native-modal"
import { Image, Text, View } from "react-native"
import { useTheme } from "styled-components/native"

import { Player } from "@/components/Player"
import { Button } from "@/components/Button"
import { Option } from "@/components/Option"
import { Divider } from "@/components/Divider"
import { PlayerOfTheMatch } from "@/components/PlayerOfTheMatch"

import { getCurrentDate } from "@/utils/getCurrentDate"

import vs from "@/assets/vs.png"

import {
  Container,
  DateToday,
  ContentMatchesList,
  ContentOptions,
  ModalHeader,
  Title,
  NumberOfPlayers,
  ModalContent,
} from "./styles"

export function Home() {
  const { colors } = useTheme()

  const currentDate = getCurrentDate()

  const [visibleModal, setVisibleModal] = useState(false)

  return (
    <Container>
      <DateToday>{currentDate}</DateToday>

      <ContentMatchesList>
        <PlayerOfTheMatch />
        <Image source={vs} width={50} />
        <PlayerOfTheMatch variant="player-two" isWinner />
      </ContentMatchesList>

      <ContentOptions>
        <Option />
        <Option label="Suicídio" />
      </ContentOptions>

      <Button
        label="Salvar"
        onPress={() => {
          setVisibleModal(true)
        }}
      />

      <Modal isVisible={visibleModal}>
        <Button
          label="Fechar"
          onPress={() => {
            setVisibleModal(false)
          }}
        />
        <View style={{ backgroundColor: colors.section }}>
          <ModalHeader>
            <Title>Jogadores</Title>
            <NumberOfPlayers>Total 4</NumberOfPlayers>
          </ModalHeader>

          <ModalContent>
            <Player playerName="Erik Ferreira" numberOfMatchesPlayed={4} />
            <Divider />
            <Player playerName="Breno da Silva" numberOfMatchesPlayed={1} />
            <Divider />
            <Player playerName="José David" numberOfMatchesPlayed={0} />
          </ModalContent>
        </View>
      </Modal>
    </Container>
  )
}
