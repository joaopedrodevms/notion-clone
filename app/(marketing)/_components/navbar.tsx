"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import Link from "next/link";
import Logo from "./logo";

const Navbar = () => {

    const scrolled = useScrollTop();

    return (
        <div className={cn(
            "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6",
            scrolled && "shadow-sm"
        )}>
            <Logo />
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
                <AuthLoading>
                    <Spinner />
                </AuthLoading>
                <Authenticated>
                    <Button variant="ghost" size="sm">
                        <Link href="/documents">
                            Entrar
                        </Link>
                    </Button>
                    <Button size={"icon"} variant={"ghost"}>
                        <UserButton />
                    </Button>
                </Authenticated>
                <Unauthenticated>
                    <SignInButton mode="modal">
                        <Button variant="ghost" size="sm">
                            Entrar
                        </Button>
                    </SignInButton>
                    <SignInButton mode="modal">
                        <Button size="sm">
                            Iniciar Gratis
                        </Button>
                    </SignInButton>
                </Unauthenticated>
                <ModeToggle />
            </div>
        </div>
    );
};

export default Navbar;