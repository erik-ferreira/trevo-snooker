import styled from "styled-components/native"

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.page};

  padding: 0 32px;
`

export const DateToday = styled.Text`
  color: ${(props) => props.theme.colors.blue["800"]};
  font-family: ${(props) => props.theme.fonts.orbi.semiBold};
  font-size: 40px;
`

export const ContentMatchesList = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 24px;
`
