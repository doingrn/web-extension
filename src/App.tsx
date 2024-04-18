import { useEffect, useState } from 'react';
import Header from './components/header';
import { manager } from './extension/background';
import type { LoadedActivity } from './extension/shared/types/activity-metadata';

export default function App() {
  const [activities, setActivities] = useState<LoadedActivity[]>([]);

  useEffect(() => {
    const a = async () => {
      const t = await manager.getStoredActivities();
      setActivities(t);
    };
    a();
  }, []);

  return (
    <main>
      <Header />

      <div className="bg-gray-700 p-2 px-4">
        <div className="flex flex-col gap-2">
          {activities.map((activity) => (
            <div className="flex gap-2 items-center" key={activity.clientId}>
              <img src={activity.metadata.images.main} className="w-8 h-8 rounded-full" alt="Google Logo" />
              <p className="font-bold text-lg">{activity.metadata.name}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
