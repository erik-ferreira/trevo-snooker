import styled, { css } from "styled-components/native"
import { FlatListProps } from "react-native"

import { MatchesDates } from "@/dtos/MatchDTO"

interface ContainerProps {
  isEmptyMatchesDates?: boolean
}

export const Container = styled.SafeAreaView<ContainerProps>`
  flex: 1;
  gap: 36px;
  justify-content: center;

  ${(props) =>
    props.isEmptyMatchesDates &&
    css`
      padding: 0 24px;
    `}

  background-color: ${(props) => props.theme.colors.page};
`

export const ContentListMatchesDates = styled.FlatList.attrs(() => ({
  contentContainerStyle: {
    paddingVertical: 32,
    paddingHorizontal: 24,
    borderWidth: 1,
  },
}))<FlatListProps<MatchesDates>>``

export const DateOfAMatch = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7,
}))`
  width: 100%;
  padding: 8px 16px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const DateOfAMatchTitle = styled.Text`
  color: ${(props) => props.theme.colors.slate[400]};
  font-size: 24px;
  font-family: ${(props) => props.theme.fonts.orbi.normal};
`
