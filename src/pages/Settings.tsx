import { disableWakeLock, requestEnableWakeLock } from '../utils/wakeLock';
import useToast from '../hooks/useToast';
import useSettings from '../hooks/useSettings';
import { routes } from '../constants';

export const path = routes.app.settings.url;


export default function SettingsPage() {

    const toast = useToast();
    const { settings, updateSettings } = useSettings();


    // const [wakeLockEnabled, setWakeLockEnabled] = useState<boolean>(false);


    const toggleWakeLockEnabled = async () => {
        try {
            if(!settings.wakeLock) {
                await requestEnableWakeLock();
            } else {
                await disableWakeLock();
            }
            updateSettings({wakeLock: !settings.wakeLock});
        } catch (e) {
            const _e = e as Error;
            toast.displayToast(_e.message, 2000, 'warn');
        }
    }

    return (
        <div className='h-full w-full flex flex-col justify-between'>
            <div className='flex flex-col'>
                <h2 className='mb-2'>Settings</h2>
                <ul className='h-fit flex flex-col gap-2'>
                    <li className='flex gap-1'>
                        <input 
                            className='mt-0.5'
                            type='checkbox' 
                            checked={settings.retainMusic}
                            onChange={(e) => updateSettings({retainMusic: e.currentTarget.checked})} 
                        />
                        <label>
                            Keep music on reopen
                        </label>
                    </li>
                    <li>
                        <button onClick={toggleWakeLockEnabled}>Wake Lock {settings.wakeLock ? 'On' : 'Off'}</button>
                    </li>
                </ul>
            </div>
            <div className='flex flex-col'>
                <ul className='h-fit flex flex-col gap-2'>
                    <li>
                        <a href="https://checkout.revolut.com/pay/db94d317-bb0b-4f87-9506-854899b05981" target="_blank">Support Development</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}
