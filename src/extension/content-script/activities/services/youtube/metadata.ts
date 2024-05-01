import type { ActivityMetadata } from '@/extension/shared/types/activity-metadata';

export const metadata = {
  name: 'YouTube',
  description: '',
  clientId: '1229545232656371813',
  supportedWebsites: [/https:\/\/www\.youtube\.com\/.*$/],
  images: {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/YouTube_social_red_circle_%282017%29.svg/240px-YouTube_social_red_circle_%282017%29.svg.png'
  },
  options: {
    watchingText: {
      name: 'Watching Text',
      type: 'string',
      defaultValue: 'Watching {{videoName}}'
    },
    channelText: {
      name: 'Channel Text',
      type: 'string',
      defaultValue: '{{channelName}}'
    }
  }
} satisfies ActivityMetadata;
