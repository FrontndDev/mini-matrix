export function useMyOverlay(html: string, callback1?: object, callback2?: object) {
    // @ts-ignore
    MY_OVERLAY.active(html, callback1, callback2)
}