// eslint-disable-next-line
export default function debounce<Args extends any[]>(fn: (...args: Args) => void, timeout: number) {
    let _timeout: NodeJS.Timeout;
    return (...args: Args) => {
        clearTimeout(_timeout);
        _timeout = setTimeout(() => {
            fn(...args);
        }, timeout)
    }
}