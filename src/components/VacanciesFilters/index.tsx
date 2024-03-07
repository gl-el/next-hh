import { Button, scale } from '@greensight/gds';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { Select } from '@controls/Select';

import ClearAllButton from '@components/VacanciesFilters/ClearAllButton';
import { VacanciesFiltersProps } from '@components/VacanciesFilters/types';

export default function VacanciesFilters({ schedules, positions }: VacanciesFiltersProps) {
    const { push, query, pathname } = useRouter();
    const [employmentValue, setEmploymentValue] = useState((query?.employment as string) ?? '');
    const [positionValue, setPositionValue] = useState((query?.position as string) ?? '');

    const updateQuery = (newData: Record<string, string>) => {
        push(
            {
                pathname,
                query: { ...newData },
            },
            undefined,
            { shallow: true }
        );
    };

    const handleClear = () => {
        setPositionValue('');
        setEmploymentValue('');
        updateQuery({ page: '1' });
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

                <Button
                    onClick={() =>
                        updateQuery({
                            page: '1',
                            employment: employmentValue,
                            position: positionValue,
                        })
                    }
                >
                    Search
                </Button>
            </div>
            {(query?.employment || query?.position) && (
                <ClearAllButton css={{ marginTop: scale(2) }} onClick={handleClear} />
            )}
        </>
    );
}
