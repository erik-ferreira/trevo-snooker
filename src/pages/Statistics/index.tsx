import { useState } from "react"
import { View, Image, Text } from "react-native"
import { useTheme } from "styled-components/native"

import { Icon } from "@/components/Icon"

import player from "@/assets/player.png"

import {
  Container,
  ContentTitle,
  Title,
  ButtonPreviewMode,
  Box,
  InfoBox,
  Row,
} from "./styles"

export function Statistics() {
  const { colors, fonts } = useTheme()

  const [previewMode, setPreviewMode] = useState<"vertical" | "horizontal">(
    "horizontal"
  )
  const isSelectedHorizontal = previewMode === "horizontal"
  const isSelectedVertical = previewMode === "vertical"

  const table = {
    header: ["F", "V", "D", "CF", "CS", "S", "P"],
    values: [
      [
        <View
          style={{
            width: 24,
            height: 24,
            borderRadius: 12,
            backgroundColor: "#F00",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: colors.white,
              fontFamily: fonts.mono.bold,
            }}
          >
            E
          </Text>
        </View>,
        38,
        27,
        3,
        2,
        1,
        0,
      ],
      [
        <View
          style={{
            width: 24,
            height: 24,
            borderRadius: 12,
            backgroundColor: "#F00",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: colors.white,
              fontFamily: fonts.mono.bold,
            }}
          >
            E
          </Text>
        </View>,
        38,
        27,
        3,
        2,
        1,
        0,
      ],
      [
        <View
          style={{
            width: 24,
            height: 24,
            borderRadius: 12,
            backgroundColor: "#F00",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: colors.white,
              fontFamily: fonts.mono.bold,
            }}
          >
            E
          </Text>
        </View>,
        38,
        27,
        3,
        2,
        1,
        0,
      ],
    ],
  }

  return (
    <Container>
      <ContentTitle>
        <Title>Visualizar tabela em modo:</Title>

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

      <View>
        <Row>
          {table.header.map((item) => (
            <Box key={item} isHead>
              <InfoBox>{item}</InfoBox>
            </Box>
          ))}
        </Row>
        {table.values.map((item, index) => {
          return (
            <Row key={index}>
              {item.map((val, index) => (
                <Box key={index}>
                  <InfoBox>{val}</InfoBox>
                </Box>
              ))}
            </Row>
          )
        })}
      </View>
    </Container>
  )
}
