import { useQuery } from '@tanstack/react-query';

import { VacanciesRequestProps, VacancyPreviewsApiProps } from '@api/common/types';
import { getVacancies } from '@api/index';

export function useVacancies(data: VacanciesRequestProps) {
    return useQuery<VacancyPreviewsApiProps, Error>({
        queryKey: ['vacancies', data],
        queryFn: () => getVacancies(data),
    });
}
