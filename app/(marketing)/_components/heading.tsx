"use client";

import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

export const Heading = () => {
    return (
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                Registre processos, planos e documentos. Bem vindo ao <span className="underline">Knowledge</span>
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                Knowledge é uma ferramenta de gerenciamento de conhecimento que permite você registrar processos, planos e documentos.
            </h3>
            <Button>
                Comece agora
                <ArrowRightIcon className="w-4 h-4" />
            </Button>
        </div>
    );
};