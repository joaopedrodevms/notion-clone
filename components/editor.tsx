"use client";

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";
import { useTheme } from "next-themes";

import * as Button from "@/components/ui/button"
import * as Select from "@/components/ui/select"
import { useEdgeStore } from "@/lib/edgestore";

interface EditorProps {
    onChange: (value: string) => void;
    initialContent?: string;
    editable?: boolean;
}

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {

    const { resolvedTheme } = useTheme();
    const { edgestore } = useEdgeStore();

    const handleUpload = async (file: File) => {
        const response = await edgestore.publicFiles.upload({
            file
        })
        return response.url;
    }

    const editor = useCreateBlockNote({
        editable: editable,
        initialContent:
            initialContent ?
                JSON.parse(initialContent) :
                undefined,
        // handleUpload: handleUpload
    });


    return (
        <div className="">
            <BlockNoteView
                editor={editor}
                theme={resolvedTheme === "dark" ? "dark" : "light"}
                onChange={() => { onChange(JSON.stringify(editor.document)) }}
                onUpload={handleUpload}
            />
        </div>
    )
}

export default Editor;