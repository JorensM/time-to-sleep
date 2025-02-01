import { 
    AnchorHTMLAttributes, 
    FunctionComponent, 
    KeyboardEvent, 
    PropsWithChildren, 
    useCallback, 
    useContext, 
    useEffect, 
    useMemo ,
    MouseEvent
} from 'react'
import { RouterContext } from './RouterContext'


type Route = {
    path: string | string[],
    default: FunctionComponent
}

type RouterProps = {
    routes: Route[]
}



export const useRouter = () => {
    const context = useContext(RouterContext);

    return context;
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

const keyListener = (keys: string[] | string, listener: () => void) => {
    const _keys = Array.isArray(keys) ? keys : [keys];
    return (e: KeyboardEvent) => {
        if(_keys.includes(e.key)) {
            listener();
        }
    }
}

export function Link( { href, ...props }: LinkProps) {

    const router = useRouter();

    const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        navigate(href);
    }

    const navigate = (href?: string) => {
        if(href) {
            history.pushState(null, '', location.origin + href)
            router.navigate(href);
        }
    }

    return (
        <a
            tabIndex={0}
            onClick={onClick}
            onKeyDown={keyListener('Enter', () => navigate(href))}
            href={href}
            {...props}
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

    const currentRoute = useMemo(() => {
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