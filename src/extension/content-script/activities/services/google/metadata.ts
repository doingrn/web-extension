import type { ActivityMetadata } from '@/shared/types/activity-metadata';

export const metadata = {
  name: 'Google',
  description: '',
  clientId: '1229420473813700608',
  supportedWebsites: [
    /https:\/\/www\.google\.com\/search\?q=.*$/,
    /https:\/\/www\.google\.[a-z]{2}\/search\?q=.*$/,
    /https:\/\/www\.google\.com\.[a-z]{2}\/search\?q=.*$/
  ],
  images: {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/480px-Google_%22G%22_logo.svg.png'
  },
  options: {}
} satisfies ActivityMetadata;
