import { NextResponse } from "next/server";
import { disconnect } from "process";
import { success } from "zod";

export async function PUT(request, {params}) {
    try{
        const resolvedParams= await params;
        const idStudent = parseInt(resolvedParams.id);

        const data = await request.json();

        //1.siapkan objek data untuk update
        let updateData = {
            name: data.name,
            age: data.age,
            class: data.class
        };
        //2. logika disconnect
        if(data.hapusKategori==true){
            updateData.category={
                disconnect: true
            };
        }
        else if(data.categoryId){
            updateData.category={
                connect:{
                    id: data.categoryId
                }
            };
        }
        //3.update data
        const updateStudent = await prisma.student.update({
            where: {id: idStudent},
            data: updateData,
            include: {
                category: true
            }
        });
        return NextResponse.json(
            {
                success: true,
                message: "Produk berhasil diupdate",
                data: updateStudent
            },
            {status: 200}
        );
    }catch(error){
        console.error("Server Error", error);
        return NextResponse.json({error: "Internal Server Error"}, {status:500})
    }
    
}

export async function DELETE(request, {params}) {
    try{
        const resolvedParams= await params;
        const id = parseInt(resolvedParams.id);
        // const id =parseInt(params.id);
        const deletedStudent = await prisma.student.delete({
            where: {id}
        });

        return NextResponse.json({
            success: true,
            message: "List terhapus",
            data: deletedStudent
        });
    }catch(error){
        console.error("Error DELETE /api/student/[id]:",error);

        return NextResponse.json({
            success: false,
            error: "Gagal menghapus list",
            code: 500
        }, {status: 500});
    }
    
}