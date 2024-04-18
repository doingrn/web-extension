interface BaseActivityOption {
  type: 'string' | 'dropdown';
}

interface ActivityStringOptions extends BaseActivityOption {
  type: 'string';
  defaultValue: string;
}

interface ActivityDropdownOptions<T extends string[]> extends BaseActivityOption {
  type: 'dropdown';
  options: T;
  defaultOptions: T;
  min?: number;
  max?: number;
}

type AllActivityOptions = ActivityStringOptions | ActivityDropdownOptions<never>;

export interface ActivityMetadata {
  name: string;
  description: string;
  clientId: string;
  supportedWebsites: (RegExp | string)[];
  images: Record<string, string>;
  options: Record<string, AllActivityOptions>;
}

export interface LoadedActivity {
  clientId: string;
  icon: string;
  metadata: ActivityMetadata;
}
