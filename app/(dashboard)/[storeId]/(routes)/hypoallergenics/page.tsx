import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { HypoallergenicClient } from "./components/client";
import { HypoallergenicColumn } from "./components/columns";

const HypoallergenicsPage = async ({
    params
}: {
    params: { storeId: string }
}) => {
    const hypoallergenics = await prismadb.hypoallergenic.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedHypoallergenics: HypoallergenicColumn[] = hypoallergenics.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt,"MMMM do, yyyy")
    }));
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
             <HypoallergenicClient data={formattedHypoallergenics} />
            </div>
        </div>
    );
}


export default HypoallergenicsPage;