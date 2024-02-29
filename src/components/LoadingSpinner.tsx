import { ActivityIndicator, ActivityIndicatorProps } from "react-native"

import { defaultTheme } from "@/theme/default"

const loadingVariants = {
  primary: {
    color: defaultTheme.colors.blue[500],
    size: "large",
  },
  secondary: {
    color: defaultTheme.colors.slate[100],
    size: "small",
  },
} as const

interface LoadingSpinnerProps extends ActivityIndicatorProps {
  variant?: keyof typeof loadingVariants
}

export function LoadingSpinner({
  variant = "primary",
  ...rest
}: LoadingSpinnerProps) {
  const color = loadingVariants[variant].color
  const size = loadingVariants[variant].size

  return <ActivityIndicator size={size} color={color} {...rest} />
}
