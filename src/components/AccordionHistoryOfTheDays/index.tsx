import { useEffect, useState } from "react"
import { View, Text, Image, ScrollView } from "react-native"
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
  ]

  return (
    <Accordion
      containerStyle={{ width: "100%" }}
      sections={daysMatches}
      activeSections={activeDay}
      onChange={(val: number[]) => setActiveDay(val)}
      renderHeader={(section: DaysMatchProps) => (
        <HeaderSection>
          <SectionDateTitle>{section?.title}</SectionDateTitle>
        </HeaderSection>
      )}
      renderContent={(section: DaysMatchProps) => {
        return (
          <ScrollView>
            {section.matches.map((match) => (
              <ContentSection key={match?.matchNumber}>
                <MatchNumber>{match?.matchNumber}º partida</MatchNumber>
                <ContentMatch>
                  <PlayerOfTheMatch isReadOnly />
                  <Image source={vs} width={50} />
                  <PlayerOfTheMatch variant="player-two" isReadOnly isWinner />
                </ContentMatch>

                <ContentOptionsByMatch>
                  <Option label="Capote" />
                  <Option label="Suicídio" />
                </ContentOptionsByMatch>
              </ContentSection>
            ))}
          </ScrollView>
        )
      }}
    />
  )
}
