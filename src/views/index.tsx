import { Section, scale } from '@greensight/gds';
import Head from 'next/head';
import { useRouter } from 'next/router';
import VacanciesCard from 'src/components/VacanciesCard';

import { useVacancies } from '@api/vacancies/useVacancies';

import { VacancyProps } from '@customTypes/index';

import { IndexPageProps } from '@views/types';

import Pagination from '@controls/Pagination';

import Counter from '@components/Counter';
import VacanciesFilters from '@components/VacanciesFilters';
import VacanciesList from '@components/VacanciesList';

import { MEDIA_QUERIES, typography } from '@scripts/gds';

export default function IndexPage({ employments, positions }: IndexPageProps) {
    const router = useRouter();
    const { page, employment, position } = router.query as { page?: string; employment?: string; position?: string };
    const { data, isLoading } = useVacancies({
        page: Number(page) ?? 1,
        employmentID: employment ?? '',
        positionID: position ?? '',
    });

    return (
        <>
            <Head>
                <title>List of vacancies</title>
            </Head>
            <Section pt={{ xxxl: scale(8), md: scale(4) }} pb={{ xxxl: scale(13), md: scale(4) }}>
                <h1
                    css={{
                        ...typography('h1'),
                        margin: `0 0 ${scale(5)}px`,
                        [MEDIA_QUERIES.md]: {
                            margin: `0 0 ${scale(3)}px`,
                        },
                    }}
                >
                    List of vacancies
                </h1>
                <VacanciesFilters schedules={employments} positions={positions} />
                {!isLoading && (
                    <VacanciesList<VacancyProps>
                        items={data?.vacancies}
                        render={vacancy => <VacanciesCard key={vacancy.id} {...vacancy} />}
                    />
                )}
                <Pagination totalPages={data?.pagesTotal ?? 0} />
                <Counter />
            </Section>
        </>
    );
}
