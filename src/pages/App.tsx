import { routes } from '../constants';
import { Link } from '../router/router';

export const path = routes.app.url;

export default function AppPage() {

    return (
        <ul>
            <li>
                <Link href={routes.app.affirmations.url} className='w-full'>Sleep affirmations</Link>
            </li>
            <li>
                <Link href={routes.app.sound.url} className='w-full'>Sound</Link>
            </li>
            <li>
                <Link href={routes.app.breathing.url} className='w-full'>Breathing exercise</Link>
            </li>
        </ul>
    )
}