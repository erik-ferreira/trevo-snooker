import styled from "styled-components/native"

export interface TouchableOpacityContainerProps {
  variant?: "player-one" | "player-two"
}

export interface ContentImagePlayerProps {
  isWinner?: boolean
}

export const TouchableOpacityContainer = styled.TouchableOpacity<TouchableOpacityContainerProps>`
  flex-direction: ${(props) =>
    props.variant === "player-one" ? "row" : "row-reverse"};
  align-items: center;
  justify-content: center;
  gap: 16px;
`

export const ContentImagePlayer = styled.View<ContentImagePlayerProps>`
  overflow: hidden;
  border-radius: 40px;
  border: 2px solid
    ${(props) =>
      props.isWinner ? props.theme.colors.emerald[500] : "transparent"};
`

export const Box = styled.View`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${(props) => props.theme.colors.section};

  align-items: center;
  justify-content: center;
`
