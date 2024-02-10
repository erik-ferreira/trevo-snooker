import styled from "styled-components/native"

export const ContainerPlayer = styled.TouchableOpacity`
  gap: 24px;
  flex-direction: row;
  align-items: center;
`

export const ContentPlayerAvatar = styled.View`
  overflow: hidden;
  border-radius: 40px;
  border: 2px solid ${(props) => props.theme.colors.slate[400]};
`

export const ContentPlayerDescriptions = styled.View`
  gap: 4px;
`

export const PlayerName = styled.Text`
  color: ${(props) => props.theme.colors.slate[400]};
  font-family: ${(props) => props.theme.fonts.raj.bold};
  font-size: 24px;
`

export const NumberOfMatchesPlayed = styled.Text`
  color: ${(props) => props.theme.colors.slate[400]};
  font-family: ${(props) => props.theme.fonts.raj.normal};
  font-size: 16px;
`
