import * as migration_20260619_181335_initial from './20260619_181335_initial';
import * as migration_20260622_172655_partners_add from './20260622_172655_partners_add';
import * as migration_20260630_163857_catalog_taxonomy from './20260630_163857_catalog_taxonomy';
import * as migration_20260709_101139_add_product_ingredients from './20260709_101139_add_product_ingredients';
import * as migration_20260713_142236_refactor_active_components from './20260713_142236_refactor_active_components';
import * as migration_20260715_124416_ingredients_rich_text from './20260715_124416_ingredients_rich_text';
import * as migration_20260730_193100_submissions_add from './20260730_193100_submissions_add';

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
    name: '20260630_163857_catalog_taxonomy',
  },
  {
    up: migration_20260709_101139_add_product_ingredients.up,
    down: migration_20260709_101139_add_product_ingredients.down,
    name: '20260709_101139_add_product_ingredients',
  },
  {
    up: migration_20260713_142236_refactor_active_components.up,
    down: migration_20260713_142236_refactor_active_components.down,
    name: '20260713_142236_refactor_active_components',
  },
  {
    up: migration_20260715_124416_ingredients_rich_text.up,
    down: migration_20260715_124416_ingredients_rich_text.down,
    name: '20260715_124416_ingredients_rich_text',
  },
  {
    up: migration_20260730_193100_submissions_add.up,
    down: migration_20260730_193100_submissions_add.down,
    name: '20260730_193100_submissions_add'
  },
];
