import styled from "styled-components/native"

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
`

export const Label = styled.Text`
  color: red;
  font-family: ${(props) => props.theme.fonts.orbi.normal};
`
