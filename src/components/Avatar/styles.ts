import { ViewProps } from "react-native"
import styled, { css } from "styled-components/native"

export interface ContainerAvatarProps extends ViewProps {
  // isWinner?: boolean
  isListPlayer?: boolean
}

export const ContainerAvatar = styled.View<ContainerAvatarProps>`
  width: 80px;
  height: 80px;
  overflow: hidden;
  border-radius: 50px;

  border: 2px solid transparent;

  ${(props) =>
    props.isListPlayer &&
    css`
      border-color: ${props.theme.colors.slate[400]};
    `}
`
