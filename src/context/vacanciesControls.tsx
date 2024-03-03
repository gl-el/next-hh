import { useRouter } from 'next/router';
import { ReactNode, createContext, useContext, useState } from 'react';

interface ContextProps {
    page: number;
    employmentID: string;
    positionID: string;
    onNextPage: () => void;
    onPrevPage: () => void;
    onClearFilter: () => void;
    onApplyFilter: ({ employmentValue, positionValue }: { employmentValue?: string; positionValue?: string }) => void;
}

const VacanciesControlContext = createContext<ContextProps | null>(null);

interface VacanciesControlProviderProps {
    children: ReactNode;
}

export function VacanciesControlProvider({ children }: VacanciesControlProviderProps) {
    const router = useRouter();
    const { query } = router;
    const queryEmployment = Array.isArray(query.employment) ? query.employment[0] : query.employment;
    const queryPosition = Array.isArray(query.position) ? query.position[0] : query.position;
    const [page, setPage] = useState(Number(query.page) || 1);
    const [employmentID, setEmploymentID] = useState(queryEmployment ?? '');
    const [positionID, setPositionID] = useState(queryPosition ?? '');

    function onNextPage() {
        router.push(
            `?page=${page + 1}${employmentID ? `&employment=${employmentID}` : ''}${positionID ? `&position=${positionID}` : ''}`,
            undefined,
            { shallow: true }
        );
        setPage(page + 1);
    }

    function onPrevPage() {
        router.push(
            `?page=${page - 1}${employmentID ? `&employment=${employmentID}` : ''}${positionID ? `&position=${positionID}` : ''}`,
            undefined,
            { shallow: true }
        );
        setPage(page - 1);
    }

    function onApplyFilter({ employmentValue = '', positionValue = '' }) {
        setEmploymentID(employmentValue);
        setPositionID(positionValue);
        setPage(1);
        router.push(
            `?page=1${employmentValue ? `&employment=${employmentValue}` : ''}${positionValue ? `&position=${positionValue}` : ''}`,
            undefined,
            {
                shallow: true,
            }
        );
    }

    function onClearFilter() {
        setEmploymentID('');
        setPositionID('');
        setPage(1);
        router.push(`?page=1`, undefined, {
            shallow: true,
        });
    }

    return (
        <VacanciesControlContext.Provider
            value={{
                page,
                employmentID,
                positionID,
                onNextPage,
                onPrevPage,
                onApplyFilter,
                onClearFilter,
            }}
        >
            {children}
        </VacanciesControlContext.Provider>
    );
}

export function useVacanciesControl() {
    const context = useContext(VacanciesControlContext);
    if (context === null) throw new Error('Context used outside of provider');
    return context;
}
