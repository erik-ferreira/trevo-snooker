import Toast, { ToastConfig, InfoToast } from "react-native-toast-message"

import { defaultTheme } from "@/theme/default"

const { colors } = defaultTheme

export const toastConfig: ToastConfig = {
  info: (props) => (
    <InfoToast
      {...props}
      style={{
        height: "auto",
      }}
      contentContainerStyle={{
        backgroundColor: colors.gray[700],
        paddingVertical: 12,
      }}
      text2Props={{
        numberOfLines: undefined,
      }}
      text1Style={{
        color: colors.slate[200],
        fontSize: 18,
        overflow: "visible",
      }}
      text2Style={{
        fontSize: 16,
      }}
    />
  ),
}
