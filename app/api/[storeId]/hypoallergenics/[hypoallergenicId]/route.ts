import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function GET (
    req: Request,
    { params }: { params: {  hypoallergenicId: string } }
) {
    try {
        
        if(!params.hypoallergenicId){
            return new NextResponse("Hypoallergenic ID is required", {status:400});
        }
        
        const hypoallergenic = await prismadb.hypoallergenic.findUnique({
            where:{
                id: params.hypoallergenicId,
            }
        });

        return NextResponse.json(hypoallergenic);
    } catch (error) {
        console.log('[HYPOALLERGENIC_GET]', error);
        return new NextResponse("Internal Error", {status:500});
    }
};

export async function PATCH (
    req: Request,
    { params }: { params: { storeId: string, hypoallergenicId: string } }
) {
    try {

        const { userId } = auth();
        const body= await req.json();
        const { name,value } = body;
        if(!userId){
            return new NextResponse("Unauthenticated", {status:401});
        }
        if(!name){
            return new NextResponse("Name is required", {status:400});
        }
        if(!value){
            return new NextResponse("Value is required", {status:400});
        }
        if(!params.hypoallergenicId){
            return new NextResponse("Hypoallergenic ID is required", {status:400});
        }
        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });

        if(!storeByUserId){
            return new NextResponse("Unauthorized", { status : 403});
        }
        const hypoallergenic = await prismadb.hypoallergenic.updateMany({
            where:{
                id: params.hypoallergenicId,
            },
            data: {
                name,
                value
            }
        });

        return NextResponse.json(hypoallergenic);
    } catch (error) {
        console.log('[HYPOALLERGENIC_PATCH]', error);
        return new NextResponse("Internal Error", {status:500});
    }
};





export async function DELETE (
    req: Request,
    { params }: { params: { storeId: string, hypoallergenicId: string } }
) {
    try {

        const { userId } = auth();
        
        if(!userId){
            return new NextResponse("Unauthenticated", {status:401});
        }
        
        if(!params.hypoallergenicId){
            return new NextResponse("Hypoallergenic ID is required", {status:400});
        }
        
        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });

        if(!storeByUserId){
            return new NextResponse("Unauthorized", { status : 403});
        }
        const hypoallergenic = await prismadb.hypoallergenic.deleteMany({
            where:{
                id: params.hypoallergenicId,
            }
        });

        return NextResponse.json(hypoallergenic);
    } catch (error) {
        console.log('[HYPOALLERGENIC_DELETE]', error);
        return new NextResponse("Internal Error", {status:500});
    }
};




