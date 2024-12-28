import { AnchorHTMLAttributes, Component, createContext, FunctionComponent, HTMLAttributes, KeyboardEvent, PropsWithChildren, useCallback, useContext, useEffect, useMemo } from 'react'
import RouterProvider, { RouterContext } from './RouterContext'


type Route = {
    path: string | string[],
    default: FunctionComponent
}

type RouterProps = {
    routes: Route[]
}



const useRouter = () => {
    const context = useContext(RouterContext);

    return context;
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

const keyListener = (keys: string[] | string, listener: () => void) => {
    let _keys = Array.isArray(keys) ? keys : [keys];
    return (e: KeyboardEvent) => {
        if(keys.includes(e.key)) {
            listener();
        }
    }
}

export function Link( { href, ...props }: LinkProps) {

    const router = useRouter();

    const onClick = () => {
        if(href) {
            history.pushState(null, '', location.origin + href)
            router.navigate(href);
        }
    }

    return (
        <a
            tabIndex={0}
            onClick={onClick}
            onKeyDown={keyListener('Enter', onClick)}
        >
            {props.children}
        </a>
    )
}

// function RouterContext( props: PropsWithChildren) {
//     return (
//         <>
//             {props.children}
//         </>
//     )
// }

const normalizePath = (path: string) => {
    let normalizedPath = path;
    if(normalizedPath.startsWith('/')) {
        normalizedPath = normalizedPath.substring(1);
    }
    return normalizedPath;
}

const arePathsSame = (path1: string, path2: string) => {
    return normalizePath(path1) === normalizePath(path2);
}

const pathsIncludePath = (paths: string | string[], path: string) => {
    if(Array.isArray(paths)) {
        return paths.some(_path => arePathsSame(_path, path));
    } else {
        return arePathsSame(paths, path);
    }
}



export default function Router({ routes }: PropsWithChildren<RouterProps>) {

    const { path, navigate} = useRouter();

    console.log(path);

    const currentRoute = useMemo(() => {
        console.log('path:', path);
        return routes.find(route => pathsIncludePath(route.path, path));
    }, [path]);

    const Page = useMemo(() => {
        return currentRoute?.default || 'span';
    }, [currentRoute]);

    const popStateListener = useCallback((e: PopStateEvent) => {
        e.preventDefault();
        navigate(location.pathname);
    }, []);

    useEffect(() => {
        window.addEventListener('popstate', popStateListener);

        return () => {
            window.removeEventListener('popstate', popStateListener);
        }
    }, []);

    return (
        <>
            {
                currentRoute ? <Page /> : 
                <span>404 not found</span>
            }
        </>
    )
}