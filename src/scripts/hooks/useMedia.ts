import { useTheme } from '@scripts/gds';

const defaultMediaQueries = {
    xxxl: '',
    xxl: '',
    xl: '',
    lg: '',
    md: '',
    sm: '',
    xs: '',
    xxs: '',
    xxxs: '',
};

export function useMedia() {
    const { layout } = useTheme();
    if (layout) {
        return Object.entries(layout.breakpoints).reduce(
            (acc, [key, value]) => ({
                ...acc,
                [key]: `@media (max-width: ${value}px)`,
            }),
            defaultMediaQueries
        );
    }
    return defaultMediaQueries;
}
