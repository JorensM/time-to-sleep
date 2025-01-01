

export const wakeLockSupported = 'wakeLock' in navigator;

let wakeLock: WakeLockSentinel | null = null;

export async function requestEnableWakeLock() {
    if(wakeLockSupported) {
        wakeLock = await navigator.wakeLock.request("screen");
    } else {
        throw new Error('Wake Lock not supported');
    }
}

export async function disableWakeLock() {
    if(wakeLock) {
        await wakeLock.release();
        wakeLock = null;
    }
}