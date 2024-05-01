import type { ActivityMetadata } from '@/shared/types/activity-metadata';

export const metadata = {
  name: 'SoundCloud',
  description: '',
  clientId: '1234526563622584382',
  supportedWebsites: [/https:\/\/soundcloud.com\/.*$/],
  images: {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Antu_soundcloud.svg/483px-Antu_soundcloud.svg.png'
  },
  options: {}
} satisfies ActivityMetadata;
