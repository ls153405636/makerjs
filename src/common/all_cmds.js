import { D2BootCmd } from '../d2/cmds/d2_boot_cmd'
import { D3BootCmd } from '../d3/cmds/d3_boot_cmd'
import { StrucHoleInitCmd } from '../structure/cmds/struc_hole_init_cmd'
import { StrucSelectedCmd } from '../structure/cmds/struc_selected_cmd'
import { StrucStairInitCmd } from '../structure/cmds/struc_stair_init_cmd'

export const allCmds = {
  BootCmd: {
    addHistory: false,
    d2: D2BootCmd,
    d3: D3BootCmd,
  },

  HoleInitCmd: {
    struc: StrucHoleInitCmd
  },

  StairInitCmd: {
    struc: StrucStairInitCmd
  },

  ProjImportCmd: {

  },

  EleAddCmd: {

  },

  EleDelCmd: {

  },

  EleUpdateCmd: {

  },

  SelectedCmd: {
    struc: StrucSelectedCmd,
  },
}
