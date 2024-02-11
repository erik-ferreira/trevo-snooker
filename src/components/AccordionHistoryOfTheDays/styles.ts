import styled, { css } from "styled-components/native"

interface HeaderSectionProps {
  isFirstSection?: boolean
  isLastSection?: boolean
}

export const HeaderSection = styled.TouchableOpacity<HeaderSectionProps>`
  width: 100%;
  padding: 8px 16px;
  background-color: ${(props) => props.theme.colors.gray[800]};

  ${(props) =>
    props.isFirstSection &&
    css`
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    `}

  ${(props) =>
    props.isLastSection &&
    css`
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    `}
`

export const SectionDateTitle = styled.Text`
  color: ${(props) => props.theme.colors.slate[400]};
  font-size: 24px;
  font-family: ${(props) => props.theme.fonts.orbi.normal};
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
