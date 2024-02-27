import styled from "styled-components/native"

export interface PlayerOfTheMatchContainerProps {
  variant?: "playerOne" | "playerTwo"
}

export interface ContentImagePlayerProps {
  isWinner?: boolean
}

export const PlayerOfTheMatchContainer = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7,
}))<PlayerOfTheMatchContainerProps>`
  flex-direction: ${(props) =>
    props.variant === "playerOne" ? "row" : "row-reverse"};
  align-items: center;
  justify-content: center;
  gap: 8px;
`
