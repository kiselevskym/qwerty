function getLocalStorage(key: string) {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : null
}

function setLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
}

function useLocalStorage() {
    return {getLocalStorage, setLocalStorage}
}

export default useLocalStorage
