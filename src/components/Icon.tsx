import { icons, LucideProps } from "lucide-react-native"

interface IconProps extends LucideProps {
  name: keyof typeof icons
}

export function Icon({ name, ...rest }: IconProps) {
  const LucideIcon = icons[name]

  return <LucideIcon />
}
