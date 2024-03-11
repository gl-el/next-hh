import { scale } from '@greensight/gds';
import { useRouter } from 'next/router';

import { useVacancies } from '@api/vacancies/useVacancies';

import { IndexPageProps } from '@views/types';

import Pagination from '@controls/Pagination';

import VacanciesCard from 'src/components/VacanciesCard';
import VacanciesFilters from '@components/VacanciesFilters';

import { typography } from '@scripts/gds';

export default function IndexPage({ employments, positions }: IndexPageProps) {
    const router = useRouter();
    const { page, employment, position } = router.query as { page?: string; employment?: string; position?: string };
    const { data, isLoading } = useVacancies({
        page: Number(page) ?? 1,
        employmentID: employment ?? '',
        positionID: position ?? '',
    });

    return (
        <main css={{ maxWidth: '1200px', margin: '0 auto', padding: `${scale(8)}px 0px` }}>
            <h1 css={{ ...typography('h1'), margin: `0 0 ${scale(5)}px` }}>List of vacancies</h1>
            <VacanciesFilters schedules={employments} positions={positions} />
            {!isLoading && data?.vacancies.map(item => <VacanciesCard key={item.id} {...item} />)}
            <Pagination totalPages={data?.pagesTotal ?? 0} />
        </main>
    );
}
