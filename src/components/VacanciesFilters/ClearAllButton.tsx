import { Button } from '@greensight/gds';
import { ComponentPropsWithoutRef } from 'react';

import CloseIcon from '@icons/close.svg';

export default function ClearAllButton({ ...props }: ComponentPropsWithoutRef<'button'>) {
    return (
        <Button theme="link" size="link" Icon={CloseIcon} {...props}>
            Clear all
        </Button>
    );
}
