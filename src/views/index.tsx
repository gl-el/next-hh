import { scale } from '@greensight/gds';

import { useVacancies } from '@api/vacancies/useVacancies';

import { useVacanciesControl } from '@context/vacanciesControls';

import { IndexPageProps } from '@views/types';

import Pagination from '@controls/Pagination';

import VacancieCard from '@components/VacancieCard';
import VacanciesFilters from '@components/VacanciesFilters';

import { typography } from '@scripts/gds';

export default function IndexPage({ employments, positions }: IndexPageProps) {
    const { onNextPage, onPrevPage, page, employmentID, positionID } = useVacanciesControl();
    const { data, isLoading } = useVacancies({ page, employmentID, positionID });

    return (
        <main css={{ maxWidth: '1200px', margin: '0 auto', padding: `${scale(8)}px 0px` }}>
            <h1 css={{ ...typography('h1'), marginBottom: scale(5) }}>List of vacancies</h1>
            <VacanciesFilters employments={employments} positions={positions} />
            {!isLoading && data?.vacancies.map(vacancy => <VacancieCard key={vacancy.id} {...vacancy} />)}
            <Pagination currentPage={page} onNext={onNextPage} onPrev={onPrevPage} totalPages={data?.pagesTotal ?? 0} />
        </main>
    );
}
