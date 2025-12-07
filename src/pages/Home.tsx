import { routes } from '../constants';
import { Link } from '../router/router';

export const path = routes.home.url;

export default function HomePage() {

    return (
        <div>
            <main>
                <h1>Get yourself in the mood for sleep</h1>
                <p>
                    Time To Sleep is a small application that helps you get into the mood
                    for sleeping.
                </p>
<p>Listen to soothing sounds like rain or piano, do sleep affirmations or breathing exercises</p>
                <Link
                    href={routes.app.url}
                >
                    Help me fall asleep
                </Link>
            </main>
        </div>
    )
}