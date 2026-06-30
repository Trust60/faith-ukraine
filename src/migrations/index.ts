import * as migration_20260619_181335_initial from './20260619_181335_initial';
import * as migration_20260622_172655_partners_add from './20260622_172655_partners_add';
import * as migration_20260630_163857_catalog_taxonomy from './20260630_163857_catalog_taxonomy';

export const migrations = [
  {
    up: migration_20260619_181335_initial.up,
    down: migration_20260619_181335_initial.down,
    name: '20260619_181335_initial',
  },
  {
    up: migration_20260622_172655_partners_add.up,
    down: migration_20260622_172655_partners_add.down,
    name: '20260622_172655_partners_add',
  },
  {
    up: migration_20260630_163857_catalog_taxonomy.up,
    down: migration_20260630_163857_catalog_taxonomy.down,
    name: '20260630_163857_catalog_taxonomy'
  },
];
