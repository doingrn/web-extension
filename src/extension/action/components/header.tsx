import { useUser } from '../hooks/useUser';
import { getUserAvatar } from '../lib/utils/avatar';

export default function Header() {
  const user = useUser();

  return (
    <header className="flex items-center justify-between px-4 bg-gray-800 w-full min-h-16">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold">DoingRN</h1>
        <p className="text-slate-200">Conectado como @{user.global_name ?? 'unknown'}</p>
      </div>
      <div>
        <img src={getUserAvatar(user)} className="w-8 h-8 rounded-full" alt="Your Discord avatar." />
      </div>
    </header>
  );
}
