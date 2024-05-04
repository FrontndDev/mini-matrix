import { useShowMessage } from "./useShowMessage";
import { baseUrl } from "@/router";

export function useCopyLink(matrixId: string | number, type: string, query = 'uuid') {
    const link = window.location.origin + baseUrl + '/' + type
    const id = `?${query}=${matrixId}`
    navigator.clipboard.writeText(link + id)
    useShowMessage('green', 'Скопировано')
}