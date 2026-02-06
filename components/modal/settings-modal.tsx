"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useSettings } from "@/hooks/use-settings";
import { Label } from "../ui/label";
import { ModeToggle } from "../mode-toggle";
import { useState } from "react";

export const SettingsModal = () => {

    const settings = useSettings();
    const [isMounted, setIsMounted] = useState(false);

    return (
        <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
            <DialogContent>
                <DialogHeader className="border-b pb-3">
                    <DialogTitle>Configurações</DialogTitle>
                </DialogHeader>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <Label>Aparencia</Label>
                        <span className="text-[0.8rem] text-muted-foreground">
                            Customize a aparência do seu Knowledge.
                        </span>
                    </div>
                    <ModeToggle />
                </div>
            </DialogContent>
        </Dialog>
    )
}