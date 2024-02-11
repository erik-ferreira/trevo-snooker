import { useEffect, useState } from "react"
import { View, Text, Image, ScrollView, FlatList } from "react-native"
import Accordion from "react-native-collapsible/Accordion"

import { Icon } from "@/components/Icon"
import { Option } from "@/components/Option"
import { PlayerOfTheMatch } from "@/components/PlayerOfTheMatch"

import vs from "@/assets/vs.png"

import {
  HeaderSection,
  SectionDateTitle,
  ContentSection,
  MatchNumber,
  ContentMatch,
  ContentOptionsByMatch,
} from "./styles"

interface MatchProps {
  matchNumber: number
  playerOneSrc: string
  playerTwoSrc: string
  winningPlayerId: number
  isSuicide: boolean
  isSnookerHood: boolean
}

interface DaysMatchProps {
  title: string
  matches: MatchProps[]
}

interface AccordionHistoryOfTheDaysProps {}

export function AccordionHistoryOfTheDays({
  ...rest
}: AccordionHistoryOfTheDaysProps) {
  const [activeDay, setActiveDay] = useState<number[]>([])

  const matches = [
    {
      matchNumber: 1,
      playerOneSrc: "",
      playerTwoSrc: "",
      winningPlayerId: 1,
      isSuicide: false,
      isSnookerHood: false,
    },
    {
      matchNumber: 2,
      playerOneSrc: "",
      playerTwoSrc: "",
      winningPlayerId: 1,
      isSuicide: false,
      isSnookerHood: false,
    },
    {
      matchNumber: 3,
      playerOneSrc: "",
      playerTwoSrc: "",
      winningPlayerId: 1,
      isSuicide: false,
      isSnookerHood: false,
    },
    {
      matchNumber: 4,
      playerOneSrc: "",
      playerTwoSrc: "",
      winningPlayerId: 1,
      isSuicide: false,
      isSnookerHood: false,
    },
    {
      matchNumber: 5,
      playerOneSrc: "",
      playerTwoSrc: "",
      winningPlayerId: 1,
      isSuicide: false,
      isSnookerHood: false,
    },
  ]

  const daysMatches: DaysMatchProps[] = [
    {
      title: "20/01/2024",
      matches,
    },
    {
      title: "25/01/2024",
      matches,
    },
    {
      title: "30/01/2024",
      matches,
    },
    {
      title: "05/01/2024",
      matches,
    },
    {
      title: "17/01/2024",
      matches,
    },
    {
      title: "25/01/2024",
      matches,
    },
    {
      title: "20/01/2024",
      matches,
    },
    {
      title: "25/01/2024",
      matches,
    },
    {
      title: "30/01/2024",
      matches,
    },
    {
      title: "05/01/2024",
      matches,
    },
    {
      title: "17/01/2024",
      matches,
    },
    {
      title: "25/01/2024",
      matches,
    },
    {
      title: "20/01/2024",
      matches,
    },
    {
      title: "25/01/2024",
      matches,
    },
    {
      title: "30/01/2024",
      matches,
    },
    {
      title: "05/01/2024",
      matches,
    },
    {
      title: "17/01/2024",
      matches,
    },
    {
      title: "25/01/2024",
      matches,
    },
  ]

  return (
    <ScrollView>
      {daysMatches.map((day, index) => {
        return (
          <HeaderSection key={index}>
            <SectionDateTitle>{day?.title}</SectionDateTitle>
          </HeaderSection>
        )
      })}
    </ScrollView>
  )
}
