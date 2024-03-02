import { QueryClient, dehydrate } from '@tanstack/react-query';

import { getDictionaries, getPositions, getVacancies, getVacancy } from '@api/index';

export { default } from '../views/index';

export async function getServerSideProps(context) {
    let page = 1;
    let employmentID = '';
    let positionID = '';

    if (context.query.page) {
        page = Number(context.query.page);
    }

    const dictionaries = await getDictionaries();
    const employments = dictionaries.employment.map(option => {
        return { value: option.id, label: option.name };
    });

    if (context.query.employment) {
        employmentID = context.query.employment;
    }

    const data = await getPositions();
    const positions = data.categories
        .map(category => {
            return category.roles.map(role => {
                return { value: role.id, label: role.name };
            });
        })
        .flat();

    if (context.query.position) {
        positionID = context.query.position;
    }

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['vacancies', page, employmentID, positionID],
        queryFn: async () => {
            const data = await getVacancies({ page, employmentID, positionID });
            const pageCount = data?.pages ?? 0;
            const vacanciesID = data.items.map(item => {
                return item.id;
            });
            const vacancies = await Promise.all(vacanciesID.map(id => getVacancy(id)));
            return { vacancies, pageCount };
        },
    });

    return {
        props: { dehydratedState: dehydrate(queryClient), employments, positions },
    };
}
