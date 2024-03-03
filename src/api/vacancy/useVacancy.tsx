import { useQuery } from '@tanstack/react-query';

import { VacancyProps } from '@api/common/types';
import { getVacancy } from '@api/index';
import { VacancyQueryProps } from '@api/vacancy/types';

export function useVacancy(data: VacancyQueryProps) {
    return useQuery<VacancyProps, Error>({
        queryKey: ['vacancy', data],
        queryFn: () => getVacancy(data.id),
    });
}
