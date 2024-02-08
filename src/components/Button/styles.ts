import styled from "styled-components/native"

export const ButtonContainer = styled.TouchableOpacity`
  width: 100%;
  border-radius: 4px;
  padding: 12px 16px;
  background-color: ${(props) => props.theme.colors.blue["500"]};

  display: flex;
  align-items: center;
  justify-content: center;
`
export const TextButtonContainer = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.colors.slate["100"]};
  font-family: ${(props) => props.theme.fonts.mono.bold};
`
