import { render } from 'vitest-browser-react'
import HomePage from '../pages/Home'

describe('<HomePage/>', () => {
    it('Should list out all the links', async () => {

        const { getByText } = render(<HomePage/>);

        const links = [
            {
                label: 'Sleep affirmations',
                href: '/affirmations'
            },
            {
                label: 'Sound',
                href: '/sound'
            },
            {
                label: 'Breathing exercise',
                href: '/breathing'
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