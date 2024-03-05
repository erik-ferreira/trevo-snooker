import styled from "styled-components/native"
import { FlatListProps } from "react-native"

import { MatchesByUniqueDate } from "@/dtos/MatchDTO"

export const Container = styled.SafeAreaView`
  flex: 1;
  gap: 36px;
  justify-content: center;

  background-color: ${(props) => props.theme.colors.page};
`

export const ContentListMatches = styled.FlatList.attrs(() => ({
  contentContainerStyle: {
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
}))<FlatListProps<MatchesByUniqueDate>>``

export const MatchContent = styled.View`
  padding: 8px;

  gap: 8px;
  align-items: center;
`

export const MatchNumber = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.colors.slate[200]};
  font-family: ${(props) => props.theme.fonts.orbi.semiBold};
`

export const MatchContentPlayers = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 24px;
`

export const MatchContentOptions = styled.View`
  gap: 4px;
`
