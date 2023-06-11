export const getDateNow = () => {
    const date = new Date()
    let day = date.getDay().toString()
    if (day.toString().length == 1) {
        day = "0" + day
    }
    let month = (date.getMonth() + 1).toString()
    if (month.toString().length == 1) {
        month = "0" + month
    }
    let year = date.getFullYear().toString()
    return `${day}/${month}/${year}`
}