const key = "NEKOSTOPTOKEN";
const localStorage = window.localStorage || null

export function getToken(): string {
    if (!localStorage) return ""
    return localStorage.getItem(key) || ""
}

export function setToken(token = "") {
    if (!localStorage) return ""
    if (!token || token == "logout") {
        return localStorage.removeItem(key)
    }
    return localStorage.setItem(key, token)
}