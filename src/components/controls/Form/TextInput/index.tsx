import { CSSObject } from '@emotion/core';
import deepmerge from 'deepmerge';
import { forwardRef, useMemo } from 'react';
import { upperFirst } from 'tiny-case';

import { textInputThemes } from '@controls/Form/TextInput/themes';

import { useThemeCSSPart } from '@scripts/gds';

import { InputProps, InputStateFull } from './types';

export const TextInput = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            theme: themeName = 'primary',
            size = 'md',
            variant = 'primary',
            disabled,
            label,
            error,
            wrapperStyles,
            ...props
        },
        ref
    ) => {
        const theme = typeof themeName === 'string' ? textInputThemes[themeName] : themeName;

        const state = useMemo<Omit<InputStateFull, 'theme'>>(
            () => ({
                size,
                variant,
                isError: error?.message ? error.message?.length > 0 : false,
            }),
            [size, variant, error]
        );

        const getCSS = useThemeCSSPart(theme, state);

        const labelCSS = useMemo(() => deepmerge.all<CSSObject>([getCSS('label')]), [getCSS]);
        const inputCSS = useMemo(() => deepmerge.all<CSSObject>([getCSS('input')]), [getCSS]);
        const errorCSS = useMemo(() => deepmerge.all<CSSObject>([getCSS('errorMessage')]), [getCSS]);

        return (
            <label css={{ ...labelCSS, ...wrapperStyles }}>
                {upperFirst(label)}
                <input ref={ref} {...props} css={{ ...inputCSS }} />
                <span css={{ ...errorCSS }}>{error?.message}</span>
            </label>
        );
    }
);
