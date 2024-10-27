'use client'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateWorkspaceModal } from "../store/use-create-workspace-modal";
import { useCreateWorkspace } from "../api/use-create-workspace";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export const CreateWorkspaceModal = () => {
    const router = useRouter();
    const [name, setName] = useState("")
    const [open, setOpen] = useCreateWorkspaceModal();

    const { mutate, isPending } = useCreateWorkspace()

    const handleClose = () => {
        setOpen(false);
        setName("");
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        mutate({
            name: name
        }, {
            onSuccess(id) {
                toast.success('Workspace created!')
                //redirect to that id
                router.push(`workspace/${id}`);
                handleClose();
            },
            onError(error) {

            }
        })
    }

    return <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add a workspace</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    disabled={isPending}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoFocus
                    minLength={3}
                    placeholder="workspace name e.g. 'work', 'personal', 'home'"
                />
                <div className="flex justify-end">
                    <Button
                        disabled={isPending}
                        type="submit"
                    >Create</Button>
                </div>

            </form>
        </DialogContent>

    </Dialog>
}