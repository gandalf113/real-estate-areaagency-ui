interface ListingDetailCardProps {
    name: React.ReactNode;
    value: React.ReactNode;
}

const ListingDetailCard = (props: ListingDetailCardProps) => {
    const { name, value } = props;

    return (
        <p className={`flex-ol items-center text-center shadow bg-zinc-50 text-gray-900 p-4 rounded w-full`}>
            <div className={`mb-1`}>{name}</div>
            <div className={`text-2xl`}>{value}</div>
        </p>
    )
}

export default ListingDetailCard;