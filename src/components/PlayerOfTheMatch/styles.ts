import styled from "styled-components/native"

export interface TouchableOpacityContainerProps {
  variant?: "player-one" | "player-two"
}

export interface ContentImagePlayerProps {
  isWinner?: boolean
}

export const TouchableOpacityContainer = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7,
}))<TouchableOpacityContainerProps>`
  flex-direction: ${(props) =>
    props.variant === "player-one" ? "row" : "row-reverse"};
  align-items: center;
  justify-content: center;
  gap: 8px;
`

export const ContentImagePlayer = styled.View<ContentImagePlayerProps>`
  overflow: hidden;
  border-radius: 40px;
  border: 2px solid
    ${(props) =>
      props.isWinner ? props.theme.colors.emerald[500] : "transparent"};
`
