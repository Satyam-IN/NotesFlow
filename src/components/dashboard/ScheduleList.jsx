import { Link } from 'react-router-dom';
import Icon from '../ui/Icon.jsx';
import { dashboardSchedule } from '../../data/mockData.js';
import { cn } from '../../utils/cn.js';

export default function ScheduleList() {
  return (
    <div className="flex flex-col gap-space-md">
      <div className="flex items-center justify-between">
        <h3 className="text-headline-sm text-on-surface">Upcoming Schedule</h3>
        <Link to="/calendar" className="text-label-md font-semibold text-primary-ink hover:underline">
          See all
        </Link>
      </div>

      <div className="flex flex-col gap-space-sm">
        {dashboardSchedule.map((item) => (
          <Link
            key={item.id}
            to="/calendar"
            className="flex items-center justify-between gap-space-sm rounded-xl bg-surface-container-low p-space-md shadow-ambient transition-all hover:bg-surface-container"
          >
            <div className="flex min-w-0 items-center gap-space-md">
              <div
                className={cn(
                  'flex shrink-0 flex-col items-center justify-center rounded-lg px-space-sm py-space-xs',
                  item.accent
                    ? 'bg-primary-fixed text-on-primary-fixed'
                    : 'bg-surface-container-high text-on-surface',
                )}
              >
                <span className="text-label-sm font-bold">{item.time}</span>
                <span className="text-[10px] font-medium uppercase">{item.period}</span>
              </div>
              <div className="flex min-w-0 flex-col">
                <span className="truncate text-body-md font-semibold text-on-surface">
                  {item.title}
                </span>
                <span className="truncate text-body-sm text-secondary">{item.meta}</span>
              </div>
            </div>
            <Icon name="chevron_right" size={20} className="shrink-0 text-secondary" />
          </Link>
        ))}
      </div>
    </div>
  );
}
