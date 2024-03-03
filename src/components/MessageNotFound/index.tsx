import { ReactNode } from "react"
import { ViewProps } from "react-native"

import { Button } from "@/components/Button"

import { MessageNotFoundContainer, Message } from "./styles"

interface MessageNotFoundProps extends ViewProps {
  // children: ReactNode
  message: string
}

export function MessageNotFound({ message, ...rest }: MessageNotFoundProps) {
  return (
    <MessageNotFoundContainer {...rest}>
      <Message>{message}</Message>
      <Button variant="secondary" label="Tentar novamente" />
    </MessageNotFoundContainer>
  )
}
