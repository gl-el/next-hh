import { useVacancies } from '@api/vacancies/useVacancies';

import { useVacanciesControl } from '@context/vacanciesControls';

import Pagination from '@controls/Pagination';

import VacancieCard from '@components/VacancieCard';
import VacanciesFilters from '@components/VacanciesFilters';
import { IndexPageProps } from '@views/types';
import { typography } from '@scripts/gds';
import { scale } from '@greensight/gds';

export default function IndexPage({ employments, positions }: IndexPageProps) {
    const { data, isLoading } = useVacancies();
    const { onNextPage, onPrevPage, page } = useVacanciesControl();

    return (
        <main css={{ maxWidth: '1200px', margin: '0 auto', padding: `${scale(8)}px 0px`}} >
            <h1 css={{...typography('h1'), marginBottom: scale(5)}}>List of vacancies</h1>
            <VacanciesFilters employments={employments} positions={positions} />
            {data?.vacancies.map(vacancy => <VacancieCard key={vacancy.id} {...vacancy} />)}
            <Pagination currentPage={page} onNext={onNextPage} onPrev={onPrevPage} totalPages={data?.pageCount ?? 0} />
        </main>
    );
}
