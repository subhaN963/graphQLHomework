import { parse } from 'graphql';
import { executor, executorWithHeaders } from '../executor';

describe('Client header validation', () => {
    const query = `query { address(username: "jack") { street } }`;

    test('Rejects missing client header', async () => {
        const result: any = await executor({ document: parse(query) });
        expect(result.errors[0].message).toBe('Missing required header: client');
    });

    test('Allows queries for strata client', async () => {
        const strataExec = executorWithHeaders({ client: 'strata' });
        const result: any = await strataExec({ document: parse(query) });
        expect(result.data.address).toBeDefined();
    });

    test('Rejects mutations for strata client', async () => {
        const strataExec = executorWithHeaders({ client: 'strata' });
        const mutation = `mutation {
                                    createAddress(username: "x", address: {
                                                                            street: "1",
                                                                            city: "c",
                                                                            state: "s",
                                                                            zipcode: "z"
                                                                        })
                                    { street }
                                    }
    `;
        const result: any = await strataExec({ document: parse(mutation) });
        expect(result.errors[0].message).toBe('Client strata is not allowed to perform mutations');
    });
});