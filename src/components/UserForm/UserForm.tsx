import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, FormProvider, SubmitHandler, useForm, useFormContext } from 'react-hook-form';
import { TextInput } from 'src/components/controls/Form/TextInput';

import FormField from '@controls/Form/FormField';

import { schema } from '@components/UserForm/schema';
import { UserFormTypes } from '@components/UserForm/types';

interface ControlInputProps {
    name: string;
    placeholder: string;
    type?: 'text' | 'email' | 'password' | 'number';
}

export default function UserForm() {
    const methods = useForm<UserFormTypes>({
        resolver: yupResolver(schema),
    });
    const onSubmit: SubmitHandler<UserFormTypes> = data => console.log(data);

    console.log(methods.handleSubmit(onSubmit));

    return (
        <FormProvider {...methods}>
            <form
                css={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 20,
                    '& label': { width: '80%' },
                }}
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                <FormField name="name" placeholder="Enter your name" />
                <FormField name="email" type="email">
                    <TextInput label="asdasd" placeholder="asdasd" />
                </FormField>
                <FormField name="comment" type="password" placeholder="Enter your password" />
                <button>Submit</button>
            </form>
        </FormProvider>
    );
}
