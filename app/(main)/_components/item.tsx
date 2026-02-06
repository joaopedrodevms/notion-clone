"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { ChevronDownIcon, ChevronRightIcon, LucideIcon, MoreHorizontal, MoreHorizontalIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useUser } from "@clerk/clerk-react";

interface ItemProps {
    id?: Id<"documents">;
    documentIcon?: string;
    active?: boolean;
    expanded?: boolean;
    isSearch?: boolean;
    level?: number;
    onExpand?: () => void;
    onClick?: () => void;
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

    const { user } = useUser();
    const router = useRouter();
    const create = useMutation(api.documents.create);
    const archive = useMutation(api.documents.archive);

    const onArchive = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        if (!id) return;

        const promise = archive({ id });

        toast.promise(promise, {
            loading: "Movendo documento para a lixeira...",
            success: "Documento movido para a lixeira",
            error: "Erro ao mover documento para a lixeira!",
        });
    }

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
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            onCanPlay={(e) => { e.stopPropagation() }}
                            asChild
                        >
                            <Button variant={"ghost"} className="opacity-0 group-hover:opacity-100 ml-auto size-6">
                                <MoreHorizontalIcon className="text-muted-foreground" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-60"
                            align="start"
                            side="right"
                            forceMount
                        >
                            <DropdownMenuItem onClick={onArchive}>
                                <Trash2Icon className="" />
                                Apagar
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <div className="text-xs text-muted-foreground p-2">
                                Editado por: {user?.fullName}
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <div
                        onClick={onCreate}
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "opacity-0 group-hover:opacity-100 ml-auto size-6",
                        )}>
                        <PlusIcon className="text-muted-foreground" />
                    </div>
                </div>
            )}
        </Button>
    )
}

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
    return (
        <div
            className={cn(
                buttonVariants({ size: "sm", variant: "ghost" }),
                "w-full justify-start"
            )}
            style={{
                paddingLeft: level ? `${(level * 12) + 25}px` : "12px"
            }}
        >
            <Skeleton className="size-5" />
            <Skeleton className="h-5 w-[30%]" />
        </div>
    )
}