import { ComponentsTheme, scale } from '@greensight/gds';

import tokens from '../../../public/tokens.json';

const { colors } = tokens;

export const Button: ComponentsTheme['Button'] = {
    base: {
        default: {
            borderRadius: 4,
            half: false,
        },
    },
    sizes: {
        md: {
            height: scale(5),
            padding: scale(4),
            typography: 'xs',
        },
    },
    themes: {
        primary: {
            default: {
                bg: colors.blue,
                color: colors.white,
            },
            hover: {
                bg: colors.blueHover,
            },
            disabled: {
                bg: colors.grey200,
                color: colors.grey800,
            },
        },
        secondary: {
            default: {
                bg: colors.grey900,
                color: colors.white,
            },
            hover: {
                bg: colors.black,
            },
            disabled: {
                bg: colors.grey200,
                color: colors.grey800,
            },
        },
    },
};
