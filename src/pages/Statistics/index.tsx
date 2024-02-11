import { useState } from "react"
import { View, Image, Text } from "react-native"
import { useTheme } from "styled-components/native"

import { Icon } from "@/components/Icon"

import player from "@/assets/player.png"

import { Container, ContentTitle, Title, ButtonPreviewMode } from "./styles"

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
      ["x", 38, 27, 3, 2, 1, 0],
      ["x", 38, 10, 3, 2, 1, 0],
      ["x", 38, 10, 3, 2, 1, 0],
      ["x", 38, 10, 3, 2, 1, 0],
      ["x", 38, 10, 3, 2, 1, 0],
    ],
  }

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

      <View style={{}}>
        <View style={{ flexDirection: "row" }}>
          {table.header.map((item) => (
            <View
              style={{
                width: 50,
                height: 40,
                backgroundColor: colors.gray[800],

                alignItems: "center",
                justifyContent: "center",
              }}
              key={item}
            >
              <Text
                style={{
                  fontFamily: fonts.mono.bold,
                  fontSize: 18,
                  color: colors.white,
                }}
              >
                {item}
              </Text>
            </View>
          ))}
        </View>
        {table.values.map((item, index) => {
          return (
            <View key={index} style={{ flexDirection: "row" }}>
              {item.map((val) => (
                <View
                  style={{
                    width: 50,
                    height: 40,
                    backgroundColor: colors.gray[900],

                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: fonts.mono.bold,
                      fontSize: 18,
                      color: colors.white,
                    }}
                  >
                    {val}
                  </Text>
                </View>
              ))}
            </View>
          )
        })}
      </View>
    </Container>
  )
}
