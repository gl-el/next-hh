import { scale } from '@greensight/gds';
import { ReactElement, cloneElement } from 'react';

import { colors } from '@scripts/gds';
import { CSSObject } from '@emotion/core';

export default function Skeleton({ isLoading, children }: { isLoading: boolean; children: ReactElement }) {
    return (
        <div css={{ position: 'relative' }}>
            {isLoading && (
                <div
                    css={{
                        position: 'absolute',
                        height: '100%',
                        width: scale(40),
                        maxWidth: '100%',
                        backgroundColor: colors.grey400,
                        borderRadius: scale(1, true),
                    }}
                />
            )}
            {'css' in children.props
                ? cloneElement(children, {
                      css: [children.props.css, { visibility: isLoading ? 'hidden' : 'visible' }] as unknown as CSSObject,
                  })
                : cloneElement(children, {
                    css: { visibility: isLoading ? 'hidden' : 'visible' },
                })}
        </div>
    );
}
