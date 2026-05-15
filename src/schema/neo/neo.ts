import { fetchNeoFeed } from './meshClient';

interface NeoArgs {
  startDate: string;
  endDate: string;
}

export const getNearEarthObjects = async (_: any, args: NeoArgs, context: any) => {
  context.logger.info('getNearEarthObjects', { detail: 'Enter resolver' });

  try {
    const raw = await fetchNeoFeed(args.startDate, args.endDate);

    const nearEarthObjects = raw.near_earth_objects;
    const flatList: any[] = [];

    for (const date of Object.keys(nearEarthObjects)) {
      for (const obj of nearEarthObjects[date]) {
        flatList.push({
          id: obj.id,
          name: obj.name,
          isPotentiallyHazardousAsteroid: obj.is_potentially_hazardous_asteroid,
          estimatedDiameterMinKm: obj.estimated_diameter?.kilometers?.estimated_diameter_min,
          estimatedDiameterMaxKm: obj.estimated_diameter?.kilometers?.estimated_diameter_max,
          closeApproachDate: obj.close_approach_data?.[0]?.close_approach_date,
          relativeVelocityKph: obj.close_approach_data?.[0]?.relative_velocity?.kilometers_per_hour,
          missDistanceKm: obj.close_approach_data?.[0]?.miss_distance?.kilometers,
        });
      }
    }

    context.logger.info('getNearEarthObjects', { detail: `Returning ${flatList.length} objects` });

    return {
      elementCount: raw.element_count,
      objects: flatList,
    };
  } catch (error: any) {
    context.logger.error('getNearEarthObjects', { detail: error.message || error });
    throw error;
  }
};
