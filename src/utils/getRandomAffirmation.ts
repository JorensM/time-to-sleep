import affirmations from '../data/affirmations';
import pickRandomArrayValue from './pickRandomArrayValue';

export default function getRandomAffirmation() {
    return pickRandomArrayValue(affirmations);
}