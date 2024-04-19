import { useEffect, useState } from 'react';
import Header from './components/header';
import { manager } from './extension/background';
import type { LoadedActivity } from './extension/shared/types/activity-metadata';
import ActivityItem from './components/activity-item';
import ActivitySettings from './components/activity-item/activity-settings';

export default function App() {
  const [activities, setActivities] = useState<LoadedActivity[]>([]);
  const [settingsOpen, setSettingsOpen] = useState<LoadedActivity | null>();

  useEffect(() => {
    const loadActivities = async () => {
      const t = await manager.getStoredActivities();
      setActivities(t);
    };

    loadActivities();
  }, []);

  return (
    <main>
      <Header />

      <div className="p-2 px-4">
        {settingsOpen ? (
          <ActivitySettings activity={settingsOpen} close={() => setSettingsOpen(null)} />
        ) : (
          <div className="flex flex-col gap-2">
            {activities.map((activity) => (
              <ActivityItem key={activity.clientId} activity={activity} settingsOpen={() => setSettingsOpen(activity)} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
