import { type CSSObject } from '@emotion/react';
import deepmerge from 'deepmerge';

import { scale } from '@scripts/gds';
import { type OptionizedCSS, colors, extractCSSOption, typography } from '@scripts/gds';

import { type CounterSize, type CounterVariant } from '../enums';
import { type CounterTheme } from '../types';

export const basicTheme: CounterTheme = {
    wrapper: ({ size, variant }) => {
        const sizes: OptionizedCSS<typeof CounterSize> = {
            md: {
                padding: scale(1),
                height: scale(10, true),
            },
        };

        const variants: OptionizedCSS<typeof CounterVariant> = {
            primary: {
                backgroundColor: colors.grey100,
            },
            secondary: {
                backgroundColor: colors.grey200,
            },
        };

        return {
            ...deepmerge.all<CSSObject>([
                {
                    display: 'flex',
                    alignItems: 'center',
                },
                extractCSSOption(sizes, size),
                extractCSSOption(variants, variant),
            ]),
        };
    },

    btnWrapper: ({ size, variant }) => {
        const sizes: OptionizedCSS<typeof CounterSize> = {
            md: {},
        };

        const variants: OptionizedCSS<typeof CounterVariant> = {
            primary: {},
            secondary: {},
        };

        return {
            ...deepmerge.all<CSSObject>([
                {
                    display: 'flex',
                },
                extractCSSOption(sizes, size),
                extractCSSOption(variants, variant),
            ]),
        };
    },

    input: ({ size, variant }) => {
        const sizes: OptionizedCSS<typeof CounterSize> = {
            md: {
                ...typography('h4'),
                padding: `0 ${scale(1)}`,
            },
        };

        const variants: OptionizedCSS<typeof CounterVariant> = {
            primary: {},
            secondary: {},
        };

        return {
            ...deepmerge.all<CSSObject>([
                {
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    textAlign: 'center',
                    backgroundColor: 'transparent',
                    'input&': { appearance: 'none', MozAppearance: 'textfield' },
                },
                extractCSSOption(sizes, size),
                extractCSSOption(variants, variant),
            ]),
        };
    },

    label: ({ size, variant }) => {
        const sizes: OptionizedCSS<typeof CounterSize> = {
            md: {
                ...typography('m'),
                paddingLeft: scale(4),
            },
        };

        const variants: OptionizedCSS<typeof CounterVariant> = {
            primary: {},
            secondary: {},
        };

        return {
            ...deepmerge.all<CSSObject>([{}, extractCSSOption(sizes, size), extractCSSOption(variants, variant)]),
        };
    },

    button: ({ size, variant }) => {
        const sizes: OptionizedCSS<typeof CounterSize> = {
            md: {
                width: scale(3),
                height: scale(3),
            },
        };

        const variants: OptionizedCSS<typeof CounterVariant> = {
            primary: {
                fill: colors.grey400,
                ':disabled': { fill: colors.grey100 },
            },
            secondary: {
                fill: colors.black,
                ':disabled': { fill: colors.grey100 },
            },
        };

        return {
            ...deepmerge.all<CSSObject>([
                {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                extractCSSOption(sizes, size),
                extractCSSOption(variants, variant),
            ]),
        };
    },

    error: ({ size, variant }) => {
        const sizes: OptionizedCSS<typeof CounterSize> = {
            md: {
                ...typography('l'),
                marginTop: scale(1),
            },
        };

        const variants: OptionizedCSS<typeof CounterVariant> = {
            primary: {
                color: colors?.blue,
            },
            secondary: {
                color: colors?.blue,
            },
        };

        return {
            ...extractCSSOption(sizes, size),
            ...extractCSSOption(variants, variant),
        };
    },
};
