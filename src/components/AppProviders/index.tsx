import { ReactNode } from 'react';

import { ThemeProvider, theme } from '@scripts/gds';

interface AppProvidersProps {
    children: ReactNode;
}

const AppProviders = ({ children }: AppProvidersProps) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default AppProviders;
