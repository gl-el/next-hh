import { Button, Layout, scale } from '@greensight/gds';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { Select } from '@controls/Select';

import ClearAllButton from '@components/VacanciesFilters/ClearAllButton';
import { VacanciesFiltersProps } from '@components/VacanciesFilters/types';

import { useUpdateQuery } from '@hooks/useUpdateQuery';

export default function VacanciesFilters({ schedules, positions }: VacanciesFiltersProps) {
    const { query } = useRouter();
    const updateQuery = useUpdateQuery();
    const [employmentValue, setEmploymentValue] = useState((query?.employment as string) ?? '');
    const [positionValue, setPositionValue] = useState((query?.position as string) ?? '');

    const handleSearch = () => {
        updateQuery({
            page: '1',
            employment: employmentValue,
            position: positionValue,
        });
    };
    const handleClear = () => {
        setPositionValue('');
        setEmploymentValue('');
        updateQuery({
            page: '1',
            employment: '',
            position: '',
        });
    };

    return (
        <>
            <Layout type="flex" gap={scale(4)} align="end" >
                <Layout.Item col={{xxxl: 546, sm: "100%"}}>
                    <Layout type="flex" gap={scale(2)} >
                        <Layout.Item col={{ xxxl: "50%", sm: "100%"}}>
                            <Select
                                value={employmentValue}
                                onValueChange={value => setEmploymentValue(value)}
                                placeholder="Not selected"
                                label="Form"
                                options={schedules.map(schedule => ({ value: schedule.id, name: schedule.name }))}
                            />
                        </Layout.Item>
                        <Layout.Item col={{ xxxl: "50%", sm: "100%"}}>
                            <Select
                                value={positionValue}
                                onValueChange={value => setPositionValue(value)}
                                placeholder="Not selected"
                                label="Position"
                                options={positions.map(position => ({ value: position.id, name: position.name }))}
                            />
                        </Layout.Item>
                    </Layout>
                </Layout.Item>
                <Layout.Item>
                    <Button onClick={handleSearch}>Search</Button>
                </Layout.Item>
            </Layout>
            {(query?.employment || query?.position) && (
                <ClearAllButton css={{ marginTop: scale(2) }} onClick={handleClear} />
            )}
        </>
    );
}
