export const getDates = () => {
    let dates: string[] = []
    const date = new Date()
    let month = (date.getMonth() + 1).toString()
    if (month.toString().length == 1) {
        month = "0" + month
    }
    let year = date.getFullYear().toString()
    for (let day = date.getDate(); day >= 1; day--) {
        if (day.toString().length == 1) {
            dates.push(`0${day}/${month}/${year}`)
        } else {
            dates.push(`${day}/${month}/${year}`)
        }
    }
    return dates
}