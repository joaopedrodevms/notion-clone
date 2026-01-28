import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { LoaderIcon } from "lucide-react";
import { buttonVariants } from "./ui/button";

const spinnerVariants = cva(
    "text-muted-foreground animate-spin",
    {
        variants: {
            size: {
                default: "h-4 w-4",
                sm: "h-2 w-2",
                lg: "h-6 w-6",
                icon: "w-10 w-10",
            },
        },
        defaultVariants: {
            size: "default",
        },
    }
)

interface SpinnerProps extends VariantProps<typeof spinnerVariants> { }

export const Spinner = ({ size }: SpinnerProps) => {
    return (
        <div className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
            <LoaderIcon className={cn(spinnerVariants({ size }))} />
        </div>
    );
};

