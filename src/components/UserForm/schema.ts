import isEmail from 'validator/lib/isEmail';
import * as yup from 'yup';

const NAME_REGEX = /^[a-zA-Zа-яА-Я]+$/;
export const schema = yup.object().shape({
    name: yup
        .string()
        .default('')
        .required('Enter your name')
        .max(50, '50 characters maximum')
        .matches(NAME_REGEX, 'Only letters'),
    phone: yup.string().default('').min(18, 'Enter phone number').required('Enter phone number'),
    email: yup
        .string()
        .default('')
        .required('Enter email')
        .email('Enter correct email')
        .test({
            name: 'is email',
            test: value => isEmail(value),
            message: 'Enter correct email',
        }),
    comment: yup
        .string()
        .required('Enter about text')
        .min(1, 'Enter about text')
        .test('max symbols', '200 symbols max', v => v.replaceAll(' ', '').length <= 200),
});
