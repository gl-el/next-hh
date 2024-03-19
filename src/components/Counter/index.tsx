import { type CSSObject } from '@emotion/react';
import deepmerge from 'deepmerge';
import { type ChangeEvent, type FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useThemeCSSPart } from '@scripts/gds';

import MinusIcon from '@icons/chevronDown.svg';
import PlusIcon from '@icons/chevronUp.svg';

import { counterThemes } from './themes';
import { type CounterThemeState, type ICounterProps } from './types';

/**
 * Компонент счетчика
 */
const Counter: FC<ICounterProps> = ({
    theme: themeName = 'basic',
    size = 'md',
    variant = 'primary',

    name,
    initialValue = 1,
    value,
    step = 1,
    min = 1,
    max = 999,

    field,
    fieldState,

    disabled,

    onChange,
    wrapperStyles,
    ...props
}) => {
    let inputId = null;

    if (props.id) inputId = props.id;
    else inputId = value ? `${name || field?.name}-${value}` : `${name || field?.name}`;

    const ref = useRef<HTMLInputElement>(null);

    const theme = typeof themeName === 'string' ? counterThemes[themeName] : themeName;

    const state = useMemo<Omit<CounterThemeState, 'theme'>>(
        () => ({
            size,
            variant,
            hasError: !!fieldState?.error?.message,
        }),
        [size, variant, fieldState?.error?.message]
    );

    const getCSS = useThemeCSSPart(theme, state);

    const wrapperCSS = useMemo(() => deepmerge.all<CSSObject>([getCSS('wrapper')]), [getCSS]);
    const inputCSS = useMemo(() => deepmerge.all<CSSObject>([getCSS('input')]), [getCSS]);
    const buttonCSS = useMemo(() => deepmerge.all<CSSObject>([getCSS('button')]), [getCSS]);
    const btnWrapperCSS = useMemo(() => deepmerge.all<CSSObject>([getCSS('btnWrapper')]), [getCSS]);
    const labelCSS = useMemo(() => deepmerge.all<CSSObject>([getCSS('label')]), [getCSS]);
    const errorCSS = useMemo(() => deepmerge.all<CSSObject>([getCSS('error')]), [getCSS]);

    const controlled = !!field || !!onChange;
    const controlledValue = typeof field?.value !== 'undefined' ? field.value : initialValue;
    const [innerValue, setInnerValue] = useState<number>(controlled ? controlledValue : initialValue);

    useEffect(() => {
        if (value !== undefined && value !== null) setInnerValue(value);
    }, [value]);

    useEffect(() => {
        if (field && field?.value !== undefined && field?.value !== null) setInnerValue(field.value);
    }, [field, field?.value]);

    const onChangeValue = useCallback(
        (newValue: number) => {
            setInnerValue(newValue);
            if (field?.onChange) field?.onChange(newValue);
            if (onChange) onChange(newValue);
        },
        [field, onChange]
    );

    const handleInputChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const newValue = event.target.valueAsNumber || min;
            setInnerValue(newValue);
            if (field?.onChange) field?.onChange(newValue);
            if (onChange) onChange(newValue);
        },
        [field, min, onChange]
    );

    const handleInputBlur = useCallback(
        ({ target }: ChangeEvent<HTMLInputElement>) => {
            const newValue = +target.value;
            if (newValue < min) {
                onChangeValue(min);
                return;
            }
            if (newValue > max) {
                onChangeValue(max);
                return;
            }
            onChangeValue(newValue);
        },
        [onChangeValue, max, min]
    );

    return (
        <div {...props}>
            <div css={{ ...wrapperCSS, ...wrapperStyles }}>
                <div css={btnWrapperCSS}>
                    <button
                        type="button"
                        onClick={() => onChangeValue(Number(innerValue) - step)}
                        disabled={disabled || innerValue < min + step}
                        title={`Уменьшить на ${step}`}
                        css={buttonCSS}
                    >
                        <MinusIcon />
                    </button>
                </div>

                <div css={{ width: '100%' }}>
                    <input
                        css={inputCSS}
                        type="number"
                        name={name}
                        id={inputId}
                        min={min}
                        max={max}
                        step={step}
                        value={value || innerValue}
                        ref={ref}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        onClick={({ currentTarget }) => currentTarget.select()}
                        disabled={disabled}
                    />
                </div>

                <div css={btnWrapperCSS}>
                    <button
                        type="button"
                        onClick={() => onChangeValue(Number(innerValue) + step)}
                        disabled={disabled || innerValue > max - step}
                        title={`Увеличить на ${step}`}
                        css={buttonCSS}
                    >
                        <PlusIcon />
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Counter;
