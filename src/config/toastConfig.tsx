import { ToastConfig } from "react-native-toast-message"

import { defaultTheme } from "@/theme/default"

import { Toast } from "@/components/Toast"

const { colors } = defaultTheme

export const toastConfig: ToastConfig = {
  info: (props) => <Toast {...props} />,
  success: (props) => <Toast {...props} />,
  warning: (props) => <Toast {...props} />,
  error: (props) => <Toast {...props} />,
}
