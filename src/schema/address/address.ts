// address.ts — replace entire file:

import * as fs from 'fs';
import { GraphQLError } from 'graphql';
import * as path from 'path';
import { Address, Addresses, Args, CreateAddressArgs } from './types';
const DATA_PATH = path.resolve(__dirname, '../../../data/addresses.json');

const readAddresses = (): Addresses => {
  const raw = fs.readFileSync(DATA_PATH, 'utf-8');
  return JSON.parse(raw);
};

const writeAddresses = (data: Addresses): void => {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
};

export const getAddress = (_: any, args: Args, context: any): Address => {
  context.logger.info('getAddress', { detail: 'Enter resolver' });
  const addresses = readAddresses();
  const address = addresses[args.username];

  if (address) {
    context.logger.info('getAddress', { detail: 'Returning address' });
    return address;
  }
  context.logger.error('getAddress', { detail: 'No address found' });
  throw new GraphQLError('No address found in getAddress resolver');
};

export const createAddress = (
  _: any,
  args: CreateAddressArgs,
  context: any
): Address => {
  context.logger.info('createAddress', { detail: 'Enter resolver' });
  const addresses = readAddresses();

  if (addresses[args.username]) {
    throw new GraphQLError('Address already exists for this username');
  }
  addresses[args.username] = args.address;
  writeAddresses(addresses);
  context.logger.info('createAddress', { detail: 'Address created' });
  return args.address;
};