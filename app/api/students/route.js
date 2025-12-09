import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";
import { connect } from "http2";
import { success } from "zod";


// export async function GET() {
//     try{
//         const products = await prisma.product.findMany({
//             include: {
//                 category: true //mengambil semua kolom yang ada ditable category
//             }
//         });
//         return NextResponse.json(products, {status: 201});
//     }catch(error){
//         console.error("Server error", error);
//         return NextResponse.json({error: "Internal Server Error"}, {status: 500})
//     }
    
// }

// export async function GET() {
//     try{
//         const products = await prisma.product.findMany({
//             select: {
//                 name: true,
//                 price: true,
//                 category:{
//                     select: {
//                         name: true,
//                     }
//                 }
//             }
//         });
//         return NextResponse.json(products,{status: 201});
//     }catch(error){
//         console.error("Server error", error);
//         return NextResponse.json({error: "Internal Server Error"},{status:500});
//     }
    
// }

export async function GET() {
    try{
        const kategori = await prisma.category.findMany({
            where: {name: "Siswa"},
            include: {
                students: true //menampilkan array dari tabel student
            }
        });
        return NextResponse.json({
            success: true,
            message: "Student fetched",
            data: kategori
        }, {status: 201});
    }catch(error){
        console.error("Server error", error);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
    
}

export async function POST (request) {
    try{
        const data = await request.json();
        const newStudent = await prisma.student.create({
            data:{
                name: data.name,
                age: data.age,
                class: data.class,
                category: {
                    connect: {
                        id: data.categoryId // id dari kategori yang sudah dibuat
                    }
                } 
            },
        });
        return NextResponse.json({
            success: true,
            message: "Student created",
            data: newStudent
        }, {status: 201});
    }catch(error){
        console.error("Server error", error);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
    
}