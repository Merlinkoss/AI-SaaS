import Image from "next/image"

interface EmptyProps {
    label: string;
}

const Empty = ({
    label
}: EmptyProps) => {
    return (
        <div className="h-full p-10 flex flex-col items-center justify-center">
            <div className="relative h-24 w-24">
                <Image
                    alt="Empty"
                    fill
                    src="/logo.png" />
            </div>
            <p className="text-muted-foreground text-sm text-center mt-10">
                {label}
            </p>
        </div>
    );
};

export default Empty;