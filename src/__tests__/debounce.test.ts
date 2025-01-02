import { it, expect, describe, vi } from 'vitest';
import debounce from '../utils/debounce';

describe('debounce()', () => {
    it('Should accept a function and return a debounced version', async () => {
        vi.useFakeTimers();
        const fnObj = {
            fn: () => {}
        };
        const fnSpy = vi.spyOn(fnObj, 'fn');
        const debouncedFn = debounce(fnObj.fn, 2000);

        debouncedFn();
        debouncedFn();

        await expect(fnSpy).not.toHaveBeenCalled();

        setTimeout(async () => {
            await expect(fnSpy).toHaveBeenCalledOnce();
        }, 2000);

        vi.runAllTimers();

    })
})