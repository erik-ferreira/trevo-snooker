import { useTheme } from "styled-components/native"
import { icons, LucideProps } from "lucide-react-native"

export type NameIconProps = keyof typeof icons

interface IconProps extends LucideProps {
  name?: NameIconProps
}

export function Icon({ name = "Home", size, color, ...rest }: IconProps) {
  const theme = useTheme()

  const LucideIcon = icons[name]

  return (
    <LucideIcon
      size={size || 24}
      color={color || theme.colors.blue[500]}
      {...rest}
    />
  )
}
