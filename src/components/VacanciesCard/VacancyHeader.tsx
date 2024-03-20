import { Layout, scale } from '@greensight/gds';
import Image from 'next/image';

import { Button, MEDIA_QUERIES, typography } from '@scripts/gds';

interface VacancyHeaderProps {
    name: string;
    logo?: string;
    responseUrl: string;
}

export default function VacancyHeader({ name, logo, responseUrl }: VacancyHeaderProps) {
    return (
        <Layout type="flex" align="start" justify="space-between" gap={scale(3, true)} wrap={{ xxxl: false, sm: true }}>
            <Layout.Item>
                <Layout
                    type="flex"
                    align="start"
                    justify="start"
                    gap={{ xxxl: scale(3, true), sm: scale(1) }}
                    css={{
                        flexDirection: 'row',
                        [MEDIA_QUERIES.md]: {
                            flexDirection: 'column-reverse',
                        },
                    }}
                >
                    <Layout.Item>
                        <h4 css={{ ...typography('h4') }}>{name}</h4>
                    </Layout.Item>
                    {logo && (
                        <Layout.Item>
                            <Image
                                src={logo}
                                alt="Company logo"
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{
                                    width: '150px',
                                    height: '40px',
                                    objectFit: 'contain',
                                }}
                            />
                        </Layout.Item>
                    )}
                </Layout>
            </Layout.Item>
            <Layout.Item col={{ sm: '100%' }}>
                <Button as="a" theme="secondary" target="_blank" href={responseUrl} rel="noopener noreferrer" block>
                    Respond
                </Button>
            </Layout.Item>
        </Layout>
    );
}
