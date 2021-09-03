import styled from 'styled-components';
import { COLORS } from '../consts';

export const Title = styled.h1`${({ primary }) => `
font-family: 'Inter', sans-serif;
font-style: normal;
font-weight: 900;
color: ${primary ? COLORS.primary : COLORS.secondary };
margin: 0;
margin-bottom: 0.5rem;
font-size: 86px;
line-height: 1em;
letter-spacing: -4px;
`}`;

export const Subtitle = styled.h2`${({ primary }) => `
font-family: 'Inter', sans-serif;
font-style: normal;
font-weight: 200;
color: ${primary ? COLORS.primary : COLORS.secondary };
font-size: 62px;
line-height: 62px;
letter-spacing: -2px;
margin-top: 0;
margin-bottom: 3rem;
`}`;