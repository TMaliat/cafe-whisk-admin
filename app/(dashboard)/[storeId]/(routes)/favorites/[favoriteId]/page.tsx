import prismadb from "@/lib/prismadb";
import { FavoriteForm } from "./components/favorite-form";

const FavoritePage = async ({
    params
}: {
   params: { favoriteId: string } 
}) => {
    const favorite = await prismadb.favorite.findUnique({
        where: { 
            id: params.favoriteId
        },
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <FavoriteForm initialData={favorite}/>
            </div>
        </div>
    );
}

export default FavoritePage;