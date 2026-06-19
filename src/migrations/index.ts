import * as migration_20260619_181335_initial from './20260619_181335_initial';

export const migrations = [
  {
    up: migration_20260619_181335_initial.up,
    down: migration_20260619_181335_initial.down,
    name: '20260619_181335_initial'
  },
];
