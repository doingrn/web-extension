import { manager } from '@/extension/background';
import type { LoadedActivity } from '@/extension/shared/types/activity-metadata';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ActivitySettings({ activity, close }: { activity: LoadedActivity; close: () => void }) {
  const [stringOptions, setStringOptions] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchSettings = async () => {
      const settings = await manager.getActivitySettings(activity.metadata.name);
      setStringOptions(settings as Record<string, string>);
    };
    fetchSettings();
  }, [activity]);

  const handleStringChange = async (option: string, value: string) => {
    setStringOptions({ ...stringOptions, [option]: value });
    await manager.setActivitySettings(activity.metadata.name, { [option]: value });
  };

  return (
    <>
      <div className="flex gap-2 my-2">
        <img src={activity.metadata.images.main} draggable={false} className="w-8 h-8 rounded-full" alt="Google Logo" />
        <p className="font-bold text-lg">{activity.metadata.name}</p>
        <button type="button" className="ml-auto" onClick={close}>
          <ArrowLeft />
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {Object.entries(activity.metadata.options).map(([key, option]) => {
          if (option.type === 'string') {
            return (
              <div key={key}>
                <p className="text-lg font-bold">
                  {option.name} {key}
                </p>
                <input
                  className="p-1 px-2 w-full text-sm rounded-md"
                  type="text"
                  defaultValue={option.defaultValue}
                  value={stringOptions[key]}
                  onChange={(e) => handleStringChange(key, e.target.value)}
                />
              </div>
            );
          }
        })}
      </div>
    </>
  );
}
