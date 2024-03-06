import { Button, scale } from '@greensight/gds';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { Select } from '@controls/Select';

import ClearAllButton from '@components/VacanciesFilters/ClearAllButton';
import { VacanciesFiltersProps } from '@components/VacanciesFilters/types';

export default function VacanciesFilters({ schedules, positions }: VacanciesFiltersProps) {
    const { push, query, pathname } = useRouter();
    const [employmentValue, setEmploymentValue] = useState(query?.employment ?? '');
    const [positionValue, setPositionValue] = useState(query?.position ?? '');

    const updateQuery = () => {
        push(
            {
                pathname,
                query: { page: 1, employment: employmentValue, position: positionValue },
            },
            undefined,
            { shallow: true }
        );
    };

    const handleClear = () => {
        setPositionValue('');
        setEmploymentValue('');
        updateQuery();
        console.log(query);
    };

    return (
        <>
            <div css={{ display: 'flex', gap: scale(4), alignItems: 'end' }}>
                <div css={{ display: 'flex', gap: scale(2), '& > *': { minWidth: '265px' } }}>
                    <Select
                        value={employmentValue}
                        onValueChange={value => setEmploymentValue(value)}
                        placeholder="Not selected"
                        label="Form"
                        options={schedules.map(schedule => {
                            return { value: schedule.id, name: schedule.name };
                        })}
                    />
                    <Select
                        value={positionValue}
                        onValueChange={value => setPositionValue(value)}
                        placeholder="Not selected"
                        label="Position"
                        options={positions.map(position => {
                            return { value: position.id, name: position.name };
                        })}
                    />
                </div>

                <Button onClick={updateQuery}>Search</Button>
            </div>
            {(employmentValue || positionValue) && (
                <ClearAllButton css={{ marginTop: scale(2) }} onClick={handleClear} />
            )}
        </>
    );
}
