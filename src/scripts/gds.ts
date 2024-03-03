import { CSSObject } from '@emotion/core';
import {
    ComponentsTheme,
    Theme,
    createMediaQueries,
    createTheme,
    typography as gdsTypography,
    useTheme as useGDSTheme,
} from '@greensight/gds';

import { Select, SelectTheme } from '@scripts/themes/select';

import tokens from '../../public/tokens.json';
import { Button } from './themes/button';
import { global } from './themes/global';

export const { colors, shadows } = tokens;
export type ColorsTheme = typeof colors;
export type TypographyParam = keyof typeof tokens.typography.styles;

export const MEDIA_QUERIES = createMediaQueries(tokens.layout.breakpoints);

interface ComponentsThemeExtended extends ComponentsTheme {
    Select?: SelectTheme;
}

export interface ExtendedTheme extends Omit<Theme, 'colors'> {
    components?: ComponentsThemeExtended;
    colors?: ColorsTheme;
    Select?: SelectTheme;
}

const settings: ExtendedTheme = {
    global,
    components: {
        Button,
        Select,
    },
};

const theme = createTheme({
    tokens,
    settings,
}) as ExtendedTheme;

const typography = (name: TypographyParam = 'sMedium') => gdsTypography(name, theme) as CSSObject;
const useTheme = () => useGDSTheme() as ExtendedTheme;

export * from '@greensight/gds';
export { typography, theme, useTheme };
