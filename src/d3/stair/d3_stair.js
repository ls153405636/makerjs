import { Types } from "../../types/stair_v2";
import { BaseModel } from "../d3_base_model";
import { D3Config, D3Default } from "../d3_config";
import { D3Scene } from "../d3_scene";
import d3_tool from "../d3_tool";
import { BigColumn } from "./d3_big_col";
import { Flight } from "./d3_flight";
import { Girder } from "./d3_girder";
import { Handrail } from "./d3_handrail";
import { HangingBoard } from "./d3_hanging_board";
import { SmallColumn } from "./d3_small_col";


export class Stair extends BaseModel {
  /**
   * 整套楼梯
   * @param {Types.Stair} vPB 
   */
  constructor(vPB) {
    super(vPB.uuid)
    this.init(vPB)
  }

  dispose() {
    for (const f of this.flights) {
      f.dispose()
    }
    for (const g of this.girders) {
      g.dispose()
    }
    for (const h of this.handrails) {
      h.dispose()
    }
    for (const sCol of this.smallColumns) {
      sCol.dispose()
    }
    for (const bCol of this.bigColumns) {
      bCol.dispose()
    }
    if (this.hangingBoard) {
      this.hangingBoard.dispose()
    }
    new D3Scene().render()
    super.dispose()
  }

  /**
   * 
   * @param {Types.Stair} vPB 
   */
  init(vPB) {
    /**@type {Flight} */
    this.flights = []
    this.girders = []
    this.handrails = []
    this.smallColumns = []
    this.bigColumns = []
    this.hangingBoard = null
    this.exitType = vPB.exitType
    this.position = d3_tool.translateCoord(vPB.position)
    if (vPB.hangingBoard) {
      this.hangingBoard = new HangingBoard(this, vPB.hangingBoard)
    }
    for (let i = 0; i < vPB.flights.length; i++) {
      let f = vPB.flights[i]
      this.flights.push(new Flight(this, f, vPB.treadParameters, vPB.riserParameters))
    }
    for (const l of vPB.landings) {
      this.flights.push(new Flight(this, l, vPB.treadParameters, vPB.riserParameters))
    }
    for (let i = 0; i < vPB.girders.length; i++) {
      let g = vPB.girders[i]
      this.girders.push(new Girder(this, g, vPB.girderParameters))
    }
    for (let i = 0; i < vPB.handrails.length; i++) {
      let h = vPB.handrails[i]
      this.handrails.push(new Handrail(this, h, vPB.handrailParameters))
    }
    for (const sCol of vPB.smallColumns) {
      this.smallColumns.push(new SmallColumn(this, sCol, vPB.smallColParameters))
    }
    for (const bCol of vPB.bigColumns) {
      this.bigColumns.push(new BigColumn(this, bCol, vPB.bigColParameters))
    }
    this.createObj()
  }

  createObj() {
    this.obj = new THREE.Group()
    for (const f of this.flights) {
      f.getObj() && this.obj.add(f.getObj())
    }
    for (const g of this.girders) {
      g.getObj() && this.obj.add(g.getObj())
    }
    for (const h of this.handrails) {
      h.getObj() && this.obj.add(h.getObj())
    }
    for (const sCol of this.smallColumns) {
      sCol.getObj() && this.obj.add(sCol.getObj())
    }
    for (const bCol of this.bigColumns) {
      bCol.getObj() && this.obj.add(bCol.getObj())
    }
    if (this.hangingBoard) {
      this.hangingBoard.getObj() && this.obj.add(this.hangingBoard.getObj())
    }
    this.obj.position.copy(this.position)
    D3Config.OBJS.push(this.obj)
  }
}