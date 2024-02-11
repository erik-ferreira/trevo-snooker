import styled from "styled-components/native"

export const Container = styled.SafeAreaView`
  flex: 1;
  gap: 36px;

  padding: 40px 32px 0;
  background-color: ${(props) => props.theme.colors.page};
`

export const DateOfAMatch = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7,
}))`
  width: 100%;
  padding: 8px 16px;
  background-color: ${(props) => props.theme.colors.gray[800]};
`

export const DateOfAMatchTitle = styled.Text`
  color: ${(props) => props.theme.colors.slate[400]};
  font-size: 24px;
  font-family: ${(props) => props.theme.fonts.orbi.normal};
`
