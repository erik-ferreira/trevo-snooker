import { useTheme } from "styled-components/native"
import { icons, LucideProps } from "lucide-react-native"

interface IconProps extends LucideProps {
  name?: keyof typeof icons
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
