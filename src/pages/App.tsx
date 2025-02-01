import { routes } from '../constants';
import { Link } from '../router/router';

export const path = routes.app.url;

export default function AppPage() {

    return (
        <ul>
            <li>
                <Link href='/affirmations' className='w-full'>Sleep affirmations</Link>
            </li>
            <li>
                <Link href='/sound' className='w-full'>Sound</Link>
            </li>
            <li>
                <Link href='/breathing' className='w-full'>Breathing exercise</Link>
            </li>
        </ul>
    )
}