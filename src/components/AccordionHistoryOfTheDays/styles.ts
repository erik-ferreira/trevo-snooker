import styled from "styled-components/native"

export const HeaderSection = styled.View`
  width: 100%;
  padding: 8px 16px;
  background-color: ${(props) => props.theme.colors.gray[800]};
`

export const SectionDateTitle = styled.Text`
  color: ${(props) => props.theme.colors.slate[400]};
  font-size: 24px;
  font-family: ${(props) => props.theme.fonts.orbi.normal};
`

export const ContentSection = styled.View`
  padding: 8px;
  background-color: ${(props) => props.theme.colors.gray[800]};
`
