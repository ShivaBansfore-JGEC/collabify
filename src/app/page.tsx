'use client'
import { useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useAuthActions } from "@convex-dev/auth/react";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const { signOut } = useAuthActions();
  const { data, isLoading } = useGetWorkspaces();
  const workspaceId = useMemo(() => data?.[0]?._id, [data]);
  const [open, setOpen] = useCreateWorkspaceModal();

  useEffect(() => {
    if (isLoading) return;
    if (workspaceId) {
      router.replace(`/workspace/${workspaceId}`)
    } else if (!open) {
      console.log('open a modal')
      setOpen(true);
    }
  }, [workspaceId, isLoading, open, setOpen, router])

  return (
    <>
      LoggeIn
      <Button onClick={() => signOut()}>SignOut</Button>
    </>

  );
}
