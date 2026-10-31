import Sidebar from './Sidebar.jsx';
import AppHeader from './AppHeader.jsx';
import BottomNav from './BottomNav.jsx';
import Toast from '../ui/Toast.jsx';
import ComposerHost from '../ComposerHost.jsx';
import { Outlet } from 'react-router-dom';

export default function AppShell() {
  return (
    <div className="min-h-dvh bg-surface text-on-surface">
      <div className="flex min-h-dvh">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <AppHeader />
          <main className="flex-1 px-space-md pb-28 pt-16 md:px-space-lg lg:px-space-xl lg:pb-space-xl lg:pt-space-xl">
            <div className="mx-auto w-full max-w-[560px] md:max-w-[760px] lg:max-w-[1200px]">
              <Outlet />
            </div>
          </main>
          <BottomNav />
        </div>
      </div>

      <Toast />
      <ComposerHost />
    </div>
  );
}
