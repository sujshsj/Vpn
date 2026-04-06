import React from 'react';

export interface Server {
  id: string;
  name: string;
  country: string;
  flag: string;
  latency: number;
  load: number;
  isPremium: boolean;
}

export const SERVERS: Server[] = [
  { id: '1', name: 'New York', country: 'USA', flag: '🇺🇸', latency: 42, load: 24, isPremium: false },
  { id: '2', name: 'London', country: 'UK', flag: '🇬🇧', latency: 85, load: 45, isPremium: false },
  { id: '3', name: 'Tokyo', country: 'Japan', flag: '🇯🇵', latency: 120, load: 12, isPremium: true },
  { id: '4', name: 'Frankfurt', country: 'Germany', flag: '🇩🇪', latency: 38, load: 68, isPremium: false },
  { id: '5', name: 'Singapore', country: 'Singapore', flag: '🇸🇬', latency: 156, load: 31, isPremium: true },
  { id: '6', name: 'Sydney', country: 'Australia', flag: '🇦🇺', latency: 210, load: 18, isPremium: true },
];

export interface ConnectionStats {
  download: number;
  upload: number;
  duration: string;
  ip: string;
}
