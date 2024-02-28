import styled from "styled-components/native"
import { FlatListProps } from "react-native"

import { SelectOptions } from "@/components/Select"

export const Container = styled.SafeAreaView`
  flex: 1;
  gap: 36px;

  background-color: ${(props) => props.theme.colors.page};
`

export const ContentListMatchesDates = styled.FlatList.attrs(() => ({
  contentContainerStyle: {
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
}))<FlatListProps<SelectOptions>>``

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
