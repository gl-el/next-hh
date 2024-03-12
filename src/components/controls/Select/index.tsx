import { scale } from '@greensight/gds';
import * as SelectPrimitive from '@radix-ui/react-select';
import React from 'react';

import { typography, useTheme } from '@scripts/gds';

import ChevronDownIcon from '@icons/chevronDown.svg';
import ChevronUpIcon from '@icons/chevronUp.svg';

interface SelectProps extends SelectPrimitive.SelectProps {
    placeholder?: string;
    label?: string;
    options: {
        value: string;
        name: string;
    }[];
}

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
    ({ options, label, placeholder, ...props }, forwardedRef) => {
        const { components } = useTheme();
        const selectTheme = components?.Select;
        return (
            <label css={{ ...typography('xsMedium'), color: selectTheme?.color }}>
                {label}
                <SelectPrimitive.Root {...props}>
                    <SelectPrimitive.Trigger
                        ref={forwardedRef}
                        css={{
                            width: '100%',
                            minHeight: selectTheme?.height,
                            marginTop: scale(1, true),
                            padding: selectTheme?.padding,
                            border: '1px solid',
                            borderColor: selectTheme?.borderColor,
                            borderRadius: selectTheme?.borderRadius,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            ...typography(selectTheme?.typography),
                            color: selectTheme?.color,
                            '&:focus': {
                                borderColor: selectTheme?.focusBorderColor,
                            },
                            '&[data-placeholder]': {
                                color: selectTheme?.placeholderColor,
                            },
                        }}
                    >
                        <SelectPrimitive.Value placeholder={placeholder ?? false} />
                        <SelectPrimitive.Icon
                            asChild
                            css={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <ChevronDownIcon
                                css={{
                                    transform: 'rotate(0deg)',
                                    transition: 'transform 0.2s',
                                    '[data-state=open] > &': { transform: 'rotate(180deg)' },
                                }}
                            />
                        </SelectPrimitive.Icon>
                    </SelectPrimitive.Trigger>
                    <SelectPrimitive.Portal>
                        <SelectPrimitive.Content
                            position="popper"
                            avoidCollisions={true}
                            sideOffset={4}
                            css={{
                                width: 'var(--radix-select-trigger-width)',
                                maxHeight: '50vh',
                                overflowY: 'auto',
                                boxShadow: selectTheme?.menuShadow,
                                backgroundColor: selectTheme?.menuColor,
                                borderRadius: selectTheme?.menuBorderRadius,
                            }}
                        >
                            <SelectPrimitive.ScrollUpButton
                                css={{
                                    textAlign: 'center',
                                    padding: scale(1),
                                }}
                            >
                                <ChevronUpIcon />
                            </SelectPrimitive.ScrollUpButton>
                            <SelectPrimitive.Viewport>
                                {options.map(item => (
                                    <SelectPrimitive.Item
                                        key={item.value}
                                        css={{
                                            ...typography(selectTheme?.typography),
                                            padding: selectTheme?.optionPadding,
                                            minHeight: selectTheme?.optionHeight,
                                            display: 'flex',
                                            alignItems: 'center',
                                            '&[data-highlighted]': {
                                                backgroundColor: selectTheme?.optionHighlightedBg,
                                                color: selectTheme?.optionHighlightedColor,
                                            },
                                        }}
                                        value={item.value}
                                    >
                                        <SelectPrimitive.ItemText>{item.name}</SelectPrimitive.ItemText>
                                    </SelectPrimitive.Item>
                                ))}
                            </SelectPrimitive.Viewport>
                            <SelectPrimitive.ScrollDownButton
                                css={{
                                    textAlign: 'center',
                                    padding: scale(1),
                                }}
                            >
                                <ChevronDownIcon />
                            </SelectPrimitive.ScrollDownButton>
                        </SelectPrimitive.Content>
                    </SelectPrimitive.Portal>
                </SelectPrimitive.Root>
            </label>
        );
    }
);
