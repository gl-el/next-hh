import { Button, Layout } from '@greensight/gds';
import { useState } from 'react';

import { VacanciesFiltersProps } from '@components/VacanciesFilters/types';

import CloseIcon from '@icons/close.svg';
import { useRouter } from 'next/router';

export default function VacanciesFilters({ schedules, positions }: VacanciesFiltersProps) {
    const [employmentValue, setEmploymentValue] = useState('');
    const [positionValue, setPositionValue] = useState('');

    const { push, query, pathname } = useRouter();

    const updateQuery = () => {
        push(
            {
                pathname,
                query: { page: 1, employment: employmentValue, position: positionValue },
            },
            undefined,
            { shallow: true }
        )
    }
    return (
        <div>
            <Layout type="flex" align="end">
                Form
                <select value={employmentValue} onChange={(e) => setEmploymentValue(e.target.value)}>
                    {schedules.map((item, index) => (
                        <option key={`employment=${index}`} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
                Position
                <select value={positionValue} onChange={(e) => setPositionValue(e.target.value)}>
                    {positions.map((item, index) => (
                        <option key={`position=${index}`} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
                <Button onClick={updateQuery}>Apply filters</Button>
            </Layout>
        </div>
    );
}
