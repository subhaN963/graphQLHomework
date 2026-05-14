import { parse } from 'graphql';
import { executorWithHeaders } from '../executor';

const executor = executorWithHeaders({ client: 'test-client' });

describe('getAddress', () => {
  test('Success', async () => {
    const query = `
      query GetAddress($username: String!) {
        address(username: $username) { street city state zipcode }
      }
    `;
    const result: any = await executor({ document: parse(query), variables: { username: 'jack' } });

    expect(result.data.address).toEqual({
      street: '123 Street St.',
      city: 'Sometown',
      state: 'OH',
      zipcode: '43215',
    });
    expect(result.metadata.requestId).toBeDefined();
  });

  test('Error - user not found', async () => {
    const query = `
      query GetAddress($username: String!) {
        address(username: $username) { street }
      }
    `;
    const result: any = await executor({ document: parse(query), variables: { username: 'unknown' } });
    expect(result.errors[0].message).toBe('No address found in getAddress resolver');
  });
});