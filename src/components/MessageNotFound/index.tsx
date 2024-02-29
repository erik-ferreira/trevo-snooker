import { ReactNode } from "react"
import { TextProps } from "react-native"

import { NotFoundPlayersContainer } from "./styles"

interface MessageNotFoundProps extends TextProps {
  children: ReactNode
}

export function MessageNotFound({ children, ...rest }: MessageNotFoundProps) {
  return (
    <NotFoundPlayersContainer {...rest}>{children}</NotFoundPlayersContainer>
  )
}
