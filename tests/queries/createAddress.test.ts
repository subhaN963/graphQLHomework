import * as fs from 'fs';
import { parse } from 'graphql';
import * as path from 'path';
import { executorWithHeaders } from '../executor';

const DATA_PATH = path.resolve(__dirname, '../../data/addresses.json');
const executor = executorWithHeaders({ client: 'test-client' });

describe('createAddress', () => {
    let originalData: string;

    beforeEach(() => { originalData = fs.readFileSync(DATA_PATH, 'utf-8'); });
    afterEach(() => { fs.writeFileSync(DATA_PATH, originalData, 'utf-8'); });

    const mutation = `
    mutation CreateAddress($username: String!, $address: AddressInput!) {
      createAddress(username: $username, address: $address) { street city state zipcode }
    }
  `;

    test('Success - creates new address', async () => {
        const variables = {
            username: 'newuser',
            address: { street: '999 Ave', city: 'Newcity', state: 'TX', zipcode: '75001' },
        };
        const result: any = await executor({ document: parse(mutation), variables });
        expect(result.data.createAddress).toEqual(variables.address);
    });

    test('Error - duplicate username', async () => {
        const variables = {
            username: 'jack',
            address: { street: '999 Ave', city: 'Newcity', state: 'TX', zipcode: '75001' },
        };
        const result: any = await executor({ document: parse(mutation), variables });
        expect(result.errors[0].message).toBe('Address already exists for this username');
    });
});