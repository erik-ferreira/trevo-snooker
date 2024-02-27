import { format } from "date-fns"
import { FlatList } from "react-native"
import { useEffect, useState } from "react"
import { useTheme } from "styled-components/native"
import { useNavigation } from "@react-navigation/native"

import { api } from "@/services/api"
import { MatchesDates } from "@/dtos/MatchDTO"

import { Icon } from "@/components/Icon"
import { Select } from "@/components/Select"
import { Divider } from "@/components/Divider"

import { showToast } from "@/utils/showToast"

import { Container, DateOfAMatch, DateOfAMatchTitle } from "./styles"

interface DaysMatchProps {
  title: string
}

const daysMatches: DaysMatchProps[] = [
  {
    title: "11/02/2024",
  },
  {
    title: "20/02/2024",
  },
]

interface ReturnGetListMatchesDates {
  matches: MatchesDates[]
}

export function History() {
  const { colors } = useTheme()
  const navigation = useNavigation()

  const [loadingMatchesDates, setLoadingMatchesDates] = useState(false)
  const [matchesDates, setMatchesDates] = useState<MatchesDates[]>([])

  function handleNavigateToMatches() {
    navigation.navigate("Matches")
  }

  async function onGetListMatchesDate() {
    try {
      setLoadingMatchesDates(true)

      const response = await api.get<ReturnGetListMatchesDates>(
        "/matches/dates"
      )

      const formatListMatchesDAtes = response.data.matches.map((match) => ({
        ...match,
        createdAt: format(new Date(match.createdAt), "dd/MM/yyyy"),
      }))

      setMatchesDates(formatListMatchesDAtes)
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
      <Select />

      <FlatList
        data={matchesDates}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <DateOfAMatch onPress={handleNavigateToMatches}>
            <DateOfAMatchTitle>{item?.createdAt}</DateOfAMatchTitle>
            <Icon name="ChevronRight" color={colors.slate[400]} />
          </DateOfAMatch>
        )}
        ItemSeparatorComponent={Divider}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </Container>
  )
}
