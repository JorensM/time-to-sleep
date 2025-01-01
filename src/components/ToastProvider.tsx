import clsx from 'clsx';
import { createContext, PropsWithChildren, useEffect, useState } from 'react'

export const ToastContext = createContext<{
    displayToast: (message: string, timeout?: number, variant?: 'error' | 'success' | 'warn' | 'neutral') => void
} | null >(null);

type ToastVariant = 'error' | 'success' | 'warn' | 'neutral';

let maxID = 0;

type ToastData = {
    id: number,
    message: string,
    timeout: number,
    variant: ToastVariant,
    state: 'visible' | 'hidden'
}

const showTransitionDuration = 700;

export default function ToastProvider( props: PropsWithChildren ) {

    const [toasts, setToasts] = useState<ToastData[]>([]);

    useEffect(() => {
        console.log(toasts);
    }, [toasts]);

    const displayToast = (message: string, timeout = 2000, variant: 'error' | 'success' | 'warn' | 'neutral' = 'neutral') => {
        let id = maxID++;
        setToasts((prevToasts) => [
            ...prevToasts,
            {
                id,
                message,
                timeout,
                variant,
                state: 'hidden'
            }
        ])

        setTimeout(() => {
            setToasts((prevToasts) => prevToasts.map(item => (
                    item.id === id ? {
                        ...item,
                        state: 'visible'
                    } : item
                ))
            )
            setTimeout(() => {
                setTimeout(() => {
                    removeToast(id);
                }, timeout);
            }, showTransitionDuration)
        }, 50)
        

        
    }

    const removeToast = (id: number) => {
        setToasts((prevToasts) => {
            const newToasts = [...prevToasts];
            const toastIndex = newToasts.findIndex(toast => toast.id === id);
            newToasts[toastIndex] = {...newToasts[toastIndex]};
            newToasts[toastIndex].state = 'hidden';
            return newToasts;
        })
        setTimeout(() => {
            setToasts((prevToasts) => prevToasts.filter(toast => toast.id !== id))
        }, showTransitionDuration)
        
    }

    return (
        <ToastContext.Provider
            value={{
                displayToast
            }}
        >
            {props.children}
            {/* Toasts */}
            <ul className='w-dvw h-dvh absolute overflow-hidden top-0 left-0 flex flex-col items-end justify-end pointer-events-none p-8 gap-2'>
                {toasts.map(toast => (
                    <li key={toast.id} className={clsx(
                        'border p-2 min-w-24 text-right rounded-md transition-transfor duration-500',
                        toast.variant === 'neutral' && 'bg-neutral-400 border-neutral-700 text-black',
                        toast.state === 'visible' ? 'translate-x-0' : 'translate-x-[200px]'
                    )}>
                        {toast.message}
                    </li>
                ))}
            </ul>
        </ToastContext.Provider>
    )
}