import type { AllActivityEvents } from '@/shared/activity-event/events';
import { useEffect } from 'react';
import { useUser } from '../hooks/useUser';

export default function UserProvider({ children }: { children: React.ReactNode }) {
  const user = useUser();

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message) => {
      if (message.name !== 'doingrn') return;

      const request = message.d as AllActivityEvents;

      switch (request.t) {
        case 'update_user':
          user.setUser(request.d);
          break;
      }
    });
  }, [user.setUser]);

  return <>{children}</>;
}
