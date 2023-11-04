import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { FavoriteClient } from "./components/client";
import { FavoriteColumn } from "./components/columns";

const FavoritesPage = async ({
    params
}: {
    params: { storeId: string }
}) => {
    const favorites = await prismadb.favorite.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedFavorites: FavoriteColumn[] = favorites.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt,"MMMM do, yyyy")
    }));
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
             <FavoriteClient data={formattedFavorites} />
            </div>
        </div>
    );
}


export default FavoritesPage;