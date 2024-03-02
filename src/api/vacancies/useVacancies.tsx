import { useQuery, useQueryClient } from '@tanstack/react-query';

import { getVacancies, getVacancy } from '@api/index';

import { useVacanciesControl } from '@context/vacanciesControls';

export function useVacancies() {
    const { page, employmentID, positionID } = useVacanciesControl();
    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['vacancies', page, employmentID, positionID],
        queryFn: async () => {
            const data = await getVacancies({page, employmentID, positionID});
            const pageCount = data?.pages ?? 0;
            const vacanciesID = data.items.map(item => {
                return item.id;
            });
            const vacancies = await Promise.all(vacanciesID.map(id => getVacancy(id)));
            return { vacancies, pageCount };
        },
    });

    const pageCount = data?.pageCount ?? 0;

    if (page < pageCount) {
        queryClient.prefetchQuery({
            queryKey: ['vacancies', page + 1, employmentID, positionID],
            queryFn: async () => {
                const data = await getVacancies({page: page + 1, employmentID, positionID});
                const pageCount = data?.pages ?? 0;
                const vacanciesID = data.items.map(item => {
                    return item.id;
                });
                const vacancies = await Promise.all(vacanciesID.map(id => getVacancy(id)));
                return { vacancies, pageCount };
            },
        });
    }

    return {
        data,
        isLoading,
        isError,
    };
}
