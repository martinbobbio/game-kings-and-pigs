import { styled } from 'styled-components';
import { BREAKPOINTS } from './constants';

export const AppStyled = styled.main`
  background: ${({ theme }) => theme.palette.default.background1};
  font-family: 'Skranji', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh);
  p {
    font-family: 'Skranji', sans-serif;
  }

  @media (max-width: ${BREAKPOINTS.small}) {
    padding: 0;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
`;
