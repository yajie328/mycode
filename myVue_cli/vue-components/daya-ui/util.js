const getYearMonthDay = function (date) {
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate()
    return {
        year,
        month,
        day
    }
}
const getDate = function (year, month, day) {
    return new Date(year, month, day);
}
export {
    getYearMonthDay,
    getDate
}