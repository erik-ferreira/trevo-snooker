import { format } from "date-fns"
import { useEffect, useState } from "react"
import { useTheme } from "styled-components/native"
import { useNavigation } from "@react-navigation/native"

import { api } from "@/services/api"

import { MatchesDates } from "@/dtos/MatchDTO"

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

  const [loadingMatchesDates, setLoadingMatchesDates] = useState(false)
  const [matchesDates, setMatchesDates] = useState<MatchesDates[]>([])

  function handleNavigateToMatches(date: string) {
    navigation.navigate("Matches", { date })
  }

  async function onGetListMatchesDate() {
    try {
      setLoadingMatchesDates(true)

      const response = await api.get<ReturnGetListMatchesDates>(
        "/matches/dates"
      )

      const formatListMatchesDates: MatchesDates[] = response.data.matches.map(
        (match) => ({
          ...match,
          createdAt: format(new Date(match.createdAt), "dd/MM/yyyy"),
        })
      )

      setMatchesDates(formatListMatchesDates)
    } catch (err) {
      showToast.error("Não foi possível carregar a lista das datas de partidas")
    } finally {
      setLoadingMatchesDates(false)
    }
  }

  useEffect(() => {
    onGetListMatchesDate()
  }, [])

  return (
    <Container>
      {loadingMatchesDates ? (
        <LoadingSpinner />
      ) : matchesDates?.length === 0 ? (
        <MessageNotFound>Nenhuma data de partida encontrada</MessageNotFound>
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
        />
      )}
    </Container>
  )
}
