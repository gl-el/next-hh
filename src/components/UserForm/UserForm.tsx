import css from '@emotion/css';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form';

import { Input } from '@controls/Form/Input';

import { schema } from '@components/UserForm/schema';
import { UserFormTypes } from '@components/UserForm/types';

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
                    wrapperStyles={{ width: '50%' }}
                    name={name}
                    placeholder="Enter your name"
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
