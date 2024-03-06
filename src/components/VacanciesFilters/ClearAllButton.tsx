import { Button } from '@greensight/gds';

import CloseIcon from '@icons/close.svg';

export default function ClearAllButton({ ...props }: React.ComponentPropsWithoutRef<'button'>) {
    return (
        <Button theme="link" size="link" Icon={CloseIcon} {...props}>
            Clear all
        </Button>
    );
}
