import styled from "styled-components/native"

export interface TouchableOpacityContainerProps {
  variant?: "player-one" | "player-two"
}

export const TouchableOpacityContainer = styled.TouchableOpacity<TouchableOpacityContainerProps>`
  flex-direction: ${(props) =>
    props.variant === "player-one" ? "row" : "row-reverse"};
  align-items: center;
  justify-content: center;
  gap: 16px;
`

export const ImagePlayer = styled.Image`
  border-radius: 40px;
`

export const Box = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${(props) => props.theme.colors.section};
`
