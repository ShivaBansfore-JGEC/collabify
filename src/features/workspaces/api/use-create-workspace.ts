import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useCallback, useState } from "react";

type RequestTpe = { name: string };
type ResponseType = any | null;

type Options = {
    onSuccess?: (value: ResponseType) => void,
    onError?: (error: Error) => void,
    onSettled?: () => void;
    thorwError?: boolean
}

export const useCreateWorkspace = () => {

    const [data, setData] = useState<ResponseType>(null);
    const [error, setError] = useState<Error | null>(null);
    const [isPending, SetIsPending] = useState<boolean>(false);
    const [isSuccess, SetIsSuccess] = useState<boolean>(false);
    const [isError, SetIsError] = useState<boolean>(false);
    const [isSettled, SetIsSettled] = useState<boolean>(false);

    const mutation = useMutation(api.workspaces.create);


    const mutate = useCallback(async (values: RequestTpe, options: Options) => {
        try {
            setData(null);
            setError(null);
            SetIsPending(true);
            SetIsSuccess(false);
            SetIsSettled(false);
            SetIsError(false);
            const response = await mutation(values);
            options?.onSuccess?.(response);
            return response;
        } catch (error) {
            options?.onError?.(error as Error);
            if (options?.thorwError) {
                throw error;
            }
        } finally {
            SetIsPending(false);
            SetIsSettled(true);
            options?.onSettled?.();
        }

    }, [mutation])

    return {
        mutate,
        data,
        isPending,
        isSuccess
    }

}