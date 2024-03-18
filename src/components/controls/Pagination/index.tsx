import { Button, scale } from '@greensight/gds';
import { useRouter } from 'next/router';

import { PaginationProps } from '@controls/Pagination/types';

import { useUpdateQuery } from '@hooks/useUpdateQuery';

import IconLeft from '@icons/chevronLeft.svg';
import IconRight from '@icons/chevronRight.svg';

export default function Pagination({ totalPages }: PaginationProps) {
    const { query } = useRouter();
    const updateQuery = useUpdateQuery();

    const page = Number(query?.page) || 1;

    return (
        <div css={{ margin: scale(2), display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center' }}>
            <Button
                theme="link"
                size="link"
                Icon={IconLeft}
                onClick={() => updateQuery({ page: `${page - 1}` })}
                disabled={page - 1 <= 0}
            >
                Prev
            </Button>
            <span>{page}</span>
            <Button
                theme="link"
                size="link"
                Icon={IconRight}
                iconAfter
                onClick={() => updateQuery({ page: `${page + 1}` })}
                disabled={page + 1 >= totalPages}
            >
                Next
            </Button>
        </div>
    );
}
