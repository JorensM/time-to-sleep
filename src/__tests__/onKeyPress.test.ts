import onKeyPress from '../utils/onKeyPress';


describe(`onKeyPress()`, () => {
    it('Should accept a callback and call it if provided event key matches the provided keys and return the pressed key', async () => {
        const handler = vi.fn(async (key: string) => {
            await expect(key).toEqual('Enter');
        });

        const eventHandler = onKeyPress(['Enter', 'Space'], handler);

        eventHandler(new KeyboardEvent('keydown', {
            key: 'Enter'
        }));

        await expect(handler).toHaveBeenCalled();
    });

    it('Should not call the callback if unmatched key is presse', async () => {
        const handler = vi.fn(() => {});

        const eventHandler = onKeyPress('Enter', handler);

        eventHandler(new KeyboardEvent('keydown', {
            key: 'Tab'
        }));

        await expect(handler).not.toHaveBeenCalled();
    })
})