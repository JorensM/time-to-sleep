import { render } from 'vitest-browser-react'
import App from '../pages/App';

describe('<App/>', () => {
    it('Should list out all the links', async () => {

        const { getByText } = render(<App/>);

        const links = [
            {
                label: 'Sleep affirmations',
                href: '/app/affirmations'
            },
            {
                label: 'Sound',
                href: '/app/sound'
            },
            {
                label: 'Breathing exercise',
                href: '/app/breathing'
            }
        ]

        for(const link of links) {
            console.log('link: ', link);
            const element = await getByText(link.label);
            await expect.element(element).toBeVisible();
            await expect.element(element).toHaveAttribute('href', link.href);
        }

    })
})