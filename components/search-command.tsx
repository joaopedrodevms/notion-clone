"use client";

import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { api } from "@/convex/_generated/api";
import { useSearch } from "@/hooks/use-search";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { FileIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const SearchCommand = () => {

    const { user } = useUser();
    const router = useRouter();
    const documents = useQuery(api.documents.getSearch);

    const [isMounded, setIsMounded] = useState(false);

    const toggle = useSearch((store) => store.toggle);
    const isOpen = useSearch((store) => store.isOpen);
    const onClose = useSearch((store) => store.onClose);

    useEffect(() => {
        setIsMounded(true);
    }, []);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                toggle();
            }
        }
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [toggle])

    const onSelect = (id: string) => {
        router.push(`/documents/${id}`);
        onClose();
    }

    if (!isMounded) return null;

    return (
        <CommandDialog
            open={isOpen}
            onOpenChange={onClose}
        >
            <CommandInput placeholder="Pesquisar" />
            <CommandList>
                <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
                <CommandGroup heading="Documentos">
                    {documents?.map(documents => (
                        <CommandItem
                            key={documents._id}
                            value={`${documents._id}-${documents.title}`}
                            title={documents.title}
                            onSelect={onSelect}
                        >
                            {documents.icon ? (
                                <p className="text-[18px]">
                                    {documents.icon}
                                </p>
                            ) : (
                                <FileIcon className="size-4 mr-2" />
                            )}
                            <span>{documents.title}</span>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )

}