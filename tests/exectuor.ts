import { buildHTTPExecutor } from '@graphql-tools/executor-http';
import { createYoga } from 'graphql-yoga';
import plugins from '../src/envelop/index';
import { genSchema } from '../src/schema';

console.profile = jest.fn();
const schema = genSchema();

const yoga = createYoga({ schema, plugins });

export const executor = buildHTTPExecutor({
  fetch: yoga.fetch,
});
