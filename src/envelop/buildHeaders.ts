import type { Plugin } from '@envelop/core';
import { GraphQLError } from 'graphql/error';
import { v4 as uuid } from 'uuid';
import { ContextType } from '../types';

export const buildHeaders = (): Plugin<ContextType> => {
  return {
    onExecute({ args, extendContext }) {

      const request = (args.contextValue as any).request;
      const client = request?.headers?.get('client');

      if(!client){
        throw new GraphQLError('Missing required header: client');
      }
      const operation = args.document.definitions[0];
      if(client === 'strata' && operation.kind === 'OperationDefinition' && operation.operation === 'mutation'){
        throw new GraphQLError('Client strata is not allowed to perform mutations');
      }

      const requestId = uuid();
      extendContext({ requestId, client });
    },
  };
};
