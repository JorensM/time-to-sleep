import { Link } from '../router/router';

export const path = '/';

export default function HomePage() {

    return (
        <ul>
            <li>
              <Link href='/affirmations' className='w-full'>Sleep affirmations</Link>
            </li>
        </ul>
    )
}