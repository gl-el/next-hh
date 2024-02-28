import { Theme } from '@greensight/gds';

import tokens from '../../../public/tokens.json';

const { colors } = tokens;

export const global: Theme['global'] = {
    base: {
        focus: {
            width: 2,
            offset: 2,
        },
        body: {
            typography: 'sMedium',
            color: colors.black,
        },
    },
};
