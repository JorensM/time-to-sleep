import { it, expect, describe, vi } from 'vitest';
import { userEvent } from '@vitest/browser/context';
import { render } from 'vitest-browser-react';
import BreathingExercise from '../pages/BreathingExercise';
import sleep from '../utils/sleep';

describe('BreathingExercise', () => {
    it(`Should allow you to tap/click the page repeatedly to set a rhythm,
        with each tap switching between the text 'breathe in', 'breathe out'
        starting with 'breathe in'`, 
    async () => {
        const { getByText } = render(<BreathingExercise />);

        const initialText = await getByText('Tap repeatedly to set a comfortable breathing rhythm');
        const breatheInText = await getByText('Breathe in');
        const breatheOutText = await getByText('Breathe out');

        await expect.element(initialText).toBeVisible();

        await initialText.click();

        await expect.element(breatheInText).toBeVisible();

        await breatheInText.click();

        await expect.element(breatheOutText).toBeVisible();
    })

    it(`Should start automatically switching between the texts 'breathe in' and 'breathe out'
        according to the specified rhythm`, 
    async () => {
        const { getByText } = render(<BreathingExercise />);

        const initialText = await getByText('Tap repeatedly to set a comfortable breathing rhythm');
        const breatheInText = await getByText('Breathe in');
        const breatheOutText = await getByText('Breathe out');

        await expect.element(initialText).toBeVisible();
        await initialText.click();
        await expect.element(breatheInText).toBeVisible();

        await sleep(2000);
        await breatheInText.click();
        await expect.element(breatheOutText).toBeVisible();

        await vi.waitFor(async () => {
            await expect.element(breatheInText).toBeVisible()
        }, {
            timeout: 5000
        });
        await vi.waitFor(async () => {
            await expect.element(breatheOutText).toBeVisible()
        }, {
            timeout: 5000
        });
    })

    it(`Should have keyboard support`, async () => {
        const { getByText } = render(<BreathingExercise />);

        const initialText = await getByText('Tap repeatedly to set a comfortable breathing rhythm');
        const breatheInText = await getByText('Breathe in');
        const breatheOutText = await getByText('Breathe out');

        await expect.element(initialText).toBeVisible();
        await userEvent.keyboard('{ }');
        await expect.element(breatheInText).toBeVisible();
        await userEvent.keyboard('{ }');
        await expect.element(breatheOutText).toBeVisible();
    })

    it(`Should start with 'breathe in' with each adjustment`, async () => {
        const { getByText } = render(<BreathingExercise />);

        const initialText = await getByText('Tap repeatedly to set a comfortable breathing rhythm');
        const breatheInText = await getByText('Breathe in');
        const breatheOutText = await getByText('Breathe out');

        await expect.element(initialText).toBeVisible();
        await initialText.click();
        await expect.element(breatheInText).toBeVisible();

        await sleep(2000);
        await breatheInText.click();
        await expect.element(breatheOutText).toBeVisible();

        await vi.waitFor(async () => {
            await expect.element(breatheInText).toBeVisible();
        }, {
            timeout: 5000
        });
        await vi.waitFor(async () => {
            await expect.element(breatheOutText).toBeVisible();
        }, {
            timeout: 5000
        });

        await vi.waitFor(async () => {
            await expect.element(breatheInText).toBeVisible();
            await breatheInText.click();
            await expect.element(breatheInText).toBeVisible();
        }, {
            timeout: 5000
        });
    }, {
        timeout: 25000
    })
})