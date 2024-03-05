import styled from "styled-components/native"

export const ContainerOption = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7,
}))`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`

export const OptionLabel = styled.Text`
  font-size: 18px;
  font-family: ${(props) => props.theme.fonts.orbi.semiBold};
  color: ${(props) => props.theme.colors.slate[500]};
`
