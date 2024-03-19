import { type CSSObject } from '@emotion/react';
import { type HTMLProps } from 'react';
import { type ControllerFieldState, type ControllerRenderProps } from 'react-hook-form';

import { type BaseThemeState, type StyleDefinition, type ValueOrFunction } from '@scripts/gds';

import { type CounterSize, type CounterVariant } from './enums';
import { type counterThemes } from './themes';

/**
 * Состояния счетчика
 */
export interface ICounterState {
    /**
     * Заблокированное состояние
     */
    disabled?: boolean;

    /**
     * Cостояние только для чтения
     */
    readOnly?: boolean;

    /**
     * С ошибкой
     */
    hasError?: boolean;
}

/**
 * Состояния переключателя
 */
export type CounterThemeState = BaseThemeState<typeof CounterVariant, typeof CounterSize, never> & ICounterState;

enum CounterParts {
    wrapper,
    btnWrapper,
    label,
    button,
    input,
    error,
}

/**
 * Темы переключателя
 */
export type CounterTheme = ValueOrFunction<
    Record<keyof typeof CounterParts, StyleDefinition<CounterThemeState>>,
    [CounterThemeState]
>;

/**
 * Пропсы переключателя
 */
export interface ICounterProps
    extends Omit<BaseThemeState<typeof CounterVariant, typeof CounterSize, CounterTheme>, 'theme'>,
        Omit<HTMLProps<HTMLInputElement>, 'size' | 'onChange'> {
    /** Input unique name. Used for name and id properties */
    name?: string;

    /** Initial input value */
    initialValue?: number;

    /** Input value */
    value?: number;

    /** Label text */
    // label: string;

    /** Minimum value */
    min?: number;

    /** Maximum value */
    max?: number;

    /** Step value */
    step?: number;

    /** Handler change event on input */
    onChange?: (value: number) => void;

    /** Visually hidden legend */
    isHiddenLegend?: boolean;

    /** Required field */
    required?: boolean;

    /** Hint text */
    hint?: string;

    /** Параметры RHF */
    field?: ControllerRenderProps;
    fieldState?: ControllerFieldState;

    isLegend?: boolean;

    theme?: CounterTheme | keyof typeof counterThemes;

    wrapperStyles?: CSSObject;
}
