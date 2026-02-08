"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader
} from "@/components/ui/dialog";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { useCallback } from "react";
import { SingleImageDropzone } from "../single-image-dropzone";
import { UploaderProvider, UploadFn } from "../uploader-provider";

export const CoverImageModal = () => {

    const params = useParams();
    const update = useMutation(api.documents.update);
    const coverImage = useCoverImage();
    const { edgestore } = useEdgeStore();

    const onClose = () => {
        coverImage.onClose();
    }

    const uploadFn: UploadFn = useCallback(
        async ({ file, onProgressChange, signal }) => {

            let res;

            console.log(coverImage);
            if (coverImage.url) {
                console.log("replace");
                res = await edgestore.publicFiles.upload({
                    file,
                    options: {
                        replaceTargetUrl: coverImage.url,
                    }
                })
            } else {
                res = await edgestore.publicFiles.upload({
                    file,
                    signal,
                    onProgressChange,
                });
            }

            await update({
                id: params.documentId as Id<"documents">,
                coverImage: res.url,
            });

            onClose();

            return res;
        },
        [edgestore, coverImage.url, coverImage.onClose, update, params.documentId],
    );

    return (
        <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
            <DialogContent>
                <DialogHeader>
                    <h2 className="text-center text-lg font-semibold">
                        Cover Image
                    </h2>
                </DialogHeader>
                <UploaderProvider
                    uploadFn={uploadFn}
                    autoUpload
                >
                    <SingleImageDropzone
                        className="w-full outline-none"
                        width={100}
                        height={100}
                        dropzoneOptions={{
                            maxSize: 1024 * 1024 * 1, // 1MB
                        }}
                    />
                </UploaderProvider>
            </DialogContent>
        </Dialog>
    )
}