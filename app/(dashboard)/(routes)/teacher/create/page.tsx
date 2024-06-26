"use client"

import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormLabel,
    FormMessage,
    FormItem
} from "@/components/ui/form";
import toast from "react-hot-toast";


const formSchema =z.object({
    title: z.string().min(1, {
        message: "Title is required"
    }),
})

const CreatePage = () => {
    
    const router = useRouter();
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ""
        }
    })
    
    const { isSubmitting, isValid } = form.formState;
    
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            
            // send the form data to the server
            const response = await axios.post("/api/courses", values);
            // redirect to the course page
            router.push(`/teacher/courses/${response.data.id}`)
            
            toast.success("Course created successfully")
            
        } catch (ex) {
            toast.error("An error occurred. Please try again.")
        }
    }
    
    return (
        <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
            <div>
                <h1 className="text-2xl">
                    Name your courses
                </h1>
                <p className="text-sm text-slate-600">
                    What would your like name your course? Don't worry, you can change this later.
                </p>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 mt-8"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Course Title
                                    </FormLabel>
                                    <FormControl>
                                        <input
                                            disabled={isSubmitting}
                                            placeholder="e.g. 'Advanced Web Development'" {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        What will you trach in this course?
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Link href="/">
                                <Button
                                    type="button"
                                    variant="ghost"
                                >
                                    Cancel
                                </Button>
                            </Link>
                            <Button
                                type="submit"
                                disabled={ !isValid || isSubmitting }
                            >
                                Continue
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default CreatePage;