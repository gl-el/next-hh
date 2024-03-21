import { CSSObject } from '@emotion/core';
import { ReactElement, cloneElement } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextInput } from 'src/components/controls/Form/TextInput';

interface FormFieldProps {
    children?: ReactElement;
    name: string;
    placeholder?: string;
    type?: 'text' | 'email' | 'password' | 'number';
    wrapperStyle?: CSSObject;
}

export default function FormField({ name, placeholder, type = 'text', children, wrapperStyle }: FormFieldProps) {
    const methods = useFormContext();

    if (children) {
        return (
            <Controller
                control={methods.control}
                name={name}
                render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) =>
                    cloneElement(children, { onChange, onBlur, error, name })
                }
            />
        );
    }

    return (
        <Controller
            control={methods.control}
            name={name}
            render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
                <TextInput
                    type={type}
                    wrapperStyles={wrapperStyle}
                    name={name}
                    placeholder={placeholder ?? 'Placeholder'}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value || ''}
                    ref={ref}
                    label={name}
                    error={error}
                />
            )}
        />
    );
}
