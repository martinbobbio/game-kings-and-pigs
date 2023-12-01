import { BREAKPOINTS } from '@/constants';
import { styled } from 'styled-components';

export const ControlsStyled = styled.div`
  z-index: 2;
  position: absolute;
  height: 200px;
  width: 100%;
  bottom: 0;
  display: none;
  .test {
  }
  @media (max-width: ${BREAKPOINTS.large}) and (max-height: ${BREAKPOINTS.small}) {
    display: initial;
  }
`;

export const ButtonControl = styled.div`
  position: absolute;
  width: 72px;
  height: 72px;
  border-radius: 100%;
  background: ${({ theme }) => theme.palette.elements.header.main};
  svg {
    margin-top: 20px;
  }
  &.attack {
    right: 16px;
    bottom: 96px;
  }
  &.jump {
    right: 96px;
    bottom: 8px;
  }
`;

export const JoystickContainer = styled.div`
  position: absolute;
  bottom: 24px;
  left: 56px;
  & div {
    background: ${({ theme }) => theme.palette.elements.header.main} !important;
  }
  & button {
    background: ${({ theme }) => theme.palette.white.main} !important;
  }
`;
