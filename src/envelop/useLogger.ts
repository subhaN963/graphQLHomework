import type { Plugin } from '@envelop/core';
import { Logger } from '../logger';
import { ContextType } from '../types';

export const useLogger = (): Plugin<ContextType> => {
  return {
    onExecute({ args, extendContext }) {
      const context = args.contextValue as ContextType;
      const logger = new Logger();
      logger.setRequestId(context.requestId);
      logger.setClient(context.client);
      extendContext({ logger });
    },
  };
};
