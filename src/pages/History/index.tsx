import { FlatList } from "react-native"
import { useTheme } from "styled-components/native"
import { useNavigation } from "@react-navigation/native"

import { Icon } from "@/components/Icon"
import { Select } from "@/components/Select"
import { Divider } from "@/components/Divider"

import { Container, DateOfAMatch, DateOfAMatchTitle } from "./styles"

interface DaysMatchProps {
  title: string
}

const daysMatches: DaysMatchProps[] = [
  {
    title: "20/01/2024",
  },
  {
    title: "25/01/2024",
  },
  {
    title: "30/01/2024",
  },
  {
    title: "05/01/2024",
  },
  {
    title: "17/01/2024",
  },
  {
    title: "25/01/2024",
  },
  {
    title: "20/01/2024",
  },
  {
    title: "25/01/2024",
  },
  {
    title: "30/01/2024",
  },
  {
    title: "05/01/2024",
  },
  {
    title: "17/01/2024",
  },
  {
    title: "25/01/2024",
  },
  {
    title: "20/01/2024",
  },
  {
    title: "25/01/2024",
  },
  {
    title: "30/01/2024",
  },
  {
    title: "05/01/2024",
  },
  {
    title: "17/01/2024",
  },
  {
    title: "25/01/2024",
  },
]

export function History() {
  const { colors } = useTheme()
  const navigation = useNavigation()

  function handleNavigateToMatches() {
    navigation.navigate("Matches")
  }

  return (
    <Container>
      <Select />

      <FlatList
        data={daysMatches}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <DateOfAMatch onPress={handleNavigateToMatches}>
            <DateOfAMatchTitle>{item?.title}</DateOfAMatchTitle>
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
