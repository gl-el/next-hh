interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onNext: () => void;
    onPrev: () => void;
}

export default function Pagination({ currentPage, onNext, onPrev, totalPages }: PaginationProps) {
    return (
        <div>
            <button onClick={onPrev} disabled={currentPage - 1 <= 0}>
                Prev
            </button>
            <span>{currentPage}</span>
            <button onClick={onNext} disabled={currentPage + 1 >= totalPages}>
                Next
            </button>
        </div>
    );
}
