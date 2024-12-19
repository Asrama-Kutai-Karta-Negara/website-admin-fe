import Provider from "@components/provider";

export default function Container({
    children,
}: Readonly<{
    children: React.ReactNode;
}>
) {
    return (
        <div className="flex ">
            <Provider>
                <div className="p-[24px]">
                    {children}
                </div>
            </Provider>
        </div>
    )
}