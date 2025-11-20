import React, { useState, useEffect } from 'react';
import Loading from '../components/ui/Loading';
import './Calendar.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTasks([
        {
          id: 1,
          title: 'Design homepage',
          dueDate: '2024-01-15',
          priority: 'high',
          project: 'Website Redesign',
        },
        {
          id: 2,
          title: 'API Integration',
          dueDate: '2024-01-16',
          priority: 'urgent',
          project: 'Mobile App',
        },
        {
          id: 3,
          title: 'Write documentation',
          dueDate: '2024-01-18',
          priority: 'medium',
          project: 'Website Redesign',
        },
        {
          id: 4,
          title: 'Setup environment',
          dueDate: '2024-01-20',
          priority: 'low',
          project: 'Mobile App',
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const getTasksForDate = (date) => {
    if (!date) return [];
    const dateStr = date.toISOString().split('T')[0];
    return tasks.filter(task => task.dueDate === dateStr);
  };

  const navigateMonth = (direction) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  if (loading) {
    return <Loading fullScreen text="Loading calendar..." />;
  }

  const days = getDaysInMonth(currentDate);
  const today = new Date();
  const isToday = (date) => {
    if (!date) return false;
    return date.toDateString() === today.toDateString();
  };

  return (
    <div className="calendar page-container">
      <div className="calendar-header">
        <div>
          <h1>Calendar</h1>
          <p className="text-muted">View your tasks and deadlines</p>
        </div>
        <div className="calendar-navigation">
          <button
            className="btn btn-outline"
            onClick={() => navigateMonth(-1)}
          >
            ← Previous
          </button>
          <h2 className="calendar-month-year">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button
            className="btn btn-outline"
            onClick={() => navigateMonth(1)}
          >
            Next →
          </button>
        </div>
      </div>

      <div className="calendar-container">
        <div className="calendar-grid">
          <div className="calendar-weekdays">
            {dayNames.map(day => (
              <div key={day} className="calendar-weekday">
                {day}
              </div>
            ))}
          </div>
          <div className="calendar-days">
            {days.map((date, index) => {
              const dateTasks = getTasksForDate(date);
              const isCurrentMonth = date !== null;
              const isCurrentDay = isToday(date);
              
              return (
                <div
                  key={index}
                  className={`calendar-day ${!isCurrentMonth ? 'other-month' : ''} ${isCurrentDay ? 'today' : ''} ${selectedDate?.toDateString() === date?.toDateString() ? 'selected' : ''}`}
                  onClick={() => date && setSelectedDate(date)}
                >
                  {date && (
                    <>
                      <div className="calendar-day-number">
                        {date.getDate()}
                      </div>
                      <div className="calendar-day-tasks">
                        {dateTasks.slice(0, 3).map(task => (
                          <div
                            key={task.id}
                            className={`calendar-task calendar-task-${task.priority}`}
                            title={task.title}
                          >
                            {task.title}
                          </div>
                        ))}
                        {dateTasks.length > 3 && (
                          <div className="calendar-task-more">
                            +{dateTasks.length - 3} more
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {selectedDate && (
          <div className="calendar-sidebar">
            <div className="calendar-sidebar-header">
              <h3>
                {selectedDate.toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })}
              </h3>
              <button
                className="btn btn-icon"
                onClick={() => setSelectedDate(null)}
              >
                ✕
              </button>
            </div>
            <div className="calendar-sidebar-content">
              {getTasksForDate(selectedDate).length === 0 ? (
                <div className="empty-state">
                  <p>No tasks scheduled for this date</p>
                </div>
              ) : (
                <div className="calendar-task-list">
                  {getTasksForDate(selectedDate).map(task => (
                    <div key={task.id} className="calendar-task-item">
                      <div className="task-item-header">
                        <h4>{task.title}</h4>
                        <span className={`priority priority-${task.priority}`}>
                          {task.priority}
                        </span>
                      </div>
                      <p className="task-item-project">{task.project}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;

