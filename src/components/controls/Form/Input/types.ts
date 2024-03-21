import { CSSObject } from '@emotion/core';
import { BaseThemeState, StyleDefinition, ValueOrFunction } from '@greensight/gds';
import { ChangeEvent, ComponentPropsWithoutRef, ComponentPropsWithRef, HTMLProps } from 'react';

import { textInputThemes } from '@controls/Form/Input/themes';

export interface TextInputState {
    disabled?: boolean;
    isError?: boolean;
}

export enum InputSizes {
    md = 'md',
}

export enum InputVariants {
    primary = 'primary',
}

export type InputStateFull = BaseThemeState<typeof InputVariants, typeof InputSizes, never> & TextInputState;

enum TextInputParts {
    label,
    input,
    errorMessage,
}

export type TextInputTheme = ValueOrFunction<
    Record<keyof typeof TextInputParts, StyleDefinition<InputStateFull>>,
    [InputStateFull]
>;

export interface InputProps
    extends Omit<BaseThemeState<typeof InputVariants, typeof InputSizes, TextInputTheme>, 'theme'>,
        Omit<ComponentPropsWithoutRef<'input'>, 'onChange' | 'size'> {
    name: string;
    label: string;
    errorMessage: string;
    placeholder: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement> ) => void;
    onBlur: () => void;

    disabled?: boolean;
    isError?: boolean;

    theme?: TextInputTheme | keyof typeof textInputThemes;

    wrapperStyles?: CSSObject;
}
