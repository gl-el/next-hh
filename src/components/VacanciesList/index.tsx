import { scale } from '@greensight/gds';

export default function VacanciesList<T>({
    items,
    render,
}: {
    items: T[] | undefined;
    render: (arg0: T) => JSX.Element;
}) {
    return (
        <div
            css={{
                marginTop: scale(4),
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: scale(4),
            }}
        >
            {items?.map(render)}
        </div>
    );
}
