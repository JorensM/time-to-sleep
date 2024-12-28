import { createContext, PropsWithChildren, useState } from 'react';

export const RouterContext = createContext({
    path: location.pathname,
    //@ts-expect-error placeholder function here
    navigate: (path: string) => {} //eslint-disable-line
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