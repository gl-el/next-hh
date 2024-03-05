import { scale } from '@greensight/gds';
import * as SelectPrimitive from '@radix-ui/react-select';
import React, { ReactNode } from 'react';

import { colors, shadows, typography } from '@scripts/gds';

import ChevronDownIcon from '@icons/chevronDown.svg';
import { rotate } from 'next/dist/server/lib/squoosh/impl';

interface SelectProps extends SelectPrimitive.SelectProps {
    children: ReactNode;
    placeholder?: string;
}

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(({ children, ...props }, forwardedRef) => {
    return (
        <SelectPrimitive.Root {...props}>
            <SelectPrimitive.Trigger
                ref={forwardedRef}
                css={{
                    width: 'fit-content',
                    minWidth: '250px',
                    minHeight: scale(5),
                    padding: `${scale(1, true)}px ${scale(3, true)}px`,
                    border: `1px solid ${colors.grey400}`,
                    borderRadius: scale(1, true),
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    ...typography('s'),
                    '&:active':{
                        border: `1px solid ${colors.blue}`,
                    }
                }}
            >
                <SelectPrimitive.Value placeholder={props.placeholder ?? false} />
                <SelectPrimitive.Icon asChild
                    css={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '&[data-state]="open"': {
                            transform: 'rotate(180 deg)',
                        }
                    }}
                >
                    <ChevronDownIcon css={{
                        transform: "rotate(0deg)",
                        "[data-state=open] > &": { transform: "rotate(180deg)" }
                    }} />
                </SelectPrimitive.Icon>
            </SelectPrimitive.Trigger>

            <SelectPrimitive.Content
                position="popper"
                avoidCollisions={true}
                sideOffset={4}
                css={{
                    width: 'var(--radix-select-trigger-width)',
                    boxShadow: `${shadows.box}`,
                    backgroundColor: `${colors.white}`,
                    borderRadius: `${scale(1, true)}px`,
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
