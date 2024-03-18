import { scale } from '@greensight/gds';
import { useState } from 'react';

import { VacancyProps } from '@customTypes/index';

import VacancyEmployerDetails from '@components/VacanciesCard/VacancyEmployerDetails';
import VacancyHeader from '@components/VacanciesCard/VacancyHeader';

import { Button, shadows, typography } from '@scripts/gds';

import ChevronUp from '@icons/chevronUp.svg';

export default function VacanciesCard(vacancyProps: VacancyProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { name, alternate_url, description } =  vacancyProps;
    const logo = vacancyProps?.employer?.logo_urls?.original;
    const vacancyDetails = [
        { label: 'Form', value: vacancyProps?.employment?.name },
        {
            label: 'Company',
            value: vacancyProps?.employer?.name,
        },
        { label: 'Web', value: vacancyProps?.employer?.alternate_url },
        { label: 'Address', value: vacancyProps?.area.name },
    ];

    return (
        <div
            css={{
                padding: `${scale(5)}px ${scale(5)}px ${scale(6)}px`,
                maxHeight: `${isOpen ? 'auto' : '348px'}`,
                position: 'relative',
                borderRadius: scale(2),
                boxShadow: shadows.boxLight,
                overflow: 'hidden',
                transition: 'all 0.5s',
            }}
        >
            <VacancyHeader name={name} responseUrl={alternate_url} logo={logo} />
            <VacancyEmployerDetails details={vacancyDetails} />
            <div
                css={{ ...typography('m'), display: 'flex', flexDirection: 'column', gap: scale(2) }}
                dangerouslySetInnerHTML={{ __html: description }}
            />
            <div
                css={{
                    position: `${isOpen ? 'static' : 'absolute'}`,
                    bottom: 0,
                    left: 0,
                    padding: `${isOpen ? 0 : scale(5)}px`,
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    width: '100%',
                    height: `${isOpen ? 'auto' : '160px'}`,
                    background: `${isOpen ? 'transparent' : 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 12.82%, rgba(255, 255, 255, 0.98) 50.51%, rgba(255, 255, 255, 0.98) 56.86%, #FFF 88.19%)'}`,
                }}
            >
                <Button
                    theme="link"
                    size="link"
                    Icon={ChevronUp}
                    iconAfter
                    onClick={() => setIsOpen(state => !state)}
                    css={{
                        '& > svg': {
                            transition: 'transform 0.2s',
                            transform: `rotate(${isOpen ? 0 : '180deg'})`,
                        },
                    }}
                >
                    {isOpen ? 'Less details' : 'More details'}
                </Button>
            </div>
        </div>
    );
}
