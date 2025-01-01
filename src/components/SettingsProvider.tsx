// import { createContext, Dispatch, PropsWithChildren, SetStateAction, useCallback, useEffect, useState } from 'react'

// export type Settings = {
//     wakeLock: boolean,
//     retainMusic: boolean,
//     soundsPlaying: string[]
// }





// export const SettingsContext = createContext<SettingsContextData | null>(null);



// export default function SettingsProvider( props: PropsWithChildren ) {

//     const [settings, setSettings] = useState<Settings>(defaultSettings);
    

//     useEffect(() => {
//         console.log('useeffect');
//         const initialSettings = retrieveSettings();
//         // setSettings(initialSettings);
//     }, [])

//     return (
//         <SettingsContext.Provider 
//             value={{
//                 settings,
//                 setSettings
//             }}
//         >
//             {props.children}
//         </SettingsContext.Provider>
//     )
// }