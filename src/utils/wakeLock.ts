

export const wakeLockSupported = 'wakeLock' in navigator;

export async function requestEnableWakeLock() {
    if(wakeLockSupported) {
        await navigator.wakeLock.request("screen");
    } else {
        throw new Error('Wake Lock not supported');
    }
}

export function disableWakeLock() {

}