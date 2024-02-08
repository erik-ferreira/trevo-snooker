import styled from "styled-components/native"

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.page};
`

export const Label = styled.Text`
  color: red;
  font-family: ${(props) => props.theme.fonts.orbi.normal};
  font-size: 24px;
`
