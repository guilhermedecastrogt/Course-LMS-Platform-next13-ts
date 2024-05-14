import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server";
import {db} from "@/lib/db";

export async function PATCH(
    req: Request,
    { params } : { params: { courseId: string } }
) {
    try {
        const { userId } = auth();
        if (!userId) return new NextResponse("Unauthorized", { status: 401 });
        
        const{ courseId } = params;
        const values = await req.json();
        
        const course = await db.course.update({
            where: {
                id: courseId,
                userId
            },
            data: {
                ...values,
            }
        })
        
        return NextResponse.json(course);
    } catch (error) {
        console.error("[COURSE_ID]", error);
        return new NextResponse("An error occurred", { status: 500 });
    }
}