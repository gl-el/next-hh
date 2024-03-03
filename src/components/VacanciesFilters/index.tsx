import { Button, Layout } from '@greensight/gds';
import { useState } from 'react';
import Select from 'react-select';

import { useVacanciesControl } from '@context/vacanciesControls';

import { VacanciesFiltersProps } from '@components/VacanciesFilters/types';

import CloseIcon from '@icons/close.svg';

export default function VacanciesFilters({ employments, positions }: VacanciesFiltersProps) {
    const { onApplyFilter, onClearFilter, employmentID, positionID } = useVacanciesControl();
    const [employmentValue, setEmploymentValue] = useState(employmentID);
    const [positionValue, setPositionValue] = useState(positionID);

    const handleFilters = () => {
        onApplyFilter({ employmentValue, positionValue });
    };

    const handleClearFilters = () => {
        setEmploymentValue('');
        setPositionValue('');
        onClearFilter();
    };

    return (
        <div>
            <Layout type="flex" align="end">
                <Layout.Item css={{ width: '240px' }}>
                    Form
                    <Select
                        instanceId={'employments'}
                        options={employments}
                        defaultValue={
                            employmentID ? employments.find(item => item.value === employmentID) : employmentValue
                        }
                        onChange={e => setEmploymentValue(typeof e === 'string' ? e : e.value)}
                    />
                </Layout.Item>
                <Layout.Item css={{ width: '240px' }}>
                    Position
                    <Select
                        instanceId={'positions'}
                        options={positions}
                        defaultValue={positionID ? positions.find(item => item.value === positionID) : positionValue}
                        onChange={e => setPositionValue(e.value)}
                    />
                </Layout.Item>
                <Layout.Item>
                    <Button onClick={handleFilters} disabled={!employmentValue && !positionValue}>
                        Apply filters
                    </Button>
                </Layout.Item>
            </Layout>
            {(employmentID || positionID) && (
                <Button theme="link" size="link" Icon={CloseIcon} iconAfter onClick={handleClearFilters}>
                    Clear filters
                </Button>
            )}
        </div>
    );
}
