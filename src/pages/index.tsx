import { QueryClient, dehydrate } from '@tanstack/react-query';

import { getEmployments, getPositions, getVacancies } from '@api/index';

export { default } from '../views/index';

interface ServerSideContextProps {
    query: {
        page?: string;
        employment?: string;
        position?: string;
    };
}

export async function getServerSideProps(context: ServerSideContextProps) {
    let page = 1;
    let employmentID = '';
    let positionID = '';

    if (context.query.page) {
        page = Number(context.query.page);
    }

    const employments = await getEmployments();

    if (context.query.employment) {
        employmentID = context.query.employment;
    }

    const positions = await getPositions();

    if (context.query.position) {
        positionID = context.query.position;
    }

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['vacancies', { page, employmentID, positionID }],
        queryFn: () => getVacancies({ page, employmentID, positionID }),
    });

    return {
        props: { dehydratedState: dehydrate(queryClient), employments, positions },
    };
}
