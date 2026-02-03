export const ErrorMessageP = ({ error }: { error: string | undefined }) => {
    if (error) {
        return <p className="text-red-500">{error}</p>;
    }
};