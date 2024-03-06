import { scale } from '@greensight/gds';

import { TypographyParam } from '@scripts/gds';

import tokens from '../../../public/tokens.json';

const { colors, shadows } = tokens;

export interface SelectTheme {
    padding: string;
    height: string | number;
    bg: string;
    color: string;
    borderRadius: number;
    borderColor: string;
    focusBorderColor: string;
    typography: TypographyParam;

    placeholderColor: string;

    menuColor: string;
    menuShadow: string;
    menuBorderRadius: string;

    optionPadding: string;
    optionHeight: string | number;
    optionHighlightedBg: string;
    optionHighlightedColor: string;
}

export const Select: SelectTheme = {
    padding: `${scale(1, true)}px ${scale(3, true)}px`,
    height: scale(5),
    bg: colors.white,
    color: colors.black,
    borderRadius: scale(1, true),
    borderColor: colors.grey400,
    focusBorderColor: colors.blue,
    typography: 's',

    placeholderColor: colors.grey600,

    menuColor: colors.white,
    menuShadow: shadows.box,
    menuBorderRadius: `${scale(1, true)}px`,

    optionPadding: `${scale(1, true)}px ${scale(3, true)}px`,
    optionHeight: scale(5),
    optionHighlightedBg: colors.blue,
    optionHighlightedColor: colors.white,
};
