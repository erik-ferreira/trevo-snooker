import "styled-components/native"
import { defaultTheme } from "../theme/default"

declare module "styled-components/native" {
  type ThemeProps = typeof defaultTheme
  export interface DefaultTheme extends ThemeProps {}
}
