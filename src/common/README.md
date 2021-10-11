## example
```js
import { Command } from "./command"
import { Core } from "./core"

const args = {}
let core = new Core()
core.execute(new Command(core.cmds.HouseTypeUpdateCmd, args))
```