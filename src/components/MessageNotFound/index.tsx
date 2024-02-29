import { TextProps } from "react-native"

import { NotFoundPlayersContainer } from "./styles"

interface MessageNotFoundProps extends TextProps {}

export function MessageNotFound({ ...rest }: MessageNotFoundProps) {
  return <NotFoundPlayersContainer {...rest} />
}
