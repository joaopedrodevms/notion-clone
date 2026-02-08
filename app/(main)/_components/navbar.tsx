"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { Title } from "./title";


interface NavbarProps {
    isCollapsed: boolean;
    onResetWidth: () => void;
}

export const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {

    const params = useParams();
    const document = useQuery(api.documents.getById, {
        documentId: params.documentId as Id<"documents">,
    });

    if (document === undefined) {
        return (
            <nav className="bg-sidebar px-3 py-2 w-full flex items-center gap-x-4">
                <Title.Skeleton />
            </nav>
        )
    }

    if (document === null) {
        return null;
    }

    return (
        <>
            <nav className="bg-sidebar px-3 py-2 w-full flex items-center gap-x-4">
                {isCollapsed && (
                    <Button onClick={onResetWidth} variant="ghost" size="icon" className="size-6 text-muted-foreground">
                        <MenuIcon />
                    </Button>
                )}
                <div className="flex items-center justify-between w-full">
                    <Title
                        initialData={document}
                    />
                </div>
            </nav>
        </>
    );
};