import { Layout, scale } from '@greensight/gds';
import Image from 'next/image';

import { useVacancy } from '@api/vacancy/useVacancy';

import { VacancyCardProps } from '@components/VacancieCard/types';

import { Button, typography } from '@scripts/gds';

export default function VacancieCard(vacancyProps: VacancyCardProps) {
    const { data, isLoading, isError } = useVacancy(vacancyProps);
    const logo = data?.employer?.logo_urls?.original;
    const employerName = data?.employer?.name;
    if (isLoading) {
        return <p>Loading..</p>;
    }
    if (isError) {
        return <p>Error occured during getting vacancy data</p>;
    }
    return (
        <div css={{ padding: `${scale(5)}px ${scale(5)}px ${scale(6)}px` }}>
            <Layout type="flex" justify="space-between" align="center" direction="row" wrap={false} marginWidth={0}>
                <Layout type="flex" align="center">
                    <h4 css={typography('h4')}>{data.name}</h4>

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

                <Button as="a" theme="secondary" target="_blank" href={data.alternate_url} rel="noopener noreferrer">
                    Respond
                </Button>
            </Layout>
            <div css={typography('m')} dangerouslySetInnerHTML={{ __html: data.description }} />
            <br />
        </div>
    );
}
