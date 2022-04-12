function useWindowOpen(link: string) {
    const onShowClickHandler = () => window.open(link, 'popup', 'popup')
    return onShowClickHandler
}

export default useWindowOpen
