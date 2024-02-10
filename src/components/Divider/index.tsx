import { ViewProps } from "react-native"

import { ContainerDivider } from "./styles"

interface DividerProps extends ViewProps {}

export function Divider({ ...rest }: DividerProps) {
  return <ContainerDivider {...rest} />
}
