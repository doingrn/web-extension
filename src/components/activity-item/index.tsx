import { Settings, ToggleLeft as Disabled, ToggleRight as Enabled } from 'lucide-react';
import type { LoadedActivity } from '@/extension/shared/types/activity-metadata';
import { useEffect, useState } from 'react';
import { manager } from '@/extension/background';

export default function ActivityItem({ activity, settingsOpen }: { activity: LoadedActivity; settingsOpen: () => void }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      const settings = await manager.getActivitySettings(activity.metadata.name);
      setEnabled(settings.enabled);
    };

    fetchSettings();
  }, [activity]);

  const toggleEnable = async () => {
    setEnabled(!enabled);
    await manager.setActivitySettings(activity.metadata.name, { enabled: !enabled });
  };

  return (
    <div className="flex gap-2 items-center" key={activity.clientId}>
      <img src={activity.metadata.images.main} draggable={false} className="w-8 h-8 rounded-full" alt="Google Logo" />
      <p className="font-bold text-lg">{activity.metadata.name}</p>
      <div className="flex gap-2 ml-auto">
        <button type="button" className="cursor-pointer" onClick={toggleEnable}>
          {enabled ? <Enabled /> : <Disabled />}
        </button>
        <button type="button">
          <Settings onClick={settingsOpen} />
        </button>
      </div>
    </div>
  );
}
