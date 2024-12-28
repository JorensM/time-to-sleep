import { useEffect, useState } from 'react';
import getRandomAffirmation from '../utils/getRandomAffirmation';

export const path = '/affirmations';

export default function AffirmationsPage() {

    const [affirmation, setAffirmation] = 
        useState<null | string>(null); // Latest affirmation
    const [displayedAffirmation, setDisplayedAffirmation] = 
        useState<null | string>(null); // Affirmation that is displayed. Needed
        // for animation
    const [affirmationClassName, setAffirmationClassName] = 
        useState<string>('opacity-0'); // For animation

    useEffect(() => {
        if(!affirmation) { // Initialization (before button has been clicked)
            setAffirmationClassName('opacity-0'); // Make affirmation invisible
            // by default
        } else if (displayedAffirmation) { // If this is not the first affirmation
            setAffirmationClassName('opacity-0'); // Hide previous affirmation
            setTimeout(() => { // After previous affirmation has been hidden,
            // show the new affirmation
                setDisplayedAffirmation(affirmation);
                setAffirmationClassName('opacity-1');
            }, 700);
        } else { // If this is the first affirmation, just show it
            setDisplayedAffirmation(affirmation);
            setAffirmationClassName('opacity-1');
        }
    }, [affirmation]);

    

    const renderAffirmation = () => {
        const newAffirmation = getRandomAffirmation();
        console.log(newAffirmation);
        setAffirmation(getRandomAffirmation());
    }

    return(
        <div className='flex flex-col gap-4 h-full box-border'>
            <div className='flex-grow flex flex-col items-center justify-center text-center'>
                <span className={'transition-opacity duration-700 ' + affirmationClassName}>{displayedAffirmation}</span>
            </div>
            <button
                className='mt-auto'
                onClick={renderAffirmation}
            >
                Get Affirmation
            </button>
        </div>
    )
}