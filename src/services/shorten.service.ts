export const shorten = (param: string) => {
    if (param) {
        return param.length > 24 ? param.slice(0, 23).concat("...") : param
    } else {
        return undefined
    }
}