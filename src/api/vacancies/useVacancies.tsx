import { useQuery } from '@tanstack/react-query';

import { VacanciesRequestProps } from '@api/common/types';
import { getVacancies } from '@api/index';

import { VacanciesQueryResponse } from '@api/vacancies/types';

export function useVacancies(data: VacanciesRequestProps) {
    return useQuery<VacanciesQueryResponse, Error>({
        queryKey: ['vacancies', data],
        queryFn: () => getVacancies(data),
    });
}
