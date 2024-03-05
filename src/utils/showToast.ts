import Toast from "react-native-toast-message"

function success(message: string) {
  Toast.show({
    type: "success",
    text1: message,
    visibilityTime: 2000,
  })
}

function info(message: string) {
  Toast.show({
    type: "info",
    text1: message,
    visibilityTime: 2000,
  })
}

function warning(message: string) {
  Toast.show({
    type: "warning",
    text1: message,
    visibilityTime: 2000,
  })
}

function error(message: string) {
  Toast.show({
    type: "error",
    text1: message,
    visibilityTime: 2000,
  })
}

export const showToast = {
  success,
  info,
  warning,
  error,
}
