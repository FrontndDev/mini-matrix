import { useShowMessage } from "./useShowMessage.ts";

export function useCopy(any: string | number) {
    navigator.clipboard.writeText(String(any))
    useShowMessage('green', 'Скопировано')
}