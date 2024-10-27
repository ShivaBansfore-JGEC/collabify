'use client'
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id"

const WorkspaceIdPage = () => {
    const workspaceId = useWorkspaceId();
    const { data } = useGetWorkspace({ id: workspaceId });
    console.log({ data })

    return (
        <div>
            data: {JSON.stringify(data)}
        </div>
    )

}

export default WorkspaceIdPage;