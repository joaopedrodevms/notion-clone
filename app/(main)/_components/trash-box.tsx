"use client";

import { ConfirmModal } from "@/components/modal/confirm-modal";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useMutation, usePaginatedQuery_experimental, useQuery } from "convex/react";
import { SearchIcon, Trash2Icon, UndoIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const TrashBox = () => {

    const router = useRouter();
    const params = useParams();
    const documents = useQuery(api.documents.getTrash);
    const restore = useMutation(api.documents.restore);
    const remove = useMutation(api.documents.remove);

    const [search, setSearch] = useState("");

    const filteredDocuments = documents?.filter((document) => {
        return document.title.toLowerCase().includes(search.toLowerCase());
    });

    const onClick = (documentId: string) => {
        router.push(`/documents/${documentId}`);
    };

    const onRestore = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        documentId: Id<"documents">,
    ) => {
        event.stopPropagation();
        const promise = restore({ id: documentId });
        toast.promise(promise, {
            loading: "Restaurando documento...",
            success: "Documento restaurado com sucesso!",
            error: "Erro ao restaurar documento!",
        });
    }


    const onRemove = (
        documentId: Id<"documents">,
    ) => {
        const promise = remove({ id: documentId });
        toast.promise(promise, {
            loading: "Apagando documento...",
            success: "Documento apagado com sucesso!",
            error: "Erro ao apagar documento!",
        });

        if (params.documentId === documentId) {
            router.push("/documents");
        }
    };

    if (documents === undefined) {
        return (
            <div className="h-full flex items-center justify-center p-4">
                <Spinner />
            </div>
        )
    }

    return (
        <div className="text-sm">
            <div className="flex items-center gap-x-1 p-2">
                <SearchIcon className="size-4" />
                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
                    placeholder="Filtrar por título"
                />
            </div>
            <div className="mt-2 px-1 pb-1">
                {filteredDocuments?.length === 0 && (
                    <p className="text-xs text-center text-muted-foreground pb-2">
                        Nenhum documento encontrado
                    </p>
                )}
                <div className="flex flex-col">
                    {filteredDocuments?.map((document) => (
                        <div
                            key={document._id}
                            onClick={() => onClick(document._id)}

                            className={cn(buttonVariants({ size: "sm", variant: "ghost" }), "justify-between")}
                        >
                            <span className="truncate pl-2">{document.title}</span>
                            <div className="flex items-center">
                                <Button
                                    size={"sm"}
                                    variant={"ghost"}
                                    onClick={(e) => onRestore(e, document._id)}
                                    className="rounded-sm p-2 hover:bg-neutral-200"
                                >
                                    <UndoIcon className="size-4 text-muted-foreground" />
                                </Button>
                                <ConfirmModal onConfirm={() => onRemove(document._id)}>
                                    <Button
                                        size={"sm"}
                                        variant={"ghost"}
                                        className="rounded-sm p-2 hover:bg-neutral-200"
                                    >
                                        <Trash2Icon className="size-4 text-muted-foreground" />
                                    </Button>
                                </ConfirmModal>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}