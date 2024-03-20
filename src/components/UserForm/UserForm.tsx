import { yupResolver } from '@hookform/resolvers/yup';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form';
import { upperFirst } from 'tiny-case';

import { schema } from '@components/UserForm/schema';
import { UserFormTypes } from '@components/UserForm/types';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
    label: string;
    errorMessage: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, errorMessage, ...props }, ref) => (
    <label css={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        {upperFirst(label)}
        <input ref={ref} {...props} />
        <span>{errorMessage}</span>
    </label>
));

interface ControlInputProps {
    name: string;
}

const ControledInput = ({ name }: ControlInputProps) => {
    const methods = useFormContext();
    return (
        <Controller
            control={methods.control}
            name={name}
            render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
                <Input
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value || ''}
                    ref={ref}
                    label={name}
                    errorMessage={error?.message || ''}
                />
            )}
        />
    );
};

export default function UserForm() {
    const methods = useForm<UserFormTypes>({
        resolver: yupResolver(schema),
    });
    const onSubmit = (data: UserFormTypes) => {
        console.log(data);
    };

    console.error(methods.formState.errors);

    return (
        <FormProvider {...methods}>
            <form css={{ display: 'flex', flexDirection: 'column', gap: 20 }} onSubmit={methods.handleSubmit(onSubmit)}>
                <ControledInput name="name" />
                <button>Submit</button>
            </form>
        </FormProvider>
    );
}
