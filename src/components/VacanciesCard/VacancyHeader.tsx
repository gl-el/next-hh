import { scale } from '@greensight/gds';
import Image from 'next/image';

import { Button, typography } from '@scripts/gds';

interface VacancyHeaderProps {
    name: string;
    logo?: string;
    responseUrl: string;
}

export default function VacancyHeader({ name, logo, responseUrl }: VacancyHeaderProps) {
    return (
        <div
            css={{
                display: 'flex',
                alignItems: 'start',
                justifyContent: 'space-between',
                gap: scale(3, true),
                flexWrap: 'nowrap',
            }}
        >
            <div css={{ display: 'flex', alignItems: 'start', justifyContent: 'flex-start', gap: scale(3, true) }}>
                <h4 css={{ ...typography('h4') }}>{name}</h4>

                {logo && (
                    <Image
                        src={logo}
                        alt='Company logo'
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{
                            width: '150px',
                            height: '40px',
                            objectFit: 'contain',
                        }}
                    />
                )}
            </div>
            <Button as="a" theme="secondary" target="_blank" href={responseUrl} rel="noopener noreferrer">
                Respond
            </Button>
        </div>
    );
}
