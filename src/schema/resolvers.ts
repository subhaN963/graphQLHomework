import { createAddress, getAddress } from './address/address';
import { Address, Args, CreateAddressArgs } from './address/types';
import { getNearEarthObjects } from './neo/neo';

export const resolvers = {
  Query: {
    address: (
      parent: any,
      args: Args,
      context: any,
      info: any
    ): Address => {
      return getAddress(parent, args, context);
    },
    nearEarthObjects: 
        async (
          parent: any, 
          args: any, 
          context: any, 
          info: any) => {
            return getNearEarthObjects(parent, args, context);
    },
  },

  Mutation: {
    createAddress: (
      parent: any,
      args: CreateAddressArgs,
      context: any,
      info: any
    ): Address => {
      return createAddress(parent, args, context);
    },
  },
};
