import { init } from '@paralleldrive/cuid2';

const generateShortId = init({ length: 12 });

export const generateHash = (): string => {
    return generateShortId();
};