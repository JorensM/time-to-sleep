type KeyPressHandler = (keyPressed: string) => void




/**
 * keyPress event handler that can be provided to an element's onKeyPress prop
 * and listen to specific key presses
 */
export default function onKeyPress(keys: string | string[], handler: KeyPressHandler) {
    const _keys = Array.isArray(keys) ? keys : [keys];
    return (e: React.KeyboardEvent | KeyboardEvent ) => {
        console.log('key pressed: ', e.key);
        if(_keys.includes(e.key)) handler(e.key);
    }
} 