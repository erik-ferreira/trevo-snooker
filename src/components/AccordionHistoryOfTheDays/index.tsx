import { useEffect, useState } from "react"
import { View, Text } from "react-native"
import Accordion from "react-native-collapsible/Accordion"

import { Icon } from "@/components/Icon"

import { HeaderSection, SectionDateTitle, ContentSection } from "./styles"

interface AccordionHistoryOfTheDaysProps {}

export function AccordionHistoryOfTheDays({
  ...rest
}: AccordionHistoryOfTheDaysProps) {
  const [activeDay, setActiveDay] = useState<number[]>([])

  return (
    <Accordion
      containerStyle={{ width: "100%" }}
      sections={[
        {
          title: "20/01/2024",
          content: (
            <ContentSection>
              <Text>dia 01</Text>
            </ContentSection>
          ),
        },
        {
          title: "09/02/2024",
          content: (
            <ContentSection>
              <Text>dia 02</Text>
            </ContentSection>
          ),
        },
      ]}
      activeSections={activeDay}
      onChange={(val: any) => {
        setActiveDay(val)
      }}
      renderContent={(section: any) => section.content}
      renderHeader={(section: any) => (
        <HeaderSection>
          <SectionDateTitle>{section?.title}</SectionDateTitle>
        </HeaderSection>
      )}
    />
  )
}
