"use client";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { Unauthenticated, useConvexAuth, AuthLoading, Authenticated } from "convex/react";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export const Heading = () => {

    const { isAuthenticated, isLoading } = useConvexAuth();

    return (
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                Registre processos, planos e documentos. Bem vindo ao <span className="underline">Knowledge</span>
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                Knowledge é uma ferramenta de gerenciamento de conhecimento que permite você registrar processos, planos e documentos.
            </h3>
            <AuthLoading>
                <div className="w-full flex items-center justify-center">
                    <Spinner />
                </div>
            </AuthLoading>
            <Authenticated>
                <Button asChild>
                    <Link href="/documents">
                        Entrar
                        <ArrowRightIcon className="w-4 h-4" />
                    </Link>
                </Button>
            </Authenticated>
            <Unauthenticated>
                <SignInButton mode="modal">
                    <Button>
                        Comece agora
                        <ArrowRightIcon className="w-4 h-4" />
                    </Button>
                </SignInButton>
            </Unauthenticated>
        </div>
    );
};