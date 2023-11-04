import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST (
    req: Request,
    { params }: { params: { storeId: string }}
){
    try {
        const { userId } = auth();
        const body = await req.json();
        const { 
            name,
            price,
            categoryId,
            favoriteId,
            hypoallergenicId,
            isFeatured,
            isOutOfStock,
            images
         } = body;
        if(!userId) {
            return new NextResponse("Unauthenticated", { status:401});
        }

        if(!name) {
            return new NextResponse("Name is required", { status:400});
        }
        
        if(!images || !images.length) {
            return new NextResponse("Iamges are required", { status:400});
        }

        if(!price) {
            return new NextResponse("Price is required", { status:400});
        }

        if(!categoryId) {
            return new NextResponse("Category ID is required", { status:400});
        }
        
        if(!favoriteId) {
            return new NextResponse("Favorite ID is required", { status:400});
        }

        if(!hypoallergenicId) {
            return new NextResponse("Hypoallergenic ID is required", { status:400});
        }

        

        if(!params.storeId) {
            return new NextResponse("Store ID is required", {status: 400});
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

        const product = await prismadb.product.create({
            data: {
                name,
                price,
                isFeatured,
                isOutOfStock,
                categoryId,
                favoriteId,
                hypoallergenicId,
                storeId: params.storeId,
                images : {
                    createMany: {
                        data: [
                            ...images.map((image: { url: string}) => image )
                        ]
                    }
                }
            }
        });

        return NextResponse.json(product);


    } catch (error) {
        console.log('[PRODUCTS_POST]',error);
        return new NextResponse("Internal error", { status: 500});
    }
};





export async function GET (
    req: Request,
    { params }: { params: { storeId: string }}
){
    try {
        const { searchParams } = new URL(req.url);
        const categoryId = searchParams.get("categoryId") || undefined;
        const favoriteId = searchParams.get("favoriteId") || undefined;
        const hypoallergenicId = searchParams.get("hypoallergenicId") || undefined;
        const isFeatured = searchParams.get("isFeatured") ;
        if(!params.storeId) {
            return new NextResponse("Store ID is required", {status: 400});
        }


        const products = await prismadb.product.findMany({
            where: {
                storeId: params.storeId,
                categoryId,
                favoriteId,
                hypoallergenicId,
                isFeatured: isFeatured ? true : undefined  ,
                isOutOfStock: false
            },
            include:{
                images: true,
                category: true,
                favorite: true,
                hypoallergenic: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(products);


    } catch (error) {
        console.log('[PRODUCTS_GET]',error);
        return new NextResponse("Internal error", { status: 500});
    }
};