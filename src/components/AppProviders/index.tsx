import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode, useState } from 'react';

import { VacanciesControlProvider } from '@context/vacanciesControls';

import { ThemeProvider, theme } from '@scripts/gds';

interface AppProvidersProps {
    children: ReactNode;
    dehydratedState: any;
}

function AppProviders({ children, dehydratedState }: AppProvidersProps) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 60 * 5 * 1000,
                        retry: 0,
                    },
                },
            })
    );

    return (
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <Hydrate state={dehydratedState}>
                    <VacanciesControlProvider>
                        {children}
                        <ReactQueryDevtools initialIsOpen={false} />
                    </VacanciesControlProvider>
                </Hydrate>
            </QueryClientProvider>
        </ThemeProvider>
    );
}

export default AppProviders;
