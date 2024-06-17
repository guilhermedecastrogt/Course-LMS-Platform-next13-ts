import {PriceForm} from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/price-form";

export const formatPrice = (PriceForm: number) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        "currency": "USD"   
    }).format(PriceForm)
}