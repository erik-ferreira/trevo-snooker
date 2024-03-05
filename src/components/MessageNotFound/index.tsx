import { ViewProps } from "react-native"

import { Button } from "@/components/Button"

import { MessageNotFoundContainer, Message } from "./styles"

interface MessageNotFoundProps extends ViewProps {
  message: string
  onTryAgain?: () => void
}

export function MessageNotFound({
  message,
  onTryAgain,
  ...rest
}: MessageNotFoundProps) {
  return (
    <MessageNotFoundContainer {...rest}>
      <Message>{message}</Message>
      <Button
        variant="secondary"
        label="Tentar novamente"
        onPress={onTryAgain}
      />
    </MessageNotFoundContainer>
  )
}
