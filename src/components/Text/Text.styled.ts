import { SupportedColors, SupportedSizes, SupportedWeights } from '@/constants';
import { Typography } from '@mui/material';
import { styled } from 'styled-components';

interface TextStyledProps {
  $size: `${SupportedSizes}`;
  $weight: `${SupportedWeights}`;
  $color: `${SupportedColors}`;
}

export const TextStyled = styled(Typography)<TextStyledProps>`
  &.text {
    color: ${({ theme, $color }) => theme.palette[$color].main};
    font-size: ${({ theme, $size }) => theme.fontSize[$size]};
    line-height: ${({ theme, $size }) => theme.lineHeight[$size]};
    font-weight: ${({ theme, $weight }) => theme.fontWeight[$weight]};
  }
`;
