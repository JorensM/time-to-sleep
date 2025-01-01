import { useState } from 'react';
import { disableWakeLock, requestEnableWakeLock } from '../utils/wakeLock';
import useToast from '../hooks/useToast';

export const path = '/settings';


export default function SettingsPage() {

    const toast = useToast();
    // const settings = useSettings();


    const [wakeLockEnabled, setWakeLockEnabled] = useState<boolean>(false);


    const toggleWakeLockEnabled = async () => {
        try {
            if(!wakeLockEnabled) {
                await requestEnableWakeLock();
            } else {
                await disableWakeLock();
            }
            setWakeLockEnabled(!wakeLockEnabled);
        } catch (e) {
            toast.displayToast(e.message, 2000, 'warn');
        }
    }

    return (
        <div className='h-full w-full flex flex-col justify-between'>
            <h2>Settings</h2>
            <ul className='mt-auto h-fit'>
                <li>
                    <button onClick={toggleWakeLockEnabled}>Wake Lock {wakeLockEnabled ? 'On' : 'Off'}</button>
                </li>
            </ul>
        </div>
    )
}