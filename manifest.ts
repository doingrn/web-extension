import { readdir } from 'node:fs/promises';
import type { ActivityData } from '@/lib/activities/types';
import type { ManifestV3Export } from '@crxjs/vite-plugin';

const supportedWebsitesBasePath = './src/lib/activities/services';
const supportedWebsites = await readdir(supportedWebsitesBasePath);

async function loadActivityData(website: string) {
  const activityData = (await import(`${supportedWebsitesBasePath}/${website}/data.json`, { with: { type: 'json' } })) as {
    default: ActivityData;
  };

  return activityData.default;
}

const activitiesContentScripts = [];

// Load all activities listed in ./src/lib/activities/services
for (const website of supportedWebsites) {
  activitiesContentScripts.push({
    js: [`${supportedWebsitesBasePath}/${website}/activity.ts`],
    matches: (await loadActivityData(website)).websiteUrls
  });
}

export default {
  $schema: 'https://json.schemastore.org/chrome-manifest',
  manifest_version: 3,
  name: 'Veric Discord Status',
  version: '0.0.1',
  action: { default_popup: 'index.html' },
  permissions: ['scripting', 'tabs'],
  content_scripts: activitiesContentScripts
} as ManifestV3Export;
