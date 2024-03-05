import { scale } from '@greensight/gds';
import * as SelectPrimitive from '@radix-ui/react-select';
import { rotate } from 'next/dist/server/lib/squoosh/impl';
import React, { ReactNode } from 'react';
import { Simulate } from 'react-dom/test-utils';

import { colors, shadows, typography, useTheme } from '@scripts/gds';

import ChevronDownIcon from '@icons/chevronDown.svg';

import select = Simulate.select;

interface SelectProps extends SelectPrimitive.SelectProps {
    children: ReactNode;
    placeholder?: string;
    options: {
        value: string | number;
        name: string;
    };
}

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(({ children, ...props }, forwardedRef) => {
    const { components } = useTheme();
    const selectTheme = components?.Select;
    return (
        <SelectPrimitive.Root {...props}>
            <SelectPrimitive.Trigger
                ref={forwardedRef}
                css={{
                    width: '100%',
                    minHeight: selectTheme?.height,
                    padding: selectTheme?.padding,
                    border: '1px solid',
                    borderColor: selectTheme?.borderColor,
                    borderRadius: selectTheme?.borderRadius,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    ...typography('s'),
                    '&focus': {
                        color: selectTheme?.focusBorderColor,
                    },
                    '&[data-placeholder]': {
                        color: selectTheme?.placeholderColor,
                    },
                }}
            >
                <SelectPrimitive.Value placeholder={props.placeholder ?? false} />
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

            <SelectPrimitive.Content
                position="popper"
                avoidCollisions={true}
                sideOffset={4}
                css={{
                    width: 'var(--radix-select-trigger-width)',
                    boxShadow: selectTheme?.menuShadow,
                    backgroundColor: selectTheme?.menuColor,
                    borderRadius: selectTheme?.menuBorderRadius,
                }}
            >
                <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
            </SelectPrimitive.Content>
        </SelectPrimitive.Root>
    );
});

export const SelectItem = React.forwardRef<HTMLDivElement, SelectPrimitive.SelectItemProps>(
    ({ children, ...props }, forwardedRef) => {
        return (
            <SelectPrimitive.Item
                {...props}
                ref={forwardedRef}
                css={{
                    ...typography('s'),
                    padding: `${scale(1, true)}px ${scale(3, true)}px`,
                    height: `${scale(5)}px`,
                    display: 'flex',
                    alignItems: 'center',
                    '&[data-highlighted]': {
                        backgroundColor: colors.blue,
                        color: colors.white,
                    },
                }}
            >
                <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
            </SelectPrimitive.Item>
        );
    }
);
