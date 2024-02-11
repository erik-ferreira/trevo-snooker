import { FlatList } from "react-native"
import { useNavigation } from "@react-navigation/native"

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
  const navigation = useNavigation()

  function handleNavigate() {
    navigation.navigate("Test")
  }

  return (
    <Container>
      <Select />

      <FlatList
        data={daysMatches}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <DateOfAMatch onPress={handleNavigate}>
            <DateOfAMatchTitle>{item?.title}</DateOfAMatchTitle>
          </DateOfAMatch>
        )}
        ItemSeparatorComponent={Divider}
      />
    </Container>
  )
}
