"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Hypoallergenic } from "@prisma/client";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { HypoallergenicColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";


interface HypoallergenicClientProps {
    data: HypoallergenicColumn[]

}

export const HypoallergenicClient: React.FC<HypoallergenicClientProps> = ({
    data
}) => {

    const router = useRouter();
    const params = useParams();

    return (
        <>
        <div className="flex items-center justify-between">
            <Heading 
            title={`Hypoallergenics (${data.length})`}
            description="Manage hypoallergenics for your cafe"
            />
            <Button onClick={() => router.push(`/${params.storeId}/hypoallergenics/new`)}>
                <Plus className="mr-2 h-4 w-4" />
                Add New
            </Button>
        </div>
        <Separator />
        <DataTable searchKey="name" columns={columns} data={data}/>
        <Heading title="API" description="API calls for hypoallergenics" />
        <Separator />
        <ApiList entityName="hypoallergenics" entityIdName="hypoallergenicId"/>
        </>
    )
}