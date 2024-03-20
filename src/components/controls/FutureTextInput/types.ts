import { type BaseThemeState, StyleDefinition, ValueOrFunction } from '@greensight/gds';
import { ValueOf } from 'next/constants';
import { HTMLProps } from 'react';

export enum InputSize {
    md = 'md',
}

export enum InputVariant {
    primary = 'primary',
}

export interface InputState {
    disabled?: boolean;
    hasError?: boolean;
    placeholder?: boolean;
    errorMessage?: string;
}

export type InputThemeState = BaseThemeState<typeof InputVariant, typeof InputSize, never> & InputState;

enum InputParts {
    label,
    input,
    errorMessage
}

export type InputTheme = ValueOrFunction<Record<keyof typeof InputParts, StyleDefinition<InputThemeState>>>

export interface InputProps extends Omit<BaseThemeState<typeof InputVariant, typeof InputSize, InputTheme>, 'theme'>,
    Omit<HTMLProps<HTMLInputElement>, 'size' | 'onChange'> {

}
