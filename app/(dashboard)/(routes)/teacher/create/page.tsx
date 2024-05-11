"use client"

import * as z from "zod";
import axios from "axios";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormLabel,
    FormMessage,
    FormItem
} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import Link from "next/link";
import {Button} from "@/components/ui/button";

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
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 mt-8"
                >
                    <FormField 
                        control={form.control}
                        name="title"
                        render={({ field }) => (
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
                                <FormMessage />
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
                            disabled={!isValid || isSubmitting}
                        >
                            Continue
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default CreatePage;