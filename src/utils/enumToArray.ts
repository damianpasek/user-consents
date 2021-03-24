type ValueOf<T> = T[keyof T]

export const enumToArray = <T>(e: T): ValueOf<T>[] => (Object as any).values(e)
