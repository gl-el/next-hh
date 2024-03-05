import { Button, Layout } from '@greensight/gds';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { VacanciesFiltersProps } from '@components/VacanciesFilters/types';
import { Select, SelectItem } from '@controls/Select';



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
                <Select placeholder='placeholder' >
                    <SelectItem value={'1'}>aSd</SelectItem>
                    <SelectItem value={'2'}>aSd</SelectItem>
                    <SelectItem value={'3'}>aSd</SelectItem>
                    <SelectItem value={'4'}>aSd</SelectItem>
                </Select>
                <Select placeholder='placeholder' >
                    <SelectItem value={'5'}>qwe</SelectItem>
                    <SelectItem value={'6'}>qwe</SelectItem>
                    <SelectItem value={'7'}>qwe</SelectItem>
                    <SelectItem value={'8'}>qwe</SelectItem>
                </Select>
                <Button onClick={updateQuery}>Apply filters</Button>
            </Layout>

        </div>
    );
}
