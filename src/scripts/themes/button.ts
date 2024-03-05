import { ComponentsTheme, scale } from '@greensight/gds';
import { rgba } from 'emotion-rgba';

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
        link: {
            padding: 0,
            iconOffset: 4,
            typography: 'm',
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
        link: {
            default: {
                bg: 'transparent',
                color: colors.blue,
                css: {
                    padding: 0,
                    borderRadius: 0,
                    borderBottom: '1px solid transparent',
                },
            },
            hover: {
                css: {
                    borderBottom: `1px solid ${rgba(colors.blue, 0.2)}`,
                },
            },
            disabled: {
                color: colors.grey800,
            },
        },
    },
};
