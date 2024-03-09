import styled from "styled-components/native"
import { StyleProp, ViewStyle, FlatListProps } from "react-native"

export const Container = styled.SafeAreaView`
  flex: 1;
  gap: 36px;
  align-items: center;
  justify-content: center;

  padding: 40px 24px;
  background-color: ${(props) => props.theme.colors.page};
`

// modal
export const modalStyle: StyleProp<ViewStyle> = {
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
  justify-content: center;
  padding: 0 16px;
  margin-bottom: 8px;
`

export const ModalMessage = styled.Text`
  color: ${(props) => props.theme.colors.slate["200"]};
  font-size: 18px;
  font-family: ${(props) => props.theme.fonts.raj.bold};
  text-align: center;
`

export const ContentButtons = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 16px;

  margin-bottom: 10px;
`

export const NumberOfPlayers = styled.Text`
  color: ${(props) => props.theme.colors.slate["200"]};
  font-size: 16px;
  font-family: ${(props) => props.theme.fonts.raj.semiBold};
`
