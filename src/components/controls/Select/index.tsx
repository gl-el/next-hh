import ReactSelect, {
    type DropdownIndicatorProps,
    GroupBase,
    Props as SelectProps,
    components,
    ActionMeta, SingleValue, MultiValue
} from 'react-select';

import { useTheme } from '@scripts/gds';

import ChevronDown from '@icons/chevronDown.svg';
import ChevronUp from '@icons/chevronUp.svg';

const DropdownIndicator: React.FC<DropdownIndicatorProps> = props => {
    return (
        <components.DropdownIndicator {...props}>
            {props.selectProps.menuIsOpen ? <ChevronUp /> : <ChevronDown />}
        </components.DropdownIndicator>
    );
};

export interface OptionType {
    value: string;
    label: string;
}

export interface CustomSelectProps extends Omit<SelectProps<OptionType>, 'options' | 'value' | 'onChange'> {
    options: OptionType[];
    value?: OptionType | OptionType[] | null;
    onChange?: (option: OptionType | null, actionMeta: ActionMeta<OptionType>) => void;
    placeholder?: string;
}

const Select: React.FC<CustomSelectProps> = ({ options, value, onChange, placeholder, ...props }) => {
    const { components } = useTheme();
    const customStyles = components?.Select;
    return (
        <ReactSelect
            {...props}
            options={options}
            defaultValue={value}
            isMulti={false}
            onChange={onChange}
            components={{ DropdownIndicator }}
            placeholder={'Not selected'}
            styles={customStyles}
        />
    );
};

export default Select
