import { format } from "date-fns"
import uuid from "react-native-uuid"
import { useEffect, useState } from "react"
import { RefreshControl } from "react-native"
import { useTheme } from "styled-components/native"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { api } from "@/services/api"
import { storageKey } from "@/constants/storage"

import { MatchesDates, MatchesByUniqueDateLocal } from "@/dtos/MatchDTO"

import { Icon } from "@/components/Icon"
import { Divider } from "@/components/Divider"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { MessageNotFound } from "@/components/MessageNotFound"

import { showToast } from "@/utils/showToast"

import {
  Container,
  ContentListMatchesDates,
  DateOfAMatch,
  DateOfAMatchTitle,
} from "./styles"

interface ReturnGetListMatchesDates {
  matches: MatchesDates[]
}

export function History() {
  const { colors } = useTheme()
  const navigation = useNavigation()

  const [refreshMatchesDates, setRefreshMatchesDates] = useState(false)

  const [loadingMatchesDates, setLoadingMatchesDates] = useState(false)
  const [matchesDates, setMatchesDates] = useState<MatchesDates[]>([])

  function handleNavigateToMatches(date: string) {
    navigation.navigate("Matches", { date })
  }

  async function onGetListMatchesDate(refresh = false) {
    try {
      const storage = await AsyncStorage.getItem(storageKey)

      if (!storage) {
        throw new Error("Não foi possível buscar os dados do storage")
      }

      if (refresh) {
        setRefreshMatchesDates(true)
      } else {
        setLoadingMatchesDates(true)
      }

      const matches = JSON.parse(storage) as MatchesByUniqueDateLocal[]

      const convertMatches = matches.map(
        (match) => match.createdAt.split("T")[0]
      )

      const formatMatches: MatchesDates[] = Array.from(
        new Set(convertMatches)
      ).map((date) => ({
        id: uuid.v4() as string,
        createdAt: format(new Date(date), "dd/MM/yyyy"),
      }))

      console.log("----------------------------")
      console.log("matches", JSON.stringify(matches, null, 2))
      console.log("convertMatches", JSON.stringify(convertMatches, null, 2))
      console.log("formatMatches", JSON.stringify(formatMatches, null, 2))

      setMatchesDates(formatMatches)
    } catch (err) {
      let message = "Não foi possível carregar a lista das datas de partidas"

      if (err instanceof Error) {
        message = err.message
      }

      showToast.error(message)
    } finally {
      if (refresh) {
        setRefreshMatchesDates(false)
      } else {
        setLoadingMatchesDates(false)
      }
    }
  }

  async function onRefreshMatchesDates() {
    onGetListMatchesDate(true)
  }

  async function onTryGetListMatchesDateAgain() {
    onGetListMatchesDate(false)
  }

  useEffect(() => {
    onGetListMatchesDate()
  }, [])

  return (
    <Container isEmptyMatchesDates={matchesDates.length === 0}>
      {loadingMatchesDates ? (
        <LoadingSpinner />
      ) : matchesDates?.length === 0 ? (
        <MessageNotFound
          message="Nenhuma data de partida encontrada"
          onTryAgain={onTryGetListMatchesDateAgain}
        />
      ) : (
        <ContentListMatchesDates
          data={matchesDates}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DateOfAMatch
              onPress={() => handleNavigateToMatches(item?.createdAt)}
            >
              <DateOfAMatchTitle>{item?.createdAt}</DateOfAMatchTitle>
              <Icon name="ChevronRight" color={colors.slate[400]} />
            </DateOfAMatch>
          )}
          ItemSeparatorComponent={Divider}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshMatchesDates}
              onRefresh={onRefreshMatchesDates}
            />
          }
        />
      )}
    </Container>
  )
}
