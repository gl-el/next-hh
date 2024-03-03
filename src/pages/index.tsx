import { QueryClient, dehydrate } from '@tanstack/react-query';

import { getDictionaries, getPositions, getVacancies, getVacanciesDetailed } from '@api/index';

export { default } from '../views/index';

export async function getServerSideProps(context) {
    let page = 1;
    let employmentID = '';
    let positionID = '';

    if (context.query.page) {
        page = Number(context.query.page);
    }

    const dictionaries = await getDictionaries();
    const employments = dictionaries.employment.map(option => ({ value: option.id, label: option.name }));

    if (context.query.employment) {
        employmentID = context.query.employment;
    }

    const data = await getPositions();
    const positions = data.categories
        .map(category => category.roles.map(role => ({ value: role.id, label: role.name })))
        .flat();

    if (context.query.position) {
        positionID = context.query.position;
    }

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['vacancies', {page, employmentID, positionID}],
        queryFn: () => getVacancies({page, employmentID, positionID}),
    });

    return {
        props: { dehydratedState: dehydrate(queryClient), employments, positions },
    };
}
