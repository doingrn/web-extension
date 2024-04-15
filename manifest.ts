import type { ManifestV3Export } from '@crxjs/vite-plugin';

export default {
  manifest_version: 3,
  name: 'Veric Discord Status',
  version: '0.0.1',
  action: { default_popup: 'index.html' },
  permissions: ['storage', 'tabs'],
  background: {
    service_worker: 'src/extension/background/index.ts'
  },
  content_scripts: [
    {
      js: ['src/extension/content-script/index.ts'],
      matches: ['https://*/*', 'http://*/*', '<all_urls>']
    }
  ]
} as ManifestV3Export;
