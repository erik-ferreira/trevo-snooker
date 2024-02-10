import { useState } from "react"
import { useTheme } from "styled-components/native"

import { Icon } from "@/components/Icon"

import { Container, ContentTitle, Title, ButtonPreviewMode } from "./styles"

export function Statistics() {
  const { colors } = useTheme()

  const [previewMode, setPreviewMode] = useState<"vertical" | "horizontal">(
    "horizontal"
  )
  const isSelectedHorizontal = previewMode === "horizontal"
  const isSelectedVertical = previewMode === "vertical"

  return (
    <Container>
      <ContentTitle>
        <Title>Visualizar tabela no formato:</Title>

        <ButtonPreviewMode
          isSelected={isSelectedHorizontal}
          onPress={() => setPreviewMode("horizontal")}
        >
          <Icon name="RectangleHorizontal" color={colors.slate[200]} />
        </ButtonPreviewMode>

        <ButtonPreviewMode
          isSelected={isSelectedVertical}
          onPress={() => setPreviewMode("vertical")}
        >
          <Icon name="RectangleVertical" color={colors.slate[200]} />
        </ButtonPreviewMode>
      </ContentTitle>
    </Container>
  )
}
