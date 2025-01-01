import { useContext } from 'react';
import { ToastContext } from '../components/ToastProvider';

export default function useToast() {
    const context = useContext(ToastContext);

    if(!context) {
        throw new Error('Toast Context not found. Have you added ToastProvider?');
    }

    return {
        displayToast: context.displayToast!
    }
}