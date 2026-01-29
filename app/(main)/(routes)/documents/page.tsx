"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

const DocumentsPage = () => {

    const { user } = useUser();
    const create = useMutation(api.documents.create);

    const onCreate = () => {
        const promise = create({ title: "Untitled" });
        toast.promise(promise, {
            loading: "Criando documento...",
            success: "Documento criado com sucesso!",
            error: "Erro ao criar documento!",
        });
    }

    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <Image
                src={"/empty-light.png"}
                alt="Empty"
                width={300}
                height={300}
                className="dark:hidden"
            />
            <Image
                src={"/empty-dark.png"}
                alt="Empty"
                width={300}
                height={300}
                className="hidden dark:block"
            />
            <h2 className="text-lg font-medium">
                Olá {user?.firstName}! Bem vindo ao Knowledge
            </h2>
            <Button onClick={onCreate}>
                <PlusIcon className="w-4 h-4" />
                Novo Documento
            </Button>
        </div>
    );
};

export default DocumentsPage;