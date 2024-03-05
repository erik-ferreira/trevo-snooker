import styled from "styled-components/native"

import { SourceName } from "@/dtos/PlayerDTO"

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.page};

  padding: 0 24px;
`

export const ContentTitle = styled.SafeAreaView`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.slate[400]};
  font-family: ${(props) => props.theme.fonts.orbi.semiBold};
  font-size: 18px;
`

interface ButtonPreviewModeProps {
  isSelected?: boolean
}

export const ButtonPreviewMode = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7,
}))<ButtonPreviewModeProps>`
  width: 32px;
  height: 32px;

  border-radius: 4px;
  border: 1px solid
    ${(props) =>
      !props.isSelected ? props.theme.colors.slate[400] : "transparent"};
  background-color: ${(props) =>
    props.isSelected ? props.theme.colors.blue[800] : "transparent"};

  align-items: center;
  justify-content: center;

  transition: background-color 2s linear;
`

interface TableAndLineProps {
  direction: "vertical" | "horizontal"
}

export const Table = styled.View<TableAndLineProps>`
  flex-direction: ${(props) =>
    props.direction === "horizontal" ? "column" : "row"};
`

export const Line = styled.View<TableAndLineProps>`
  flex-direction: ${(props) =>
    props.direction === "horizontal" ? "row" : "column"};
`

interface BoxProps {
  isHead?: boolean
}

export const Box = styled.View<BoxProps>`
  width: 50px;
  height: 40px;
  background-color: ${(props) =>
    props.isHead ? props.theme.colors.gray[800] : props.theme.colors.gray[900]};

  align-items: center;
  justify-content: center;
`

export const InfoBox = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.colors.white};
  font-family: ${(props) => props.theme.fonts.mono.bold};
`

const colorsAvatar: Record<SourceName, string> = {
  antonio: "#EC930A",
  breno: "#a292e8",
  david: "#5DADE2",
  erik: "#EC0A0A",
}

interface AvatarContentProps {
  slugAvatar: string
}

export const AvatarContent = styled.View<AvatarContentProps>`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: ${(props) => colorsAvatar[props.slugAvatar as SourceName]};
  align-items: center;
  justify-content: center;
`

export const AvatarLetter = styled.Text`
  color: ${(props) => props.theme.colors.white};
  font-family: ${(props) => props.theme.fonts.mono.bold};
`
