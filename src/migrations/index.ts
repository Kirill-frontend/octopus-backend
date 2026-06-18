import * as migration_20260616_143909_init_schema from './20260616_143909_init_schema';
import * as migration_20260618_145206_add_centered_image_section_block from './20260618_145206_add_centered_image_section_block';

export const migrations = [
  {
    up: migration_20260616_143909_init_schema.up,
    down: migration_20260616_143909_init_schema.down,
    name: '20260616_143909_init_schema',
  },
  {
    up: migration_20260618_145206_add_centered_image_section_block.up,
    down: migration_20260618_145206_add_centered_image_section_block.down,
    name: '20260618_145206_add_centered_image_section_block'
  },
];
