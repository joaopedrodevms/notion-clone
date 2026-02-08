"use client";

import { ConfirmModal } from "@/components/modal/confirm-modal";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface BannerProps {
    documentId: Id<"documents">;
}

export const Banner = ({ documentId }: BannerProps) => {

    const router = useRouter();
    const remove = useMutation(api.documents.remove);
    const restore = useMutation(api.documents.restore);

    const onRemove = () => {
        const promise = remove({ id: documentId });
        toast.promise(promise, {
            loading: "Apagando documento...",
            success: "Documento apagado com sucesso!",
            error: "Erro ao apagar documento!",
        });
        router.push("/documents");
    }

    const onRestore = () => {
        const promise = restore({ id: documentId });
        toast.promise(promise, {
            loading: "Restaurando documento...",
            success: "Documento restaurado com sucesso!",
            error: "Erro ao restaurar documento!",
        });
    }

    return (
        <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
            <p>
                Este documento está na lixeira.
            </p>
            <Button
                size={"sm"}
                variant={"outline"}
                onClick={onRestore}
                className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
            >
                Restaurar documento
            </Button>
            <ConfirmModal onConfirm={onRemove}>
                <Button
                    size={"sm"}
                    variant={"outline"}
                    className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
                >
                    Apagar documento
                </Button>
            </ConfirmModal>
        </div>
    )

}