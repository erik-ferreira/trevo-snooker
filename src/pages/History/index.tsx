import { Select } from "@/components/Select"

import { Container } from "./styles"
import { AccordionHistoryOfTheDays } from "@/components/AccordionHistoryOfTheDays"

interface HistoryProps {}

export function History({ ...rest }: HistoryProps) {
  return (
    <Container>
      <Select />

      <AccordionHistoryOfTheDays />
    </Container>
  )
}
