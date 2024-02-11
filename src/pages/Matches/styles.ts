import styled from "styled-components/native"

export const Container = styled.SafeAreaView`
  flex: 1;
  gap: 36px;

  padding: 40px 32px 0;
  background-color: ${(props) => props.theme.colors.page};
`

export const ContentSection = styled.View`
  padding: 8px;
  background-color: ${(props) => props.theme.colors.gray[800]};

  align-items: center;
`

export const MatchNumber = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.colors.slate[200]};
  font-family: ${(props) => props.theme.fonts.orbi.semiBold};
  margin-bottom: 8px;
`

export const ContentMatch = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 24px;
`

export const ContentOptionsByMatch = styled.View`
  gap: 4px;
`
