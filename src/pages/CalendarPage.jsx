import { useMemo, useState } from 'react';
import { useApp } from '../store/AppProvider.jsx';
import PageHeader from '../components/layout/PageHeader.jsx';
import MonthGrid from '../components/calendar/MonthGrid.jsx';
import MonthPicker from '../components/calendar/MonthPicker.jsx';
import DayTimeline from '../components/calendar/DayTimeline.jsx';
import Icon from '../components/ui/Icon.jsx';
import { isSameDay, startOfDay, toISODate } from '../utils/date.js';

function firstOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export default function CalendarPage() {
  const { events, openComposer } = useApp();
  const today = useMemo(() => startOfDay(new Date()), []);
  const [viewDate, setViewDate] = useState(() => firstOfMonth(today));
  const [selectedDate, setSelectedDate] = useState(today);

  const dayEvents = useMemo(
    () => events.filter((event) => event.date === toISODate(selectedDate)),
    [events, selectedDate],
  );

  const shiftMonth = (offset) => {
    const next = new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1);
    setViewDate(next);
    setSelectedDate(next);
  };

  const handleMonthSelect = (next) => {
    setViewDate(next);
    setSelectedDate(
      next.getMonth() === today.getMonth() && next.getFullYear() === today.getFullYear()
        ? today
        : next,
    );
  };

  const openAddEvent = () =>
    openComposer('event', { defaultDate: toISODate(selectedDate) });

  return (
    <div className="flex flex-col gap-space-md pb-space-lg">
      <PageHeader title="Calendar" description="Plan the week without the clutter">
        <button
          type="button"
          onClick={openAddEvent}
          className="flex h-10 items-center gap-space-sm rounded-lg bg-primary px-space-md font-label-md font-semibold text-on-primary shadow-sm transition-all hover:bg-surface-tint"
        >
          <Icon name="add" size={18} />
          Add Event
        </button>
      </PageHeader>

      <div className="flex items-center justify-between gap-space-sm">
        <MonthPicker monthDate={viewDate} onSelect={handleMonthSelect} />

        <div className="flex items-center gap-space-xs">
          <button
            type="button"
            onClick={() => shiftMonth(-1)}
            aria-label="Previous month"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container-high text-on-surface transition-colors hover:bg-surface-container-highest"
          >
            <Icon name="chevron_left" size={18} />
          </button>
          <button
            type="button"
            onClick={() => shiftMonth(1)}
            aria-label="Next month"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container-high text-on-surface transition-colors hover:bg-surface-container-highest"
          >
            <Icon name="chevron_right" size={18} />
          </button>
          <button
            type="button"
            onClick={openAddEvent}
            className="ml-space-xs flex h-9 items-center gap-space-xs whitespace-nowrap rounded-full bg-primary px-space-md text-label-md text-on-primary shadow-sm transition-opacity hover:opacity-95 lg:hidden"
          >
            <Icon name="add" size={16} />
            Add Event
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-space-lg lg:grid-cols-12">
        <div className="lg:col-span-7">
          <MonthGrid
            monthDate={viewDate}
            selectedDate={selectedDate}
            events={events}
            onSelect={setSelectedDate}
          />
        </div>
        <div className="lg:col-span-5">
          <DayTimeline
            date={selectedDate}
            events={dayEvents}
            isToday={isSameDay(selectedDate, today)}
            onToday={() => {
              setViewDate(firstOfMonth(today));
              setSelectedDate(today);
            }}
            onAdd={openAddEvent}
            onEdit={(event) => openComposer('event', { event })}
          />
        </div>
      </div>
    </div>
  );
}
