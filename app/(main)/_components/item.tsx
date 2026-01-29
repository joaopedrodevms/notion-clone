"use client";

import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronRightIcon, LucideIcon } from "lucide-react";

interface ItemProps {
    id?: Id<"documents">;
    documentIcon?: string;
    active?: boolean;
    expanded?: boolean;
    isSearch?: boolean;
    level?: number;
    onExpand?: () => void;
    onClick: () => void;
    label: string;
    icon: LucideIcon;
}

export const Item = ({
    id,
    documentIcon,
    active,
    expanded,
    isSearch,
    level = 0,
    onExpand,
    onClick,
    label,
    icon: Icon
}: ItemProps) => {


    const ChevronIcon = expanded ? ChevronDownIcon : ChevronRightIcon;


    return (
        // <div
        //     onClick={onClick}
        //     role="button"
        //     style={{ paddingLeft: "12px" }}
        //     className="group min-h-[27px] text-sm py- 1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium"
        // >
        //     <Icon className="shrink-0 size-5 mr-2 text-muted-foreground" />
        //     <span className="truncate">
        //         {label}
        //     </span>
        // </div>
        <Button
            onClick={onClick}
            variant={"ghost"}
            style={{
                paddingLeft: level ? `${(level * 12) + 12}px` : "12px"
            }}
            className={cn(
                "group w-full justify-start",
                active && "bg-primary/2 text-primary"
            )}
        >
            {!!id && (
                <div onClick={() => { }}>
                    <ChevronIcon className="size-4 shrink-0 text-muted-foreground" />
                </div>
            )}
            {documentIcon ? (
                <div className="shrink-0 mr-2">
                    {documentIcon}
                </div>
            ) : (
                <Icon className="shrink-0 size-4 text-muted-foreground" />
            )}
            <span className="truncate">
                {label}
            </span>
            {isSearch && (
                <Kbd className="ml-auto">Ctrl + K</Kbd>
            )}
        </Button>
    )
}