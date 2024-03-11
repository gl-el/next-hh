import { scale } from '@greensight/gds';

import { colors, typography } from '@scripts/gds';

interface VacancyEmployerDetailsProps {
    details: {
        label: string;
        value?: string | null;
    }[];
}

export default function VacancyEmployerDetails({ details }: VacancyEmployerDetailsProps) {
    return (
        <ul css={{ listStyle: 'none', display: 'flex', gap: scale(6), margin: `${scale(3)}px 0 ${scale(4)}px` }}>
            {details.map(detail => (
                <li key={detail.label} css={{ display: 'flex', gap: scale(1), alignItems: 'baseline' }}>
                    <span css={{ ...typography('m'), color: colors.grey700 }}>{detail.label}</span>
                    <strong css={{ ...typography('mMedium'), color: colors.black }}>
                        {detail.value?.startsWith('http') ? (
                            <a href={detail.value} target="_blank" rel="noopener noreferrer">
                                {detail.value}
                            </a>
                        ) : (
                            detail.value ?? 'N/A'
                        )}
                    </strong>
                </li>
            ))}
        </ul>
    );
}
