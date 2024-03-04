import { useQuery } from '@tanstack/react-query';

import { getVacancy } from '@api/index';
import { VacancyQueryProps } from '@api/vacancy/types';
import { VacancyProps } from '@customTypes/index';

export function useVacancy(data: VacancyQueryProps) {
    return useQuery<VacancyProps, Error>({
        queryKey: ['vacancy', data],
        queryFn: () => getVacancy(data.id),
    });
}
