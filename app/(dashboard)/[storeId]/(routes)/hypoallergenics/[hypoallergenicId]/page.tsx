import prismadb from "@/lib/prismadb";
import { HypoallergenicForm } from "./components/hypoallergenic-form";

const HypoallergenicPage = async ({
    params
}: {
   params: { hypoallergenicId: string } 
}) => {
    const hypoallergenic = await prismadb.hypoallergenic.findUnique({
        where: { 
            id: params.hypoallergenicId
        },
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <HypoallergenicForm initialData={hypoallergenic}/>
            </div>
        </div>
    );
}

export default HypoallergenicPage;