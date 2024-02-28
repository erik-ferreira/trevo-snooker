import { format } from "date-fns"
import { useEffect, useState } from "react"
import { useTheme } from "styled-components/native"
import { useNavigation } from "@react-navigation/native"

import { api } from "@/services/api"

import { MatchesDates } from "@/dtos/MatchDTO"

import { Icon } from "@/components/Icon"
import { Divider } from "@/components/Divider"
import { Select, SelectOptions } from "@/components/Select"

import { showToast } from "@/utils/showToast"

import {
  Container,
  ContentListMatchesDates,
  DateOfAMatch,
  DateOfAMatchTitle,
} from "./styles"

interface DaysMatchProps {
  title: string
}

interface ReturnGetListMatchesDates {
  matches: MatchesDates[]
}

export function History() {
  const { colors } = useTheme()
  const navigation = useNavigation()

  const [loadingMatchesDates, setLoadingMatchesDates] = useState(false)
  const [matchesDates, setMatchesDates] = useState<SelectOptions[]>([])
  // const [selectedDate, setSelectedDate] = useState("default")

  function handleNavigateToMatches(date: string) {
    navigation.navigate("Matches", { date })
  }

  async function onGetListMatchesDate() {
    try {
      setLoadingMatchesDates(true)

      const response = await api.get<ReturnGetListMatchesDates>(
        "/matches/dates"
      )

      const formatListMatchesDates: SelectOptions[] = response.data.matches.map(
        (match) => ({
          label: format(new Date(match.createdAt), "dd/MM/yyyy"),
          value: match.id,
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
      {/* <Select
        options={matchesDates}
        selectedValue={selectedDate}
        onValueChange={(value) => {
          setSelectedDate(value as string)
        }}
      /> */}

      <ContentListMatchesDates
        data={matchesDates}
        keyExtractor={(item) => item.value}
        renderItem={({ item }) => (
          <DateOfAMatch onPress={() => handleNavigateToMatches(item?.label)}>
            <DateOfAMatchTitle>{item?.label}</DateOfAMatchTitle>
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
