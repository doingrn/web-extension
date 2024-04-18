import { useEffect, useState } from 'react';
import Header from './components/header';
import { manager } from './extension/background';
import type { LoadedActivity } from './extension/shared/types/activity-metadata';
import ActivityItem from './components/activity-item';

export default function App() {
  const [activities, setActivities] = useState<LoadedActivity[]>([]);

  useEffect(() => {
    const a = async () => {
      const t = await manager.getStoredActivities();
      setActivities(t);
      console.log(t);
    };
    a();
  }, []);

  return (
    <main>
      <Header />

      <div className="bg-gray-700 p-2 px-4">
        <div className="flex flex-col gap-2">
          {activities.map((activity) => (
            <ActivityItem key={activity.clientId} activity={activity} />
          ))}
        </div>
      </div>
    </main>
  );
}
