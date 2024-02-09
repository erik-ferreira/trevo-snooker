import { useTheme } from "styled-components/native"
import { TouchableOpacityProps, Image } from "react-native"

import { Icon } from "@/components/Icon"

import player from "@/assets/player.png"

import {
  Box,
  ContentImagePlayer,
  ContentImagePlayerProps,
  TouchableOpacityContainer,
  TouchableOpacityContainerProps,
} from "./styles"

type PlayerOfTheMatchProps = TouchableOpacityProps &
  TouchableOpacityContainerProps &
  ContentImagePlayerProps & {}

export function PlayerOfTheMatch({
  variant = "player-one",
  isWinner = false,
  ...rest
}: PlayerOfTheMatchProps) {
  const { colors } = useTheme()

  return (
    <TouchableOpacityContainer activeOpacity={0.7} variant={variant} {...rest}>
      <ContentImagePlayer isWinner={isWinner}>
        <Image source={player} width={80} height={80} />
      </ContentImagePlayer>

      <Box>
        <Icon name="Check" color={colors.emerald[500]} />
      </Box>
    </TouchableOpacityContainer>
  )
}
