import { useEffect, useMemo, useRef, useState } from 'react';
import onKeyPress from '../utils/onKeyPress';
import { routes } from '../constants';

export const path = routes.app.breathing.url;

export default function BreathingExercise() {
    const [currentState, setCurrentState] = useState<'in' | 'out' | 'initial'>('initial');

    // For measuring the time interval for rhythm
    const interval = useRef<NodeJS.Timeout | null>(null);
    const prevPressedTime = useRef<number | null>(null);
    const currPressedTime = useRef<number | null>(null);
    const specifiedInterval = useRef<number | null>(null);

    useEffect(() => {
        return () => {
            if(interval.current) clearInterval(interval.current);
        }
    }, [])

    const displayedText
        = useMemo<string>(() => {
            switch (currentState) {
                case 'in': return 'Breathe in';
                case 'out': return 'Breathe out';
                case 'initial': return 'Tap repeatedly to set a comfortable breathing rhythm';
            }
        }, [currentState]);

    const toggleCurrentState = () => {
        setCurrentState((prevState) => {
            let newState: 'in' | 'out' | 'initial';
            switch(prevState) {
                case 'in':      newState = 'out'; break;
                case 'out':     newState = 'in';  break;
                case 'initial': newState = 'in';  break;
            }
            return newState;
        });
    }

    const adjustRythm = () => {
        if(interval.current) clearInterval(interval.current);
        let newState: 'in' | 'out' | 'initial';
        if(!currPressedTime.current) {
            newState = 'in';
        } else {
            switch(currentState) {
                case 'in':      newState = 'out'; break;
                case 'out':     newState = 'in';  break;
                case 'initial': newState = 'in';  break;
            }
        }
        prevPressedTime.current = currPressedTime.current;
        currPressedTime.current = new Date().getTime();

        if(currPressedTime.current && prevPressedTime.current) {
            console.log('adjusting rhythm');
            specifiedInterval.current = currPressedTime.current - prevPressedTime.current;
            currPressedTime.current = null;
            prevPressedTime.current = null;
            console.log('interval, second: ', specifiedInterval.current / 1000)
            interval.current = setInterval(() => {
                console.log('running interval');
                toggleCurrentState();
            }, specifiedInterval.current)
        }

        setCurrentState(newState);
    }

    useEffect(() => {
        const keyListener = onKeyPress([' ', 'Enter'], adjustRythm);

        document.addEventListener('keydown', keyListener);

        return () => {
            document.removeEventListener('keydown', keyListener);
        }
    })


    return (
        <div 
            onClick={adjustRythm}
            className='flex flex-col items-center text-center justify-center w-full h-full'
        >
            {displayedText}
        </div>
    )
}