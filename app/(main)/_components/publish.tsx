"use client";

import { Doc } from "@/convex/_generated/dataModel";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useOrigin } from "@/hooks/use-origin";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CheckIcon, CopyIcon, GlobeIcon } from "lucide-react";

interface PublishProps {
    initialData: Doc<"documents">;
}

export const Publish = ({ initialData }: PublishProps) => {

    const origin = useOrigin();
    const update = useMutation(api.documents.update);

    const [copied, setCopied] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const url = `${origin}/preview/${initialData._id}`;

    const onPublish = () => {
        setIsSubmitting(true);
        const promise = update({
            id: initialData._id,
            isPublished: true,
        }).finally(() => setIsSubmitting(false));
        toast.promise(promise, {
            loading: "Publicando documento...",
            success: "Documento publicado com sucesso!",
            error: "Erro ao publicar documento!",
        });
    }

    const onUnpublish = () => {
        setIsSubmitting(true);
        const promise = update({
            id: initialData._id,
            isPublished: false,
        }).finally(() => setIsSubmitting(false));
        toast.promise(promise, {
            loading: "Despublicando documento...",
            success: "Documento despublicado com sucesso!",
            error: "Erro ao despublicar documento!",
        });
    }

    const onCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000);
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button size={"sm"} variant={"ghost"}>
                    Publicar
                    {initialData.isPublished && (
                        <GlobeIcon className="text-sky-500 size-4" />
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>
                {initialData.isPublished ? (
                    <div className="space-y-4">
                        <div className="flex items-center gap-x-2">
                            <GlobeIcon className="text-sky-500 animate-pulse size-4" />
                            <p className="text-xs font-medium text-sky-500">
                                Este documento está publicado.
                            </p>
                        </div>
                        <div className="flex items-center">
                            <input 
                                className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
                                value={url}
                                disabled
                            />
                            <Button onClick={onCopy} disabled={copied} className="h-8 rounded-l-none">
                                {copied ? (
                                    <CheckIcon className="size-4" />
                                ) : (
                                    <CopyIcon className="size-4" />
                                )}
                            </Button>
                        </div>
                        <Button size={"sm"} className="w-full text-xs" disabled={isSubmitting} onClick={onUnpublish}>
                            Despublicar
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center">
                        <GlobeIcon className="size-8 text-muted-foreground" />
                        <p className="text-sm font-medium mb-2">
                            Publicar este documento
                        </p>
                        <p className="text-xs text-muted-foreground mb-4">
                            Compartilhe seu documento com outros usuários
                        </p>
                        <Button disabled={isSubmitting} onClick={onPublish} className="w-full text-xs" size={"sm"}>
                            Publicar
                        </Button>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    )
}