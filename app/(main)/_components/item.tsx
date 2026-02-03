"use client";

import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { ChevronDownIcon, ChevronRightIcon, LucideIcon, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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

    const router = useRouter();
    const create = useMutation(api.documents.create);

    const handleExpand = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        onExpand?.();
    }

    const onCreate = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        if (!id) return;

        const promise = create({
            title: "Untitled",
            parentDocument: id
        })
        .then((documentId) => {
            if (!expanded) {
                onExpand?.();
            }
            // router.push(`/documents/${documentId}`);
        });

        toast.promise(promise, {
            loading: "Criando documento...",
            success: "Documento criado com sucesso!",
            error: "Erro ao criar documento!",
        });
    }

    const ChevronIcon = expanded ? ChevronDownIcon : ChevronRightIcon;


    return (
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
                <div onClick={handleExpand}>
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
            {!!id && (
                <div className="ml-auto flex items-center gap-x-2">
                    <div role="button" onClick={onCreate} className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600">
                        <PlusIcon className="size-4 text-muted-foreground"/>
                    </div>
                </div>
            )}
        </Button>
    )
}

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
    return (
        <div
            style={{
                paddingLeft: level ? `${(level * 12) + 25}px` : "12px"
            }}
            className="flex gap-2 py-[3px]"
        >
            <Skeleton className="size-4"/>
            <Skeleton className="h-4 w-[30%]"/>
        </div>
    )
}