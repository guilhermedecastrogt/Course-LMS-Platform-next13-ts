import {db} from "@/lib/db";
import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import IconBadge from "@/components/icon-badge";
import {LayoutDashboard} from "lucide-react";
import { TitleForm } from "./_components/title-form";
import {Description} from "@radix-ui/react-dialog";
import { DescriptionForm } from "./_components/description-form";

const CourseIdPage =  async ({ params }: {
    params: { courseId: string }
}) => {
    
    const userId = auth();
    
    if (!userId) return redirect("/");
    
    const course = await db.course.findUnique({
        where: {
            id: params.courseId
        }
    })
    
    if(!course) return redirect("/");
    
    const newCourse = {
        TitleForm: course.title,
        DescriptionForm: course.description || undefined,
        imageUrl: course.imageUrl,
        price: course.price,
        categoryId: course.categoryId
    }
    
    const requiredFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryId
    ];
    
    const totalFieds = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;
    
    const completionText = `${completedFields}/${totalFieds} fields completed`;
    
    return (
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1>
                        Course Setup
                    </h1>
                    <span className="text-sm text-slate-700">
                        Complete all fields {completionText}
                    </span>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={LayoutDashboard}/>
                        <h2 className="text-xl">
                            Customize your course
                        </h2>
                    </div>
                    <TitleForm
                        initialData={newCourse}
                        courseId={course.id}
                    />
                    <DescriptionForm
                        initialData={newCourse}
                        courseId={course.id}
                    />
                </div>
            </div>
        </div>
    )
}

export default CourseIdPage;