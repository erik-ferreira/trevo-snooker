import styled from "styled-components/native"
import { StyleProp, ViewStyle } from "react-native"

export const Container = styled.SafeAreaView`
  flex: 1;
  gap: 36px;
  align-items: center;
  justify-content: center;

  padding: 40px 32px;
  background-color: ${(props) => props.theme.colors.page};
`

export const DateToday = styled.Text`
  color: ${(props) => props.theme.colors.blue["800"]};
  font-family: ${(props) => props.theme.fonts.orbi.semiBold};
  font-size: 40px;
`

export const ContentMatchesList = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 16px;
`

export const ContentOptions = styled.View`
  gap: 8px;
`

// modal
export const ModalStyle: StyleProp<ViewStyle> = {
  margin: 0,
  justifyContent: "flex-end",
}

export const ModalContent = styled.View`
  background-color: ${(props) => props.theme.colors.section};
  max-height: 496px;
`

export const ModalPicker = styled.View`
  width: 80px;
  height: 6px;
  background-color: ${(props) => props.theme.colors.slate["400"]};
  border-radius: 8px;
  margin: 10px auto;
`

export const ModalHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  margin-bottom: 8px;
`

export const ModalTitle = styled.Text`
  color: ${(props) => props.theme.colors.slate["200"]};
  font-size: 24px;
  font-family: ${(props) => props.theme.fonts.raj.bold};
`

export const NumberOfPlayers = styled.Text`
  color: ${(props) => props.theme.colors.slate["200"]};
  font-size: 16px;
  font-family: ${(props) => props.theme.fonts.raj.semiBold};
`

export const ModalBodyStyle: StyleProp<ViewStyle> = {
  paddingHorizontal: 16,
  paddingTop: 16,
  paddingBottom: 24,
}
