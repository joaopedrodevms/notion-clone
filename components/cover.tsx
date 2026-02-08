"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useCoverImage } from "@/hooks/use-cover-image";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { ImageIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Button } from "./ui/button";
import { useEdgeStore } from "@/lib/edgestore";

interface CoverProps {
    url?: string;
    preview?: boolean;
}

export const Cover = ({ url, preview }: CoverProps) => {

    const { edgestore } = useEdgeStore();
    const params = useParams();
    const coverImage = useCoverImage();
    const remove = useMutation(api.documents.removeCoverImage);

    const onRemove = async () => {
        if (url) {
            await edgestore.publicFiles.delete({
                url: url,
            })
        }
        remove({
            id: params.documentId as Id<"documents">,
        });
    }

    return (
        <div
            className={cn(
                "relative w-full h-[35vh] group",
                !url && "h-[12vh]",
                url && "bg-muted"
            )}
        >
            {!!url && (
                <Image
                    src={url}
                    fill
                    alt="Cover"
                    className="object-cover"
                />
            )}
            {url && !preview && (
                <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
                    <Button
                        onClick={() => coverImage.onReplace(url)}
                        className="text-muted-foreground text-xs"
                        variant="secondary"
                        size="sm"
                    >
                        <ImageIcon className="size-4" />
                        Alterar Imagem
                    </Button>
                    <Button
                        onClick={onRemove}
                        className="text-muted-foreground text-xs"
                        variant="secondary"
                        size="sm"
                    >
                        <XIcon className="size-4" />
                        Remover
                    </Button>
                </div>
            )}
        </div>
    )
}