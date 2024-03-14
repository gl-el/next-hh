import { useRouter } from 'next/router';

export function useUpdateQuery() {
    const { push, query, pathname } = useRouter();
    const updateQuery = (newData: Record<string, string>) => {
        push(
            {
                pathname,
                query: { ...query, ...newData },
            },
            undefined,
            { shallow: true }
        );
    };

    return updateQuery;
}
