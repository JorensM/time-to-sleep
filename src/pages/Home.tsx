import { routes } from '../constants';
import { Link } from '../router/router';

export const path = routes.home.url;

export default function HomePage() {

    return (
        <div>
            <main>
                <p>
                    Time To Sleep is a small application that helps you get into the mood
                    for sleeping.
                </p>
                <Link
                    href={routes.app.url}
                >
                    Help me fall asleep
                </Link>
            </main>
        </div>
    )
}