import type { AllActivityEvents } from '@/extension/shared/activity-event/events';
import { useUser } from '@/hooks/useUser';
import { useEffect } from 'react';

export default function UserProvider({ children }: { children: React.ReactNode }) {
  const user = useUser();

  useEffect(() => {
    chrome.runtime.onConnect.addListener((port) => {
      if (port.name !== 'doingrn') return;

      port.onMessage.addListener((request: AllActivityEvents) => {
        switch (request.t) {
          case 'update_user':
            user.setUser(request.d);
            break;
        }
      });
    });
  }, [user.setUser]);

  return <>{children}</>;
}
