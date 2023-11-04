import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function GET (
    req: Request,
    { params }: { params: {  favoriteId: string } }
) {
    try {
        
        if(!params.favoriteId){
            return new NextResponse("Favorite ID is required", {status:400});
        }
        
        const favorite = await prismadb.favorite.findUnique({
            where:{
                id: params.favoriteId,
            }
        });

        return NextResponse.json(favorite);
    } catch (error) {
        console.log('[FAVORITE_GET]', error);
        return new NextResponse("Internal Error", {status:500});
    }
};

export async function PATCH (
    req: Request,
    { params }: { params: { storeId: string, favoriteId: string } }
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
        if(!params.favoriteId){
            return new NextResponse("Favorite ID is required", {status:400});
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
        const favorite = await prismadb.favorite.updateMany({
            where:{
                id: params.favoriteId,
            },
            data: {
                name,
                value
            }
        });

        return NextResponse.json(favorite);
    } catch (error) {
        console.log('[FAVORITE_PATCH]', error);
        return new NextResponse("Internal Error", {status:500});
    }
};





export async function DELETE (
    req: Request,
    { params }: { params: { storeId: string, favoriteId: string } }
) {
    try {

        const { userId } = auth();
        
        if(!userId){
            return new NextResponse("Unauthenticated", {status:401});
        }
        
        if(!params.favoriteId){
            return new NextResponse("Favorite ID is required", {status:400});
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
        const favorite = await prismadb.favorite.deleteMany({
            where:{
                id: params.favoriteId,
            }
        });

        return NextResponse.json(favorite);
    } catch (error) {
        console.log('[FAVORITE_DELETE]', error);
        return new NextResponse("Internal Error", {status:500});
    }
};




