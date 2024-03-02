import { Container, Layout, scale } from '@greensight/gds';
import Image from 'next/image';

import { VacancyProps } from '@api/common/types';

import { Button, typography } from '@scripts/gds';

export default function VacancieCard({ name, description, alternate_url, employer }: VacancyProps) {
    const logo = employer?.logo_urls?.original;
    const employerName = employer?.name;
    return (
        <div css={{ padding: `${scale(5)}px ${scale(5)}px ${scale(6)}px` }}>
            <Layout
                type={'flex'}
                justify={'space-between'}
                align={'center'}
                direction={'row'}
                wrap={false}
                marginWidth={0}
            >
                <Layout type={'flex'} align={'center'}>
                    <h4 css={typography('h4')}>{name}</h4>

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

                <Button as="a" theme="secondary" target="_blank" href={alternate_url} rel="noopener noreferrer">
                    Respond
                </Button>
            </Layout>
            <div css={typography('m')} dangerouslySetInnerHTML={{ __html: description }}></div>
            <br />
        </div>
    );
}
