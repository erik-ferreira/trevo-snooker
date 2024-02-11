import { FlatList } from "react-native"
import { useNavigation } from "@react-navigation/native"

import { Select } from "@/components/Select"

import { Container } from "./styles"
import {
  HeaderSection,
  SectionDateTitle,
} from "@/components/AccordionHistoryOfTheDays/styles"

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

interface HistoryProps {}

export function History({ ...rest }: HistoryProps) {
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
          <HeaderSection onPress={handleNavigate}>
            <SectionDateTitle>{item?.title}</SectionDateTitle>
          </HeaderSection>
        )}
      />
    </Container>
  )
}
