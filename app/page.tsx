'use client';

import { useState, useEffect } from 'react';

interface TimeZone {
  id: string;
  name: string;
  timezone: string;
  flag: string;
}

const defaultTimeZones: TimeZone[] = [
  { id: '1', name: 'New York', timezone: 'America/New_York', flag: '🇺🇸' },
  { id: '2', name: 'London', timezone: 'Europe/London', flag: '🇬🇧' },
  { id: '3', name: 'Tokyo', timezone: 'Asia/Tokyo', flag: '🇯🇵' },
  { id: '4', name: 'Sydney', timezone: 'Australia/Sydney', flag: '🇦🇺' },
];

export default function ClockApp() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeZones] = useState<TimeZone[]>(defaultTimeZones);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSeconds, setShowSeconds] = useState(true);
  const [is24Hour, setIs24Hour] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const formatTime = (date: Date, timezone?: string, show24Hour = is24Hour) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      ...(showSeconds && { second: '2-digit' }),
      hour12: !show24Hour,
      ...(timezone && { timeZone: timezone }),
    };
    return date.toLocaleTimeString('en-US', options);
  };

  const formatDate = (date: Date, timezone?: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...(timezone && { timeZone: timezone }),
    };
    return date.toLocaleDateString('en-US', options);
  };

  const getTimeZoneOffset = (timezone: string) => {
    const now = new Date();
    const utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
    const targetTime = new Date(utc.toLocaleString('en-US', { timeZone: timezone }));
    const localTime = new Date(utc.toLocaleString('en-US'));
    const offset = (targetTime.getTime() - localTime.getTime()) / (1000 * 60 * 60);
    return offset >= 0 ? `+${offset}` : `${offset}`;
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-full ${
              isDarkMode ? 'bg-purple-600' : 'bg-indigo-600'
            }`}>
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12,6 12,12 16,14"/>
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">World Clock</h1>
              <p className="text-gray-600 dark:text-gray-400">Track time across the globe</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
            >
              {isDarkMode ? (
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="4"/>
                  <path d="m12 2 0 2"/>
                  <path d="m12 20 0 2"/>
                  <path d="m4.93 4.93 1.41 1.41"/>
                  <path d="m17.66 17.66 1.41 1.41"/>
                  <path d="m2 12 2 0"/>
                  <path d="m20 12 2 0"/>
                  <path d="m6.34 17.66-1.41 1.41"/>
                  <path d="m19.07 4.93-1.41 1.41"/>
                </svg>
              ) : (
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
            <button className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Main Clock */}
        <div className={`mb-8 rounded-2xl shadow-2xl ${
          isDarkMode 
            ? 'bg-slate-800/50 backdrop-blur-sm' 
            : 'bg-white/70 backdrop-blur-sm'
        }`}>
          <div className="p-8 text-center">
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 mb-2">
                <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="m4.93 4.93 14.14 14.14"/>
                </svg>
                Local Time
              </span>
            </div>
            
            <div className={`text-6xl md:text-8xl font-mono font-bold mb-4 tracking-wider ${
              isDarkMode ? 'text-purple-300' : 'text-indigo-600'
            }`}>
              {formatTime(currentTime)}
            </div>
            
            <div className="text-xl text-gray-600 dark:text-gray-400 mb-6">
              {formatDate(currentTime)}
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setShowSeconds(!showSeconds)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  showSeconds 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Show Seconds
              </button>
              <button
                onClick={() => setIs24Hour(!is24Hour)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  is24Hour 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                24 Hour Format
              </button>
            </div>
          </div>
        </div>

        {/* World Clocks */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">World Clocks</h2>
            <button className="inline-flex items-center px-3 py-2 rounded-lg text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
              <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M5 12h14"/>
                <path d="m12 5 7 7-7 7"/>
              </svg>
              Add City
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {timeZones.map((tz) => (
              <div key={tz.id} className={`rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 ${
                isDarkMode 
                  ? 'bg-slate-800/40 backdrop-blur-sm' 
                  : 'bg-white/60 backdrop-blur-sm'
              }`}>
                <div className="p-4 pb-2">
                  <div className="flex items-center justify-between text-lg font-semibold mb-2">
                    <span className="flex items-center gap-2">
                      <span className="text-2xl">{tz.flag}</span>
                      <span className="text-gray-900 dark:text-white">{tz.name}</span>
                    </span>
                    <span className="text-xs px-2 py-1 rounded border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400">
                      UTC{getTimeZoneOffset(tz.timezone)}
                    </span>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <div className={`text-2xl font-mono font-bold mb-2 ${
                    isDarkMode ? 'text-purple-300' : 'text-indigo-600'
                  }`}>
                    {formatTime(currentTime, tz.timezone)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {formatDate(currentTime, tz.timezone)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className={`rounded-xl shadow-lg ${
          isDarkMode 
            ? 'bg-slate-800/40 backdrop-blur-sm' 
            : 'bg-white/60 backdrop-blur-sm'
        }`}>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="h-16 flex flex-col items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12,6 12,12 16,14"/>
                </svg>
                <span className="text-xs">Set Alarm</span>
              </button>
              <button className="h-16 flex flex-col items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="m4.93 4.93 14.14 14.14"/>
                </svg>
                <span className="text-xs">Time Zones</span>
              </button>
              <button className="h-16 flex flex-col items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                <span className="text-xs">Settings</span>
              </button>
              <button className="h-16 flex flex-col items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M5 12h14"/>
                  <path d="m12 5 7 7-7 7"/>
                </svg>
                <span className="text-xs">Add Widget</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <div className="h-px bg-gray-200 dark:bg-gray-700 mb-4"></div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Built with precision • Updated every second • {timeZones.length} cities tracked
          </p>
        </div>
      </div>
    </div>
  );
}
