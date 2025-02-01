import { routes } from '../constants';

describe('constants.ts', () => {
    test('Should have appropriate values', () => {
        expect(routes.app.url).toEqual('/app');
        expect(routes.app.settings.url).toEqual('/app/settings');
        expect(routes.app.breathing.url).toEqual('/app/breathing');
        expect(routes.app.sound.url).toEqual('/app/sound');
        expect(routes.app.affirmations.url).toEqual('/app/affirmations');
        expect(routes.home.url).toEqual('/');
    })
})