import styled from "styled-components/native"

export const MessageNotFoundContainer = styled.View`
  gap: 24px;
  align-items: center;

  padding: 0 24px;
`

export const Message = styled.Text`
  color: ${(props) => props.theme.colors.slate["500"]};
  font-family: ${(props) => props.theme.fonts.orbi.semiBold};
  font-size: 32px;
  text-align: center;
`
