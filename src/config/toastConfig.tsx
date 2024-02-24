import { ToastConfig, InfoToast } from "react-native-toast-message"

import { defaultTheme } from "@/theme/default"

import { Toast } from "@/components/Toast"

const { colors } = defaultTheme

export const toastConfig: ToastConfig = {
  info: (props) => (
    <Toast {...props} />
    // <InfoToast
    //   {...props}
    //   style={{
    //     height: "auto",
    //   }}
    //   contentContainerStyle={{
    //     backgroundColor: colors.gray[700],
    //     paddingVertical: 12,
    //   }}
    //   text2Props={{
    //     numberOfLines: undefined,
    //   }}
    //   text1Style={{
    //     color: colors.slate[200],
    //     fontSize: 18,
    //     overflow: "visible",
    //   }}
    //   text2Style={{
    //     fontSize: 16,
    //   }}
    // />
  ),
}
