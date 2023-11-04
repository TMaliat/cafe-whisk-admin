"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Billboard } from "@prisma/client";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { FavoriteColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";


interface FavoriteClientProps {
    data: FavoriteColumn[]

}

export const FavoriteClient: React.FC<FavoriteClientProps> = ({
    data
}) => {

    const router = useRouter();
    const params = useParams();

    return (
        <>
        <div className="flex items-center justify-between">
            <Heading 
            title={`Favorites (${data.length})`}
            description="Manage favorites for your cafe"
            />
            <Button onClick={() => router.push(`/${params.storeId}/favorites/new`)}>
                <Plus className="mr-2 h-4 w-4" />
                Add New
            </Button>
        </div>
        <Separator />
        <DataTable searchKey="name" columns={columns} data={data}/>
        <Heading title="API" description="API calls for favorites" />
        <Separator />
        <ApiList entityName="favorites" entityIdName="favoriteId"/>
        </>
    )
}