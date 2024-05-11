"use client"

import * as z from "zod";
import axios from "axios";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

const formSchema =z.object({
    title: z.string().min(1, {
        message: "Title is required"
    }),
})

const CreatePage = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ""
        }
    })
    
    const { isSubmitting, isValid } = form.formState;
    
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values)
    }
    
    return (
        <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
            <h1 className="text-2xl">
                Name your courses
            </h1>
            <p className="text-sm text-slate-600">
                What would your like name your course? Don't worry, you can change this later.
            </p>
        </div>
    )
}

export default CreatePage;