import { SupportedColors, SupportedSizes, SupportedWeights } from '@/constants';
import { Typography } from '@mui/material';
import { styled } from 'styled-components';

interface TextStyledProps {
  _size: `${SupportedSizes}`;
  _weight: `${SupportedWeights}`;
  _color: `${SupportedColors}`;
}

export const TextStyled = styled(Typography)<TextStyledProps>`
  &.text {
    color: ${({ theme, _color }) => theme.palette[_color].main};
    font-size: ${({ theme, _size }) => theme.fontSize[_size]};
    line-height: ${({ theme, _size }) => theme.lineHeight[_size]};
    font-weight: ${({ theme, _weight }) => theme.fontWeight[_weight]};
  }
`;
