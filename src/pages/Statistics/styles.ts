import styled from "styled-components/native"

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.page};

  padding: 0 24px;
`

export const ContentTitle = styled.SafeAreaView`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.slate[400]};
  font-family: ${(props) => props.theme.fonts.orbi.semiBold};
  font-size: 18px;
`

interface ButtonPreviewModeProps {
  isSelected?: boolean
}

export const ButtonPreviewMode = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7,
}))<ButtonPreviewModeProps>`
  width: 32px;
  height: 32px;

  border-radius: 4px;
  border: 1px solid
    ${(props) =>
      !props.isSelected ? props.theme.colors.slate[400] : "transparent"};
  background-color: ${(props) =>
    props.isSelected ? props.theme.colors.blue[800] : "transparent"};

  align-items: center;
  justify-content: center;

  transition: background-color 2s linear;
`
