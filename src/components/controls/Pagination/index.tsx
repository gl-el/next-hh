import { Button } from '@greensight/gds';
import { useRouter } from 'next/router';

import { PaginationProps } from '@controls/Pagination/types';

import IconLeft from '@icons/chevronLeft.svg';
import IconRight from '@icons/chevronRight.svg';
import { query } from 'express';
import { LOCAL_API_BASE } from '@scripts/consts';

export default function Pagination({ totalPages }: PaginationProps) {
    const { push, query, pathname } = useRouter();

    let page = Number(query?.page) || 1;
    const updateQuery = (page: number) => {
        push(
            {
                pathname,
                query: { ...query, page },
            },
            undefined,
            { shallow: true }
        )
    }

    return (
        <div css={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center' }}>
            <Button
                theme="link"
                size="link"
                Icon={IconLeft}
                onClick={() => updateQuery(page - 1)}
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
                onClick={() => updateQuery(page + 1)}
                disabled={page + 1 >= totalPages}
            >
                Next
            </Button>
        </div>
    );
}
