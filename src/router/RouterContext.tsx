import { createContext, PropsWithChildren, useState } from 'react';

export const RouterContext = createContext({
    path: location.pathname,
    navigate: (path: string) => {}
})

export default function RouterProvider( props: PropsWithChildren) {

    const [path, setPath] = useState<string>(location.pathname);

    const navigate = (_path: string) => {
        setPath(_path);
    }

    return (
        <RouterContext.Provider value={{
            path,
            navigate
        }}>
            {props.children}
        </RouterContext.Provider>
    )
}