export function useGetLevel(lvl: string | number) {
    // @ts-ignore
    return +lvl - +(window.UserData.level ?? 0)
}