export const urlCheck = (url:string) => {
    const urlPattern = /^(https?:\/\/)?([\w.]+\.[a-z]{2,})(:\d{1,5})?(\/\S*)?$/i
    return urlPattern.test(url)
}