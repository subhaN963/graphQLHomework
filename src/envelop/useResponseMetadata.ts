import type { Plugin } from '@envelop/core';
import { ContextType } from '../types';

export const useResponseMetadata = (): Plugin<ContextType> => {
    return {
        onExecute({ args }) {
            return {
                onExecuteDone({ result, setResult }) {
                    const context = args.contextValue as ContextType;
                    if (result && 'data' in result) {
                        setResult({
                            ...result,
                            metadata: { requestId: context.requestId },
                        } as any);
                    }
                },
            };
        },
    };
};