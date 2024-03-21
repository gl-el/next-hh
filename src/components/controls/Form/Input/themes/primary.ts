import { type CSSObject } from '@emotion/react';
import deepmerge from 'deepmerge';

import { type TextInputTheme } from '@controls/Form/Input/types';

import { scale } from '@scripts/gds';
import { type OptionizedCSS, colors, extractCSSOption, typography } from '@scripts/gds';

import { type InputSizes, type InputVariants } from '../types';

export const primaryTheme: TextInputTheme = {
    label: ({ size, variant }) => {
        const sizes: OptionizedCSS<typeof InputSizes> = {
            md: {
                ...typography('xsMedium'),
            },
        };

        const variants: OptionizedCSS<typeof InputVariants> = {
            primary: {
                color: colors.black,
            },
        };

        return {
            ...deepmerge.all<CSSObject>([
                {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: scale(1, true),
                },
                extractCSSOption(sizes, size),
                extractCSSOption(variants, variant),
            ]),
        };
    },

    input: ({ size, variant }) => {
        const sizes: OptionizedCSS<typeof InputSizes> = {
            md: {
                ...typography('s'),
                padding: `${scale(1, true)}px ${scale(3, true)}px`,
                height: scale(5),
                borderRadius: scale(1, true),
            },
        };

        const variants: OptionizedCSS<typeof InputVariants> = {
            primary: {
                color: colors.black,
                border: `1px solid ${colors.grey400}`,

                '&::placeholder': {
                    color: colors.grey600,
                },

                '&:focus': {
                    borderColor: colors.blue,
                },
            },
        };

        return {
            ...extractCSSOption(sizes, size),
            ...extractCSSOption(variants, variant),
        };
    },
    errorMessage: ({ size, variant }) => {
        const sizes: OptionizedCSS<typeof InputSizes> = {
            md: {
                ...typography('xsMedium'),
            },
        };

        const variants: OptionizedCSS<typeof InputVariants> = {
            primary: {
                color: colors.blue,
            },
        };

        return {
            ...extractCSSOption(sizes, size),
            ...extractCSSOption(variants, variant),
        };
    },
};
