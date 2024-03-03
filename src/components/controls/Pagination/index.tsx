import { PaginationProps } from '@controls/Pagination/types';
import { Button } from '@greensight/gds';

import IconLeft from '@icons/chevronLeft.svg';
import IconRight from '@icons/chevronRight.svg';


export default function Pagination({ currentPage, onNext, onPrev, totalPages }: PaginationProps) {
    return (
        <div css={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center'}}>
            <Button theme="link" size="link" Icon={IconLeft}  onClick={onPrev} disabled={currentPage - 1 <= 0}>
                Prev
            </Button>
            <span>{currentPage}</span>
            <Button theme="link" size="link" Icon={IconRight} iconAfter onClick={onNext} disabled={currentPage + 1 >= totalPages}>
                Next
            </Button>
        </div>
    );
}
