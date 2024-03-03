import { StylesConfig } from 'react-select';
import { typography } from '@scripts/gds';
import tokens from '../../../public/tokens.json';
import { scale } from '@greensight/gds';

const {colors, shadows} = tokens;

export const Select: StylesConfig = {
    control: (provided, state) => ({
        ...provided,
        padding: `${scale(1, true)}px ${scale(3, true)}px`,
        minHeight: '44px',
        borderColor: state.isFocused ? `${colors.blue}`: `${colors.grey400}`,
        boxShadow: 'none',
        '&:hover': {
            borderColor: `${colors.blue}`,
        },
        ...typography('s'),
    }),
    valueContainer: provided => ({
        ...provided,
        padding: 0,
    }),
    indicatorSeparator: provided => ({
        ...provided,
        width: 0,
    }),
    indicatorsContainer: provided => ({
        ...provided,
        padding: 0,
    }),
    dropdownIndicator: provided => ({
        ...provided,
        padding: 0,
    }),
    menu: provided => ({
        ...provided,
        marginTop: 4,
        boxShadow: `${shadows.box}`,
    }),
    menuList: provided => ({
        ...provided,
        padding: 0,
        borderRadius: `${scale(1, true)}px`,
        ...typography('s'),
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? `${colors.blue}` : 'inherit',
        color: state.isFocused ? `${colors.white}` : 'inherit',
        '&:hover': {
            backgroundColor: `${colors.blue}`, // Change background color on hover
        },
    }),
};

export type SelectTheme = typeof Select;
