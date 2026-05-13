import { Plugin, useEngine } from '@envelop/core';
import { useParserCache } from '@envelop/parser-cache';
import { useValidationCache } from '@envelop/validation-cache';
import { execute, parse, specifiedRules, subscribe, validate } from 'graphql';
import { ContextType } from '../types';
import { buildHeaders } from './buildHeaders';
import { useLogger } from './useLogger';
import { useResponseMetadata } from './useResponseMetadata';

const plugins: Plugin<ContextType>[] = [
  useEngine({ parse, validate, specifiedRules, execute, subscribe }) as Plugin<ContextType>,
  buildHeaders(),
  useLogger(),
  useResponseMetadata(),
  useParserCache() as Plugin<ContextType>,
  useValidationCache() as Plugin<ContextType>,
];

export default plugins;
