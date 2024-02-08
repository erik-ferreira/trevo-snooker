import styled from "styled-components/native"

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
`

export const Label = styled.Text`
  color: red;
  font-family: ${(props) => props.theme.fonts.orbi.normal};
  font-size: 24px;
`
export const Label2 = styled.Text`
  color: red;
  font-family: ${(props) => props.theme.fonts.raj.normal};
  font-size: 24px;
`
export const Label3 = styled.Text`
  color: ${(props) => props.theme.colors.blue[500]};
  font-family: ${(props) => props.theme.fonts.mono.normal};
  font-size: 24px;
`
