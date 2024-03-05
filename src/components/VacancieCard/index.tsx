import { Layout, scale } from '@greensight/gds';
import Image from 'next/image';

import { Button, typography } from '@scripts/gds';
import { VacancyProps } from '@customTypes/index';

export default function VacancieCard(vacancyProps: VacancyProps) {
    const logo = vacancyProps?.employer?.logo_urls?.original;
    const employerName = vacancyProps?.employer?.name;

    return (
        <div css={{ padding: `${scale(5)}px ${scale(5)}px ${scale(6)}px` }}>
            <Layout type="flex" justify="space-between" align="center" direction="row" wrap={false} marginWidth={0}>
                <Layout type="flex" align="center">
                    <h4 css={typography('h4')}>{vacancyProps.name}</h4>

                    {logo && (
                        <Image
                            src={logo}
                            alt={employerName ?? ''}
                            width={150}
                            height={40}
                            style={{ objectFit: 'contain' }}
                        />
                    )}
                </Layout>

                <Button as="a" theme="secondary" target="_blank" href={vacancyProps.alternate_url} rel="noopener noreferrer">
                    Respond
                </Button>
            </Layout>
            <div css={typography('m')} dangerouslySetInnerHTML={{ __html: vacancyProps.description }} />
            <br />
        </div>
    );
}
