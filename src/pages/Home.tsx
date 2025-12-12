import { routes } from '../constants';
import { Link } from '../router/router';

export const path = routes.home.url;

export default function HomePage() {

    return (
        <div>
            <main className="flex flex-col gap-2">
                <h2 className="mb-2">Get yourself in the mood for sleep</h2>
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