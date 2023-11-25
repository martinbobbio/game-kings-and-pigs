import { BREAKPOINTS } from '@/constants';
import { styled } from 'styled-components';

export const ControlsStyled = styled.div`
  z-index: 2;
  position: absolute;
  height: 200px;
  width: 100%;
  bottom: 0;
  display: none;
  @media (max-width: ${BREAKPOINTS.large}) and (max-height: ${BREAKPOINTS.small}) {
    display: initial;
  }
`;

export const ButtonControl = styled.div`
  position: absolute;
  padding: 16px;
  border-radius: 50%;
  background: ${({ theme }) => theme.palette.elements.header.main};
  &.left {
    bottom: 0px;
    left: 0px;
  }
  &.right {
    bottom: 0px;
    right: 0px;
  }
  &.down-right {
    bottom: 78px;
    right: 0;
  }
  &.down-left {
    bottom: 78px;
    left: 0;
  }
`;
