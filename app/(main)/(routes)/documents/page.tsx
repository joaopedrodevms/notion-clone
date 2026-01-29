"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { PlusIcon } from "lucide-react";
import Image from "next/image";

const DocumentsPage = () => {

    const { user } = useUser();

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
            <Button>
                <PlusIcon className="w-4 h-4" />
                Novo Documento
            </Button>
        </div>
    );
};

export default DocumentsPage;