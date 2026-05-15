import { getMesh } from '@graphql-mesh/runtime';
import { findAndParseConfig } from '@graphql-mesh/cli';
import path from 'path';

let meshInstance: any = null;

export const getMeshSDK = async () => {
  if (!meshInstance) {
    const meshConfig = await findAndParseConfig({
      dir: path.resolve(__dirname, '../../..'),
    });
    meshInstance = await getMesh(meshConfig);
  }
  return meshInstance;
};

export const fetchNeoFeed = async (startDate: string, endDate: string) => {
  // Initialize Mesh to ensure config is loaded
  await getMeshSDK();

  // Use the endpoint configured in .meshrc.yml via fetch
  const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=DEMO_KEY`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`NASA API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};
