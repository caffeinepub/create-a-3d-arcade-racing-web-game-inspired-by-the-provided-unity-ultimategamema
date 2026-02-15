export interface CarVariant {
  id: number;
  name: string;
  color: string;
  accentColor: string;
  baseSpeed: number;
}

export const CAR_LIBRARY: CarVariant[] = [
  { id: 0, name: 'Velocity', color: '#ff3333', accentColor: '#ffaa00', baseSpeed: 70 },
  { id: 1, name: 'Thunder', color: '#3366ff', accentColor: '#00ffff', baseSpeed: 70.5 },
  { id: 2, name: 'Phoenix', color: '#ff6600', accentColor: '#ffff00', baseSpeed: 71 },
  { id: 3, name: 'Shadow', color: '#1a1a1a', accentColor: '#ff0066', baseSpeed: 71.5 },
  { id: 4, name: 'Viper', color: '#00ff00', accentColor: '#ffff00', baseSpeed: 72 },
  { id: 5, name: 'Phantom', color: '#9933ff', accentColor: '#ff33ff', baseSpeed: 72.5 },
  { id: 6, name: 'Blaze', color: '#ff0000', accentColor: '#ffff00', baseSpeed: 73 },
  { id: 7, name: 'Storm', color: '#0099ff', accentColor: '#ffffff', baseSpeed: 73.5 },
];
