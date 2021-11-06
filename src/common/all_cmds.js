import { D2BootCmd } from '../d2/cmds/d2_boot_cmd'
import { D2SelectCmd } from '../d2/cmds/d2_select_cmd'
import { D3BootCmd } from '../d3/cmds/d3_boot_cmd'
import { StrucEleAddCmd } from '../structure/cmds/strcu_ele_add_cmd'
import { StrucEleDelCmd } from '../structure/cmds/struc_ele_del_cmd'
import { StrucHoleInitCmd } from '../structure/cmds/struc_hole_init_cmd'
import { StrucSelecteCmd } from '../structure/cmds/struc_selecte_cmd'
import { StrucStairInitCmd } from '../structure/cmds/struc_stair_init_cmd'
import { StrucUpdateCmd } from '../structure/cmds/struc_update_cmd'

export const allCmds = {
  BootCmd: {
    addHistory: false,
    d2: D2BootCmd,
    d3: D3BootCmd,
  },

  HoleInitCmd: {
    struc: StrucHoleInitCmd,
  },

  StairInitCmd: {
    struc: StrucStairInitCmd,
  },

  ProjImportCmd: {},

  EleAddCmd: {
    struc: StrucEleAddCmd,
  },

  EleDelCmd: {
    struc: StrucEleDelCmd,
  },

  EleUpdateCmd: {
    struc: StrucUpdateCmd,
  },

  SelecteCmd: {
    struc: StrucSelecteCmd,
    d2: D2SelectCmd,
  },
}
