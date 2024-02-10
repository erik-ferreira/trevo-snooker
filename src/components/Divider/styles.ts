import styled from "styled-components/native"

export const ContainerDivider = styled.View`
  height: 0.5px;
  width: 100%;
  background-color: ${(props) => props.theme.colors.slate[400]};
  margin: 8px 0;
`
