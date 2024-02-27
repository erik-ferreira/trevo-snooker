import { Image, ImageSourcePropType } from "react-native"

import antonio from "@/assets/antonio.png"
import breno from "@/assets/breno.png"
import david from "@/assets/david.png"
import erik from "@/assets/erik.png"

import { ContainerAvatar, ContainerAvatarProps } from "./styles"

interface AvatarProps extends ContainerAvatarProps {
  slugAvatar?: string
}

type SourceName = "antonio" | "breno" | "david" | "erik"

const sourcesAvatar: Record<SourceName, ImageSourcePropType> = {
  antonio: antonio,
  breno: breno,
  david: david,
  erik: erik,
}

export function Avatar({ slugAvatar, ...rest }: AvatarProps) {
  const source = sourcesAvatar[slugAvatar as SourceName]

  return (
    <ContainerAvatar {...rest}>
      <Image source={source} width={80} height={80} />
    </ContainerAvatar>
  )
}
