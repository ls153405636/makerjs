/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const Types = $root.Types = (() => {

    /**
     * Namespace Types.
     * @exports Types
     * @namespace
     */
    const Types = {};

    /**
     * EdgeType enum.
     * @name Types.EdgeType
     * @enum {number}
     * @property {number} eph=0 eph value
     * @property {number} estraight=1 estraight value
     * @property {number} earc=2 earc value
     * @property {number} ebeszer=3 ebeszer value
     */
    Types.EdgeType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "eph"] = 0;
        values[valuesById[1] = "estraight"] = 1;
        values[valuesById[2] = "earc"] = 2;
        values[valuesById[3] = "ebeszer"] = 3;
        return values;
    })();

    /**
     * WallType enum.
     * @name Types.WallType
     * @enum {number}
     * @property {number} wph=0 wph value
     * @property {number} wfirst=1 wfirst value
     * @property {number} wsecond=2 wsecond value
     * @property {number} wboth=3 wboth value
     * @property {number} wnone=4 wnone value
     */
    Types.WallType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "wph"] = 0;
        values[valuesById[1] = "wfirst"] = 1;
        values[valuesById[2] = "wsecond"] = 2;
        values[valuesById[3] = "wboth"] = 3;
        values[valuesById[4] = "wnone"] = 4;
        return values;
    })();

    /**
     * AgainstWallType enum.
     * @name Types.AgainstWallType
     * @enum {number}
     * @property {number} aw_ph=0 aw_ph value
     * @property {number} aw_no=1 aw_no value
     * @property {number} aw_left=2 aw_left value
     * @property {number} aw_right=3 aw_right value
     */
    Types.AgainstWallType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "aw_ph"] = 0;
        values[valuesById[1] = "aw_no"] = 1;
        values[valuesById[2] = "aw_left"] = 2;
        values[valuesById[3] = "aw_right"] = 3;
        return values;
    })();

    /**
     * StairType enum.
     * @name Types.StairType
     * @enum {number}
     * @property {number} sph=0 sph value
     * @property {number} sstright=1 sstright value
     * @property {number} sl_type=2 sl_type value
     * @property {number} s_small_u_type=3 s_small_u_type value
     * @property {number} s_big_u_type=4 s_big_u_type value
     */
    Types.StairType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "sph"] = 0;
        values[valuesById[1] = "sstright"] = 1;
        values[valuesById[2] = "sl_type"] = 2;
        values[valuesById[3] = "s_small_u_type"] = 3;
        values[valuesById[4] = "s_big_u_type"] = 4;
        return values;
    })();

    /**
     * Side enum.
     * @name Types.Side
     * @enum {number}
     * @property {number} si_ph=0 si_ph value
     * @property {number} si_left=1 si_left value
     * @property {number} si_right=2 si_right value
     */
    Types.Side = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "si_ph"] = 0;
        values[valuesById[1] = "si_left"] = 1;
        values[valuesById[2] = "si_right"] = 2;
        return values;
    })();

    /**
     * LandingCutType enum.
     * @name Types.LandingCutType
     * @enum {number}
     * @property {number} lct_ph=0 lct_ph value
     * @property {number} lct_first=1 lct_first value
     * @property {number} lct_second=2 lct_second value
     * @property {number} lct_third=3 lct_third value
     * @property {number} lct_fourth=4 lct_fourth value
     * @property {number} lct_fifth=5 lct_fifth value
     */
    Types.LandingCutType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "lct_ph"] = 0;
        values[valuesById[1] = "lct_first"] = 1;
        values[valuesById[2] = "lct_second"] = 2;
        values[valuesById[3] = "lct_third"] = 3;
        values[valuesById[4] = "lct_fourth"] = 4;
        values[valuesById[5] = "lct_fifth"] = 5;
        return values;
    })();

    /**
     * StepNumRule enum.
     * @name Types.StepNumRule
     * @enum {number}
     * @property {number} snr_ph=0 snr_ph value
     * @property {number} snr_n=1 snr_n value
     * @property {number} snr_n_add_1=2 snr_n_add_1 value
     */
    Types.StepNumRule = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "snr_ph"] = 0;
        values[valuesById[1] = "snr_n"] = 1;
        values[valuesById[2] = "snr_n_add_1"] = 2;
        return values;
    })();

    /**
     * NossingType enum.
     * @name Types.NossingType
     * @enum {number}
     * @property {number} nph=0 nph value
     * @property {number} nno=1 nno value
     * @property {number} ncommon=2 ncommon value
     * @property {number} nluxury=3 nluxury value
     */
    Types.NossingType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "nph"] = 0;
        values[valuesById[1] = "nno"] = 1;
        values[valuesById[2] = "ncommon"] = 2;
        values[valuesById[3] = "nluxury"] = 3;
        return values;
    })();

    /**
     * ComponentType enum.
     * @name Types.ComponentType
     * @enum {number}
     * @property {number} cph=0 cph value
     * @property {number} cdoor=1 cdoor value
     * @property {number} cwindow=2 cwindow value
     * @property {number} cdoor_hole=3 cdoor_hole value
     * @property {number} cbeam=4 cbeam value
     * @property {number} cpillar=5 cpillar value
     */
    Types.ComponentType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "cph"] = 0;
        values[valuesById[1] = "cdoor"] = 1;
        values[valuesById[2] = "cwindow"] = 2;
        values[valuesById[3] = "cdoor_hole"] = 3;
        values[valuesById[4] = "cbeam"] = 4;
        values[valuesById[5] = "cpillar"] = 5;
        return values;
    })();

    /**
     * BigColumnPosType enum.
     * @name Types.BigColumnPosType
     * @enum {number}
     * @property {number} bcp_ph=0 bcp_ph value
     * @property {number} bcp_floor=1 bcp_floor value
     * @property {number} bcp_first=2 bcp_first value
     * @property {number} bcp_second=3 bcp_second value
     */
    Types.BigColumnPosType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "bcp_ph"] = 0;
        values[valuesById[1] = "bcp_floor"] = 1;
        values[valuesById[2] = "bcp_first"] = 2;
        values[valuesById[3] = "bcp_second"] = 3;
        return values;
    })();

    /**
     * BigColumnType enum.
     * @name Types.BigColumnType
     * @enum {number}
     * @property {number} bc_ph=0 bc_ph value
     * @property {number} bc_common=1 bc_common value
     * @property {number} bc_support=2 bc_support value
     * @property {number} bc_start=3 bc_start value
     */
    Types.BigColumnType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "bc_ph"] = 0;
        values[valuesById[1] = "bc_common"] = 1;
        values[valuesById[2] = "bc_support"] = 2;
        values[valuesById[3] = "bc_start"] = 3;
        return values;
    })();

    /**
     * ArrangeRule enum.
     * @name Types.ArrangeRule
     * @enum {number}
     * @property {number} arph=0 arph value
     * @property {number} arrFour=1 arrFour value
     * @property {number} arrThree=2 arrThree value
     * @property {number} arrTwo=3 arrTwo value
     */
    Types.ArrangeRule = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "arph"] = 0;
        values[valuesById[1] = "arrFour"] = 1;
        values[valuesById[2] = "arrThree"] = 2;
        values[valuesById[3] = "arrTwo"] = 3;
        return values;
    })();

    /**
     * GirderType enum.
     * @name Types.GirderType
     * @enum {number}
     * @property {number} gph=0 gph value
     * @property {number} gslab=1 gslab value
     * @property {number} gsaw=2 gsaw value
     */
    Types.GirderType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "gph"] = 0;
        values[valuesById[1] = "gslab"] = 1;
        values[valuesById[2] = "gsaw"] = 2;
        return values;
    })();

    /**
     * TreadType enum.
     * @name Types.TreadType
     * @enum {number}
     * @property {number} tph=0 tph value
     * @property {number} trect=1 trect value
     * @property {number} tStart=2 tStart value
     * @property {number} tSpec=3 tSpec value
     * @property {number} tCor=4 tCor value
     */
    Types.TreadType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "tph"] = 0;
        values[valuesById[1] = "trect"] = 1;
        values[valuesById[2] = "tStart"] = 2;
        values[valuesById[3] = "tSpec"] = 3;
        values[valuesById[4] = "tCor"] = 4;
        return values;
    })();

    /**
     * StartTreadType enum.
     * @name Types.StartTreadType
     * @enum {number}
     * @property {number} stph=0 stph value
     * @property {number} st_el=1 st_el value
     * @property {number} st_el_2=2 st_el_2 value
     * @property {number} st_rr=3 st_rr value
     * @property {number} st_rr_2=4 st_rr_2 value
     */
    Types.StartTreadType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "stph"] = 0;
        values[valuesById[1] = "st_el"] = 1;
        values[valuesById[2] = "st_el_2"] = 2;
        values[valuesById[3] = "st_rr"] = 3;
        values[valuesById[4] = "st_rr_2"] = 4;
        return values;
    })();

    /**
     * StartTreadShapeType enum.
     * @name Types.StartTreadShapeType
     * @enum {number}
     * @property {number} stsph=0 stsph value
     * @property {number} sts_no=1 sts_no value
     * @property {number} sts_left=2 sts_left value
     * @property {number} sts_right=3 sts_right value
     */
    Types.StartTreadShapeType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "stsph"] = 0;
        values[valuesById[1] = "sts_no"] = 1;
        values[valuesById[2] = "sts_left"] = 2;
        values[valuesById[3] = "sts_right"] = 3;
        return values;
    })();

    Types.Vector3 = (function() {

        /**
         * Properties of a Vector3.
         * @memberof Types
         * @interface IVector3
         * @property {number|null} [x] Vector3 x
         * @property {number|null} [y] Vector3 y
         * @property {number|null} [z] Vector3 z
         */

        /**
         * Constructs a new Vector3.
         * @memberof Types
         * @classdesc Represents a Vector3.
         * @implements IVector3
         * @constructor
         * @param {Types.IVector3=} [properties] Properties to set
         */
        function Vector3(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Vector3 x.
         * @member {number} x
         * @memberof Types.Vector3
         * @instance
         */
        Vector3.prototype.x = 0;

        /**
         * Vector3 y.
         * @member {number} y
         * @memberof Types.Vector3
         * @instance
         */
        Vector3.prototype.y = 0;

        /**
         * Vector3 z.
         * @member {number} z
         * @memberof Types.Vector3
         * @instance
         */
        Vector3.prototype.z = 0;

        /**
         * Creates a new Vector3 instance using the specified properties.
         * @function create
         * @memberof Types.Vector3
         * @static
         * @param {Types.IVector3=} [properties] Properties to set
         * @returns {Types.Vector3} Vector3 instance
         */
        Vector3.create = function create(properties) {
            return new Vector3(properties);
        };

        /**
         * Encodes the specified Vector3 message. Does not implicitly {@link Types.Vector3.verify|verify} messages.
         * @function encode
         * @memberof Types.Vector3
         * @static
         * @param {Types.IVector3} message Vector3 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Vector3.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                writer.uint32(/* id 1, wireType 5 =*/13).float(message.x);
            if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.y);
            if (message.z != null && Object.hasOwnProperty.call(message, "z"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.z);
            return writer;
        };

        /**
         * Encodes the specified Vector3 message, length delimited. Does not implicitly {@link Types.Vector3.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Types.Vector3
         * @static
         * @param {Types.IVector3} message Vector3 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Vector3.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Vector3 message from the specified reader or buffer.
         * @function decode
         * @memberof Types.Vector3
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Types.Vector3} Vector3
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Vector3.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Types.Vector3();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.x = reader.float();
                    break;
                case 2:
                    message.y = reader.float();
                    break;
                case 3:
                    message.z = reader.float();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Vector3 message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Types.Vector3
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Types.Vector3} Vector3
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Vector3.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Vector3 message.
         * @function verify
         * @memberof Types.Vector3
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Vector3.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.x != null && message.hasOwnProperty("x"))
                if (typeof message.x !== "number")
                    return "x: number expected";
            if (message.y != null && message.hasOwnProperty("y"))
                if (typeof message.y !== "number")
                    return "y: number expected";
            if (message.z != null && message.hasOwnProperty("z"))
                if (typeof message.z !== "number")
                    return "z: number expected";
            return null;
        };

        /**
         * Creates a Vector3 message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Types.Vector3
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Types.Vector3} Vector3
         */
        Vector3.fromObject = function fromObject(object) {
            if (object instanceof $root.Types.Vector3)
                return object;
            let message = new $root.Types.Vector3();
            if (object.x != null)
                message.x = Number(object.x);
            if (object.y != null)
                message.y = Number(object.y);
            if (object.z != null)
                message.z = Number(object.z);
            return message;
        };

        /**
         * Creates a plain object from a Vector3 message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Types.Vector3
         * @static
         * @param {Types.Vector3} message Vector3
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Vector3.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.x = 0;
                object.y = 0;
                object.z = 0;
            }
            if (message.x != null && message.hasOwnProperty("x"))
                object.x = options.json && !isFinite(message.x) ? String(message.x) : message.x;
            if (message.y != null && message.hasOwnProperty("y"))
                object.y = options.json && !isFinite(message.y) ? String(message.y) : message.y;
            if (message.z != null && message.hasOwnProperty("z"))
                object.z = options.json && !isFinite(message.z) ? String(message.z) : message.z;
            return object;
        };

        /**
         * Converts this Vector3 to JSON.
         * @function toJSON
         * @memberof Types.Vector3
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Vector3.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Vector3;
    })();

    Types.Edge = (function() {

        /**
         * Properties of an Edge.
         * @memberof Types
         * @interface IEdge
         * @property {Types.IVector3|null} [p1] Edge p1
         * @property {Types.IVector3|null} [p2] Edge p2
         * @property {Types.EdgeType|null} [type] Edge type
         * @property {number|null} [radius] Edge radius
         * @property {Types.IVector3|null} [position] Edge position
         * @property {number|null} [startAngle] Edge startAngle
         * @property {number|null} [endAngle] Edge endAngle
         * @property {boolean|null} [isClockwise] Edge isClockwise
         * @property {Types.IVector3|null} [controlPos] Edge controlPos
         */

        /**
         * Constructs a new Edge.
         * @memberof Types
         * @classdesc Represents an Edge.
         * @implements IEdge
         * @constructor
         * @param {Types.IEdge=} [properties] Properties to set
         */
        function Edge(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Edge p1.
         * @member {Types.IVector3|null|undefined} p1
         * @memberof Types.Edge
         * @instance
         */
        Edge.prototype.p1 = null;

        /**
         * Edge p2.
         * @member {Types.IVector3|null|undefined} p2
         * @memberof Types.Edge
         * @instance
         */
        Edge.prototype.p2 = null;

        /**
         * Edge type.
         * @member {Types.EdgeType} type
         * @memberof Types.Edge
         * @instance
         */
        Edge.prototype.type = 0;

        /**
         * Edge radius.
         * @member {number} radius
         * @memberof Types.Edge
         * @instance
         */
        Edge.prototype.radius = 0;

        /**
         * Edge position.
         * @member {Types.IVector3|null|undefined} position
         * @memberof Types.Edge
         * @instance
         */
        Edge.prototype.position = null;

        /**
         * Edge startAngle.
         * @member {number} startAngle
         * @memberof Types.Edge
         * @instance
         */
        Edge.prototype.startAngle = 0;

        /**
         * Edge endAngle.
         * @member {number} endAngle
         * @memberof Types.Edge
         * @instance
         */
        Edge.prototype.endAngle = 0;

        /**
         * Edge isClockwise.
         * @member {boolean} isClockwise
         * @memberof Types.Edge
         * @instance
         */
        Edge.prototype.isClockwise = false;

        /**
         * Edge controlPos.
         * @member {Types.IVector3|null|undefined} controlPos
         * @memberof Types.Edge
         * @instance
         */
        Edge.prototype.controlPos = null;

        /**
         * Creates a new Edge instance using the specified properties.
         * @function create
         * @memberof Types.Edge
         * @static
         * @param {Types.IEdge=} [properties] Properties to set
         * @returns {Types.Edge} Edge instance
         */
        Edge.create = function create(properties) {
            return new Edge(properties);
        };

        /**
         * Encodes the specified Edge message. Does not implicitly {@link Types.Edge.verify|verify} messages.
         * @function encode
         * @memberof Types.Edge
         * @static
         * @param {Types.IEdge} message Edge message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Edge.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.p1 != null && Object.hasOwnProperty.call(message, "p1"))
                $root.Types.Vector3.encode(message.p1, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.p2 != null && Object.hasOwnProperty.call(message, "p2"))
                $root.Types.Vector3.encode(message.p2, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.type);
            if (message.radius != null && Object.hasOwnProperty.call(message, "radius"))
                writer.uint32(/* id 4, wireType 5 =*/37).float(message.radius);
            if (message.position != null && Object.hasOwnProperty.call(message, "position"))
                $root.Types.Vector3.encode(message.position, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.startAngle != null && Object.hasOwnProperty.call(message, "startAngle"))
                writer.uint32(/* id 6, wireType 5 =*/53).float(message.startAngle);
            if (message.endAngle != null && Object.hasOwnProperty.call(message, "endAngle"))
                writer.uint32(/* id 7, wireType 5 =*/61).float(message.endAngle);
            if (message.isClockwise != null && Object.hasOwnProperty.call(message, "isClockwise"))
                writer.uint32(/* id 8, wireType 0 =*/64).bool(message.isClockwise);
            if (message.controlPos != null && Object.hasOwnProperty.call(message, "controlPos"))
                $root.Types.Vector3.encode(message.controlPos, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Edge message, length delimited. Does not implicitly {@link Types.Edge.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Types.Edge
         * @static
         * @param {Types.IEdge} message Edge message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Edge.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Edge message from the specified reader or buffer.
         * @function decode
         * @memberof Types.Edge
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Types.Edge} Edge
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Edge.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Types.Edge();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.p1 = $root.Types.Vector3.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.p2 = $root.Types.Vector3.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.type = reader.int32();
                    break;
                case 4:
                    message.radius = reader.float();
                    break;
                case 5:
                    message.position = $root.Types.Vector3.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.startAngle = reader.float();
                    break;
                case 7:
                    message.endAngle = reader.float();
                    break;
                case 8:
                    message.isClockwise = reader.bool();
                    break;
                case 9:
                    message.controlPos = $root.Types.Vector3.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Edge message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Types.Edge
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Types.Edge} Edge
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Edge.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Edge message.
         * @function verify
         * @memberof Types.Edge
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Edge.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.p1 != null && message.hasOwnProperty("p1")) {
                let error = $root.Types.Vector3.verify(message.p1);
                if (error)
                    return "p1." + error;
            }
            if (message.p2 != null && message.hasOwnProperty("p2")) {
                let error = $root.Types.Vector3.verify(message.p2);
                if (error)
                    return "p2." + error;
            }
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                }
            if (message.radius != null && message.hasOwnProperty("radius"))
                if (typeof message.radius !== "number")
                    return "radius: number expected";
            if (message.position != null && message.hasOwnProperty("position")) {
                let error = $root.Types.Vector3.verify(message.position);
                if (error)
                    return "position." + error;
            }
            if (message.startAngle != null && message.hasOwnProperty("startAngle"))
                if (typeof message.startAngle !== "number")
                    return "startAngle: number expected";
            if (message.endAngle != null && message.hasOwnProperty("endAngle"))
                if (typeof message.endAngle !== "number")
                    return "endAngle: number expected";
            if (message.isClockwise != null && message.hasOwnProperty("isClockwise"))
                if (typeof message.isClockwise !== "boolean")
                    return "isClockwise: boolean expected";
            if (message.controlPos != null && message.hasOwnProperty("controlPos")) {
                let error = $root.Types.Vector3.verify(message.controlPos);
                if (error)
                    return "controlPos." + error;
            }
            return null;
        };

        /**
         * Creates an Edge message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Types.Edge
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Types.Edge} Edge
         */
        Edge.fromObject = function fromObject(object) {
            if (object instanceof $root.Types.Edge)
                return object;
            let message = new $root.Types.Edge();
            if (object.p1 != null) {
                if (typeof object.p1 !== "object")
                    throw TypeError(".Types.Edge.p1: object expected");
                message.p1 = $root.Types.Vector3.fromObject(object.p1);
            }
            if (object.p2 != null) {
                if (typeof object.p2 !== "object")
                    throw TypeError(".Types.Edge.p2: object expected");
                message.p2 = $root.Types.Vector3.fromObject(object.p2);
            }
            switch (object.type) {
            case "eph":
            case 0:
                message.type = 0;
                break;
            case "estraight":
            case 1:
                message.type = 1;
                break;
            case "earc":
            case 2:
                message.type = 2;
                break;
            case "ebeszer":
            case 3:
                message.type = 3;
                break;
            }
            if (object.radius != null)
                message.radius = Number(object.radius);
            if (object.position != null) {
                if (typeof object.position !== "object")
                    throw TypeError(".Types.Edge.position: object expected");
                message.position = $root.Types.Vector3.fromObject(object.position);
            }
            if (object.startAngle != null)
                message.startAngle = Number(object.startAngle);
            if (object.endAngle != null)
                message.endAngle = Number(object.endAngle);
            if (object.isClockwise != null)
                message.isClockwise = Boolean(object.isClockwise);
            if (object.controlPos != null) {
                if (typeof object.controlPos !== "object")
                    throw TypeError(".Types.Edge.controlPos: object expected");
                message.controlPos = $root.Types.Vector3.fromObject(object.controlPos);
            }
            return message;
        };

        /**
         * Creates a plain object from an Edge message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Types.Edge
         * @static
         * @param {Types.Edge} message Edge
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Edge.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.p1 = null;
                object.p2 = null;
                object.type = options.enums === String ? "eph" : 0;
                object.radius = 0;
                object.position = null;
                object.startAngle = 0;
                object.endAngle = 0;
                object.isClockwise = false;
                object.controlPos = null;
            }
            if (message.p1 != null && message.hasOwnProperty("p1"))
                object.p1 = $root.Types.Vector3.toObject(message.p1, options);
            if (message.p2 != null && message.hasOwnProperty("p2"))
                object.p2 = $root.Types.Vector3.toObject(message.p2, options);
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.Types.EdgeType[message.type] : message.type;
            if (message.radius != null && message.hasOwnProperty("radius"))
                object.radius = options.json && !isFinite(message.radius) ? String(message.radius) : message.radius;
            if (message.position != null && message.hasOwnProperty("position"))
                object.position = $root.Types.Vector3.toObject(message.position, options);
            if (message.startAngle != null && message.hasOwnProperty("startAngle"))
                object.startAngle = options.json && !isFinite(message.startAngle) ? String(message.startAngle) : message.startAngle;
            if (message.endAngle != null && message.hasOwnProperty("endAngle"))
                object.endAngle = options.json && !isFinite(message.endAngle) ? String(message.endAngle) : message.endAngle;
            if (message.isClockwise != null && message.hasOwnProperty("isClockwise"))
                object.isClockwise = message.isClockwise;
            if (message.controlPos != null && message.hasOwnProperty("controlPos"))
                object.controlPos = $root.Types.Vector3.toObject(message.controlPos, options);
            return object;
        };

        /**
         * Converts this Edge to JSON.
         * @function toJSON
         * @memberof Types.Edge
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Edge.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Edge;
    })();

    Types.Outline = (function() {

        /**
         * Properties of an Outline.
         * @memberof Types
         * @interface IOutline
         * @property {Array.<Types.IEdge>|null} [edges] Outline edges
         * @property {boolean|null} [isClose] Outline isClose
         * @property {boolean|null} [isClock] Outline isClock
         */

        /**
         * Constructs a new Outline.
         * @memberof Types
         * @classdesc Represents an Outline.
         * @implements IOutline
         * @constructor
         * @param {Types.IOutline=} [properties] Properties to set
         */
        function Outline(properties) {
            this.edges = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Outline edges.
         * @member {Array.<Types.IEdge>} edges
         * @memberof Types.Outline
         * @instance
         */
        Outline.prototype.edges = $util.emptyArray;

        /**
         * Outline isClose.
         * @member {boolean} isClose
         * @memberof Types.Outline
         * @instance
         */
        Outline.prototype.isClose = false;

        /**
         * Outline isClock.
         * @member {boolean} isClock
         * @memberof Types.Outline
         * @instance
         */
        Outline.prototype.isClock = false;

        /**
         * Creates a new Outline instance using the specified properties.
         * @function create
         * @memberof Types.Outline
         * @static
         * @param {Types.IOutline=} [properties] Properties to set
         * @returns {Types.Outline} Outline instance
         */
        Outline.create = function create(properties) {
            return new Outline(properties);
        };

        /**
         * Encodes the specified Outline message. Does not implicitly {@link Types.Outline.verify|verify} messages.
         * @function encode
         * @memberof Types.Outline
         * @static
         * @param {Types.IOutline} message Outline message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Outline.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.edges != null && message.edges.length)
                for (let i = 0; i < message.edges.length; ++i)
                    $root.Types.Edge.encode(message.edges[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.isClose != null && Object.hasOwnProperty.call(message, "isClose"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.isClose);
            if (message.isClock != null && Object.hasOwnProperty.call(message, "isClock"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.isClock);
            return writer;
        };

        /**
         * Encodes the specified Outline message, length delimited. Does not implicitly {@link Types.Outline.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Types.Outline
         * @static
         * @param {Types.IOutline} message Outline message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Outline.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Outline message from the specified reader or buffer.
         * @function decode
         * @memberof Types.Outline
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Types.Outline} Outline
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Outline.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Types.Outline();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.edges && message.edges.length))
                        message.edges = [];
                    message.edges.push($root.Types.Edge.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.isClose = reader.bool();
                    break;
                case 3:
                    message.isClock = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Outline message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Types.Outline
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Types.Outline} Outline
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Outline.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Outline message.
         * @function verify
         * @memberof Types.Outline
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Outline.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.edges != null && message.hasOwnProperty("edges")) {
                if (!Array.isArray(message.edges))
                    return "edges: array expected";
                for (let i = 0; i < message.edges.length; ++i) {
                    let error = $root.Types.Edge.verify(message.edges[i]);
                    if (error)
                        return "edges." + error;
                }
            }
            if (message.isClose != null && message.hasOwnProperty("isClose"))
                if (typeof message.isClose !== "boolean")
                    return "isClose: boolean expected";
            if (message.isClock != null && message.hasOwnProperty("isClock"))
                if (typeof message.isClock !== "boolean")
                    return "isClock: boolean expected";
            return null;
        };

        /**
         * Creates an Outline message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Types.Outline
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Types.Outline} Outline
         */
        Outline.fromObject = function fromObject(object) {
            if (object instanceof $root.Types.Outline)
                return object;
            let message = new $root.Types.Outline();
            if (object.edges) {
                if (!Array.isArray(object.edges))
                    throw TypeError(".Types.Outline.edges: array expected");
                message.edges = [];
                for (let i = 0; i < object.edges.length; ++i) {
                    if (typeof object.edges[i] !== "object")
                        throw TypeError(".Types.Outline.edges: object expected");
                    message.edges[i] = $root.Types.Edge.fromObject(object.edges[i]);
                }
            }
            if (object.isClose != null)
                message.isClose = Boolean(object.isClose);
            if (object.isClock != null)
                message.isClock = Boolean(object.isClock);
            return message;
        };

        /**
         * Creates a plain object from an Outline message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Types.Outline
         * @static
         * @param {Types.Outline} message Outline
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Outline.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.edges = [];
            if (options.defaults) {
                object.isClose = false;
                object.isClock = false;
            }
            if (message.edges && message.edges.length) {
                object.edges = [];
                for (let j = 0; j < message.edges.length; ++j)
                    object.edges[j] = $root.Types.Edge.toObject(message.edges[j], options);
            }
            if (message.isClose != null && message.hasOwnProperty("isClose"))
                object.isClose = message.isClose;
            if (message.isClock != null && message.hasOwnProperty("isClock"))
                object.isClock = message.isClock;
            return object;
        };

        /**
         * Converts this Outline to JSON.
         * @function toJSON
         * @memberof Types.Outline
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Outline.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Outline;
    })();

    Types.Border = (function() {

        /**
         * Properties of a Border.
         * @memberof Types
         * @interface IBorder
         * @property {Array.<Types.ISideEdges>|null} [out] Border out
         * @property {Array.<Types.ISideEdges>|null} ["in"] Border in
         * @property {Array.<Types.ISideEdges>|null} [front] Border front
         * @property {Array.<Types.ISideEdges>|null} [back] Border back
         */

        /**
         * Constructs a new Border.
         * @memberof Types
         * @classdesc Represents a Border.
         * @implements IBorder
         * @constructor
         * @param {Types.IBorder=} [properties] Properties to set
         */
        function Border(properties) {
            this.out = [];
            this["in"] = [];
            this.front = [];
            this.back = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Border out.
         * @member {Array.<Types.ISideEdges>} out
         * @memberof Types.Border
         * @instance
         */
        Border.prototype.out = $util.emptyArray;

        /**
         * Border in.
         * @member {Array.<Types.ISideEdges>} in
         * @memberof Types.Border
         * @instance
         */
        Border.prototype["in"] = $util.emptyArray;

        /**
         * Border front.
         * @member {Array.<Types.ISideEdges>} front
         * @memberof Types.Border
         * @instance
         */
        Border.prototype.front = $util.emptyArray;

        /**
         * Border back.
         * @member {Array.<Types.ISideEdges>} back
         * @memberof Types.Border
         * @instance
         */
        Border.prototype.back = $util.emptyArray;

        /**
         * Creates a new Border instance using the specified properties.
         * @function create
         * @memberof Types.Border
         * @static
         * @param {Types.IBorder=} [properties] Properties to set
         * @returns {Types.Border} Border instance
         */
        Border.create = function create(properties) {
            return new Border(properties);
        };

        /**
         * Encodes the specified Border message. Does not implicitly {@link Types.Border.verify|verify} messages.
         * @function encode
         * @memberof Types.Border
         * @static
         * @param {Types.IBorder} message Border message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Border.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.out != null && message.out.length)
                for (let i = 0; i < message.out.length; ++i)
                    $root.Types.SideEdges.encode(message.out[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message["in"] != null && message["in"].length)
                for (let i = 0; i < message["in"].length; ++i)
                    $root.Types.SideEdges.encode(message["in"][i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.front != null && message.front.length)
                for (let i = 0; i < message.front.length; ++i)
                    $root.Types.SideEdges.encode(message.front[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.back != null && message.back.length)
                for (let i = 0; i < message.back.length; ++i)
                    $root.Types.SideEdges.encode(message.back[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Border message, length delimited. Does not implicitly {@link Types.Border.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Types.Border
         * @static
         * @param {Types.IBorder} message Border message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Border.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Border message from the specified reader or buffer.
         * @function decode
         * @memberof Types.Border
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Types.Border} Border
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Border.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Types.Border();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.out && message.out.length))
                        message.out = [];
                    message.out.push($root.Types.SideEdges.decode(reader, reader.uint32()));
                    break;
                case 2:
                    if (!(message["in"] && message["in"].length))
                        message["in"] = [];
                    message["in"].push($root.Types.SideEdges.decode(reader, reader.uint32()));
                    break;
                case 3:
                    if (!(message.front && message.front.length))
                        message.front = [];
                    message.front.push($root.Types.SideEdges.decode(reader, reader.uint32()));
                    break;
                case 4:
                    if (!(message.back && message.back.length))
                        message.back = [];
                    message.back.push($root.Types.SideEdges.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Border message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Types.Border
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Types.Border} Border
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Border.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Border message.
         * @function verify
         * @memberof Types.Border
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Border.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.out != null && message.hasOwnProperty("out")) {
                if (!Array.isArray(message.out))
                    return "out: array expected";
                for (let i = 0; i < message.out.length; ++i) {
                    let error = $root.Types.SideEdges.verify(message.out[i]);
                    if (error)
                        return "out." + error;
                }
            }
            if (message["in"] != null && message.hasOwnProperty("in")) {
                if (!Array.isArray(message["in"]))
                    return "in: array expected";
                for (let i = 0; i < message["in"].length; ++i) {
                    let error = $root.Types.SideEdges.verify(message["in"][i]);
                    if (error)
                        return "in." + error;
                }
            }
            if (message.front != null && message.hasOwnProperty("front")) {
                if (!Array.isArray(message.front))
                    return "front: array expected";
                for (let i = 0; i < message.front.length; ++i) {
                    let error = $root.Types.SideEdges.verify(message.front[i]);
                    if (error)
                        return "front." + error;
                }
            }
            if (message.back != null && message.hasOwnProperty("back")) {
                if (!Array.isArray(message.back))
                    return "back: array expected";
                for (let i = 0; i < message.back.length; ++i) {
                    let error = $root.Types.SideEdges.verify(message.back[i]);
                    if (error)
                        return "back." + error;
                }
            }
            return null;
        };

        /**
         * Creates a Border message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Types.Border
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Types.Border} Border
         */
        Border.fromObject = function fromObject(object) {
            if (object instanceof $root.Types.Border)
                return object;
            let message = new $root.Types.Border();
            if (object.out) {
                if (!Array.isArray(object.out))
                    throw TypeError(".Types.Border.out: array expected");
                message.out = [];
                for (let i = 0; i < object.out.length; ++i) {
                    if (typeof object.out[i] !== "object")
                        throw TypeError(".Types.Border.out: object expected");
                    message.out[i] = $root.Types.SideEdges.fromObject(object.out[i]);
                }
            }
            if (object["in"]) {
                if (!Array.isArray(object["in"]))
                    throw TypeError(".Types.Border.in: array expected");
                message["in"] = [];
                for (let i = 0; i < object["in"].length; ++i) {
                    if (typeof object["in"][i] !== "object")
                        throw TypeError(".Types.Border.in: object expected");
                    message["in"][i] = $root.Types.SideEdges.fromObject(object["in"][i]);
                }
            }
            if (object.front) {
                if (!Array.isArray(object.front))
                    throw TypeError(".Types.Border.front: array expected");
                message.front = [];
                for (let i = 0; i < object.front.length; ++i) {
                    if (typeof object.front[i] !== "object")
                        throw TypeError(".Types.Border.front: object expected");
                    message.front[i] = $root.Types.SideEdges.fromObject(object.front[i]);
                }
            }
            if (object.back) {
                if (!Array.isArray(object.back))
                    throw TypeError(".Types.Border.back: array expected");
                message.back = [];
                for (let i = 0; i < object.back.length; ++i) {
                    if (typeof object.back[i] !== "object")
                        throw TypeError(".Types.Border.back: object expected");
                    message.back[i] = $root.Types.SideEdges.fromObject(object.back[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a Border message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Types.Border
         * @static
         * @param {Types.Border} message Border
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Border.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.out = [];
                object["in"] = [];
                object.front = [];
                object.back = [];
            }
            if (message.out && message.out.length) {
                object.out = [];
                for (let j = 0; j < message.out.length; ++j)
                    object.out[j] = $root.Types.SideEdges.toObject(message.out[j], options);
            }
            if (message["in"] && message["in"].length) {
                object["in"] = [];
                for (let j = 0; j < message["in"].length; ++j)
                    object["in"][j] = $root.Types.SideEdges.toObject(message["in"][j], options);
            }
            if (message.front && message.front.length) {
                object.front = [];
                for (let j = 0; j < message.front.length; ++j)
                    object.front[j] = $root.Types.SideEdges.toObject(message.front[j], options);
            }
            if (message.back && message.back.length) {
                object.back = [];
                for (let j = 0; j < message.back.length; ++j)
                    object.back[j] = $root.Types.SideEdges.toObject(message.back[j], options);
            }
            return object;
        };

        /**
         * Converts this Border to JSON.
         * @function toJSON
         * @memberof Types.Border
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Border.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Border;
    })();

    Types.SideEdges = (function() {

        /**
         * Properties of a SideEdges.
         * @memberof Types
         * @interface ISideEdges
         * @property {Array.<Types.IEdge>|null} [edges] SideEdges edges
         * @property {Types.IEdge|null} [totalEdge] SideEdges totalEdge
         * @property {Array.<Types.IGirder>|null} [girders] SideEdges girders
         */

        /**
         * Constructs a new SideEdges.
         * @memberof Types
         * @classdesc Represents a SideEdges.
         * @implements ISideEdges
         * @constructor
         * @param {Types.ISideEdges=} [properties] Properties to set
         */
        function SideEdges(properties) {
            this.edges = [];
            this.girders = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SideEdges edges.
         * @member {Array.<Types.IEdge>} edges
         * @memberof Types.SideEdges
         * @instance
         */
        SideEdges.prototype.edges = $util.emptyArray;

        /**
         * SideEdges totalEdge.
         * @member {Types.IEdge|null|undefined} totalEdge
         * @memberof Types.SideEdges
         * @instance
         */
        SideEdges.prototype.totalEdge = null;

        /**
         * SideEdges girders.
         * @member {Array.<Types.IGirder>} girders
         * @memberof Types.SideEdges
         * @instance
         */
        SideEdges.prototype.girders = $util.emptyArray;

        /**
         * Creates a new SideEdges instance using the specified properties.
         * @function create
         * @memberof Types.SideEdges
         * @static
         * @param {Types.ISideEdges=} [properties] Properties to set
         * @returns {Types.SideEdges} SideEdges instance
         */
        SideEdges.create = function create(properties) {
            return new SideEdges(properties);
        };

        /**
         * Encodes the specified SideEdges message. Does not implicitly {@link Types.SideEdges.verify|verify} messages.
         * @function encode
         * @memberof Types.SideEdges
         * @static
         * @param {Types.ISideEdges} message SideEdges message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SideEdges.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.edges != null && message.edges.length)
                for (let i = 0; i < message.edges.length; ++i)
                    $root.Types.Edge.encode(message.edges[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.totalEdge != null && Object.hasOwnProperty.call(message, "totalEdge"))
                $root.Types.Edge.encode(message.totalEdge, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.girders != null && message.girders.length)
                for (let i = 0; i < message.girders.length; ++i)
                    $root.Types.Girder.encode(message.girders[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified SideEdges message, length delimited. Does not implicitly {@link Types.SideEdges.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Types.SideEdges
         * @static
         * @param {Types.ISideEdges} message SideEdges message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SideEdges.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SideEdges message from the specified reader or buffer.
         * @function decode
         * @memberof Types.SideEdges
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Types.SideEdges} SideEdges
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SideEdges.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Types.SideEdges();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.edges && message.edges.length))
                        message.edges = [];
                    message.edges.push($root.Types.Edge.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.totalEdge = $root.Types.Edge.decode(reader, reader.uint32());
                    break;
                case 3:
                    if (!(message.girders && message.girders.length))
                        message.girders = [];
                    message.girders.push($root.Types.Girder.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SideEdges message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Types.SideEdges
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Types.SideEdges} SideEdges
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SideEdges.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SideEdges message.
         * @function verify
         * @memberof Types.SideEdges
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SideEdges.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.edges != null && message.hasOwnProperty("edges")) {
                if (!Array.isArray(message.edges))
                    return "edges: array expected";
                for (let i = 0; i < message.edges.length; ++i) {
                    let error = $root.Types.Edge.verify(message.edges[i]);
                    if (error)
                        return "edges." + error;
                }
            }
            if (message.totalEdge != null && message.hasOwnProperty("totalEdge")) {
                let error = $root.Types.Edge.verify(message.totalEdge);
                if (error)
                    return "totalEdge." + error;
            }
            if (message.girders != null && message.hasOwnProperty("girders")) {
                if (!Array.isArray(message.girders))
                    return "girders: array expected";
                for (let i = 0; i < message.girders.length; ++i) {
                    let error = $root.Types.Girder.verify(message.girders[i]);
                    if (error)
                        return "girders." + error;
                }
            }
            return null;
        };

        /**
         * Creates a SideEdges message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Types.SideEdges
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Types.SideEdges} SideEdges
         */
        SideEdges.fromObject = function fromObject(object) {
            if (object instanceof $root.Types.SideEdges)
                return object;
            let message = new $root.Types.SideEdges();
            if (object.edges) {
                if (!Array.isArray(object.edges))
                    throw TypeError(".Types.SideEdges.edges: array expected");
                message.edges = [];
                for (let i = 0; i < object.edges.length; ++i) {
                    if (typeof object.edges[i] !== "object")
                        throw TypeError(".Types.SideEdges.edges: object expected");
                    message.edges[i] = $root.Types.Edge.fromObject(object.edges[i]);
                }
            }
            if (object.totalEdge != null) {
                if (typeof object.totalEdge !== "object")
                    throw TypeError(".Types.SideEdges.totalEdge: object expected");
                message.totalEdge = $root.Types.Edge.fromObject(object.totalEdge);
            }
            if (object.girders) {
                if (!Array.isArray(object.girders))
                    throw TypeError(".Types.SideEdges.girders: array expected");
                message.girders = [];
                for (let i = 0; i < object.girders.length; ++i) {
                    if (typeof object.girders[i] !== "object")
                        throw TypeError(".Types.SideEdges.girders: object expected");
                    message.girders[i] = $root.Types.Girder.fromObject(object.girders[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a SideEdges message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Types.SideEdges
         * @static
         * @param {Types.SideEdges} message SideEdges
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SideEdges.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.edges = [];
                object.girders = [];
            }
            if (options.defaults)
                object.totalEdge = null;
            if (message.edges && message.edges.length) {
                object.edges = [];
                for (let j = 0; j < message.edges.length; ++j)
                    object.edges[j] = $root.Types.Edge.toObject(message.edges[j], options);
            }
            if (message.totalEdge != null && message.hasOwnProperty("totalEdge"))
                object.totalEdge = $root.Types.Edge.toObject(message.totalEdge, options);
            if (message.girders && message.girders.length) {
                object.girders = [];
                for (let j = 0; j < message.girders.length; ++j)
                    object.girders[j] = $root.Types.Girder.toObject(message.girders[j], options);
            }
            return object;
        };

        /**
         * Converts this SideEdges to JSON.
         * @function toJSON
         * @memberof Types.SideEdges
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SideEdges.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SideEdges;
    })();

    Types.Project = (function() {

        /**
         * Properties of a Project.
         * @memberof Types
         * @interface IProject
         * @property {string|null} [uuid] Project uuid
         * @property {Types.IHole|null} [hole] Project hole
         * @property {Array.<Types.IWall>|null} [walls] Project walls
         * @property {Types.IStair|null} [stair] Project stair
         */

        /**
         * Constructs a new Project.
         * @memberof Types
         * @classdesc Represents a Project.
         * @implements IProject
         * @constructor
         * @param {Types.IProject=} [properties] Properties to set
         */
        function Project(properties) {
            this.walls = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Project uuid.
         * @member {string} uuid
         * @memberof Types.Project
         * @instance
         */
        Project.prototype.uuid = "";

        /**
         * Project hole.
         * @member {Types.IHole|null|undefined} hole
         * @memberof Types.Project
         * @instance
         */
        Project.prototype.hole = null;

        /**
         * Project walls.
         * @member {Array.<Types.IWall>} walls
         * @memberof Types.Project
         * @instance
         */
        Project.prototype.walls = $util.emptyArray;

        /**
         * Project stair.
         * @member {Types.IStair|null|undefined} stair
         * @memberof Types.Project
         * @instance
         */
        Project.prototype.stair = null;

        /**
         * Creates a new Project instance using the specified properties.
         * @function create
         * @memberof Types.Project
         * @static
         * @param {Types.IProject=} [properties] Properties to set
         * @returns {Types.Project} Project instance
         */
        Project.create = function create(properties) {
            return new Project(properties);
        };

        /**
         * Encodes the specified Project message. Does not implicitly {@link Types.Project.verify|verify} messages.
         * @function encode
         * @memberof Types.Project
         * @static
         * @param {Types.IProject} message Project message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Project.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.uuid != null && Object.hasOwnProperty.call(message, "uuid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.uuid);
            if (message.hole != null && Object.hasOwnProperty.call(message, "hole"))
                $root.Types.Hole.encode(message.hole, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.walls != null && message.walls.length)
                for (let i = 0; i < message.walls.length; ++i)
                    $root.Types.Wall.encode(message.walls[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.stair != null && Object.hasOwnProperty.call(message, "stair"))
                $root.Types.Stair.encode(message.stair, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Project message, length delimited. Does not implicitly {@link Types.Project.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Types.Project
         * @static
         * @param {Types.IProject} message Project message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Project.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Project message from the specified reader or buffer.
         * @function decode
         * @memberof Types.Project
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Types.Project} Project
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Project.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Types.Project();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.uuid = reader.string();
                    break;
                case 2:
                    message.hole = $root.Types.Hole.decode(reader, reader.uint32());
                    break;
                case 3:
                    if (!(message.walls && message.walls.length))
                        message.walls = [];
                    message.walls.push($root.Types.Wall.decode(reader, reader.uint32()));
                    break;
                case 4:
                    message.stair = $root.Types.Stair.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Project message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Types.Project
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Types.Project} Project
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Project.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Project message.
         * @function verify
         * @memberof Types.Project
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Project.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.uuid != null && message.hasOwnProperty("uuid"))
                if (!$util.isString(message.uuid))
                    return "uuid: string expected";
            if (message.hole != null && message.hasOwnProperty("hole")) {
                let error = $root.Types.Hole.verify(message.hole);
                if (error)
                    return "hole." + error;
            }
            if (message.walls != null && message.hasOwnProperty("walls")) {
                if (!Array.isArray(message.walls))
                    return "walls: array expected";
                for (let i = 0; i < message.walls.length; ++i) {
                    let error = $root.Types.Wall.verify(message.walls[i]);
                    if (error)
                        return "walls." + error;
                }
            }
            if (message.stair != null && message.hasOwnProperty("stair")) {
                let error = $root.Types.Stair.verify(message.stair);
                if (error)
                    return "stair." + error;
            }
            return null;
        };

        /**
         * Creates a Project message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Types.Project
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Types.Project} Project
         */
        Project.fromObject = function fromObject(object) {
            if (object instanceof $root.Types.Project)
                return object;
            let message = new $root.Types.Project();
            if (object.uuid != null)
                message.uuid = String(object.uuid);
            if (object.hole != null) {
                if (typeof object.hole !== "object")
                    throw TypeError(".Types.Project.hole: object expected");
                message.hole = $root.Types.Hole.fromObject(object.hole);
            }
            if (object.walls) {
                if (!Array.isArray(object.walls))
                    throw TypeError(".Types.Project.walls: array expected");
                message.walls = [];
                for (let i = 0; i < object.walls.length; ++i) {
                    if (typeof object.walls[i] !== "object")
                        throw TypeError(".Types.Project.walls: object expected");
                    message.walls[i] = $root.Types.Wall.fromObject(object.walls[i]);
                }
            }
            if (object.stair != null) {
                if (typeof object.stair !== "object")
                    throw TypeError(".Types.Project.stair: object expected");
                message.stair = $root.Types.Stair.fromObject(object.stair);
            }
            return message;
        };

        /**
         * Creates a plain object from a Project message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Types.Project
         * @static
         * @param {Types.Project} message Project
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Project.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.walls = [];
            if (options.defaults) {
                object.uuid = "";
                object.hole = null;
                object.stair = null;
            }
            if (message.uuid != null && message.hasOwnProperty("uuid"))
                object.uuid = message.uuid;
            if (message.hole != null && message.hasOwnProperty("hole"))
                object.hole = $root.Types.Hole.toObject(message.hole, options);
            if (message.walls && message.walls.length) {
                object.walls = [];
                for (let j = 0; j < message.walls.length; ++j)
                    object.walls[j] = $root.Types.Wall.toObject(message.walls[j], options);
            }
            if (message.stair != null && message.hasOwnProperty("stair"))
                object.stair = $root.Types.Stair.toObject(message.stair, options);
            return object;
        };

        /**
         * Converts this Project to JSON.
         * @function toJSON
         * @memberof Types.Project
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Project.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Project;
    })();

    Types.Hole = (function() {

        /**
         * Properties of a Hole.
         * @memberof Types
         * @interface IHole
         * @property {string|null} [uuid] Hole uuid
         * @property {Array.<Types.IEdge>|null} [edges] Hole edges
         * @property {number|null} [floorHeight] Hole floorHeight
         */

        /**
         * Constructs a new Hole.
         * @memberof Types
         * @classdesc Represents a Hole.
         * @implements IHole
         * @constructor
         * @param {Types.IHole=} [properties] Properties to set
         */
        function Hole(properties) {
            this.edges = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Hole uuid.
         * @member {string} uuid
         * @memberof Types.Hole
         * @instance
         */
        Hole.prototype.uuid = "";

        /**
         * Hole edges.
         * @member {Array.<Types.IEdge>} edges
         * @memberof Types.Hole
         * @instance
         */
        Hole.prototype.edges = $util.emptyArray;

        /**
         * Hole floorHeight.
         * @member {number} floorHeight
         * @memberof Types.Hole
         * @instance
         */
        Hole.prototype.floorHeight = 0;

        /**
         * Creates a new Hole instance using the specified properties.
         * @function create
         * @memberof Types.Hole
         * @static
         * @param {Types.IHole=} [properties] Properties to set
         * @returns {Types.Hole} Hole instance
         */
        Hole.create = function create(properties) {
            return new Hole(properties);
        };

        /**
         * Encodes the specified Hole message. Does not implicitly {@link Types.Hole.verify|verify} messages.
         * @function encode
         * @memberof Types.Hole
         * @static
         * @param {Types.IHole} message Hole message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Hole.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.uuid != null && Object.hasOwnProperty.call(message, "uuid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.uuid);
            if (message.edges != null && message.edges.length)
                for (let i = 0; i < message.edges.length; ++i)
                    $root.Types.Edge.encode(message.edges[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.floorHeight != null && Object.hasOwnProperty.call(message, "floorHeight"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.floorHeight);
            return writer;
        };

        /**
         * Encodes the specified Hole message, length delimited. Does not implicitly {@link Types.Hole.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Types.Hole
         * @static
         * @param {Types.IHole} message Hole message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Hole.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Hole message from the specified reader or buffer.
         * @function decode
         * @memberof Types.Hole
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Types.Hole} Hole
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Hole.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Types.Hole();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.uuid = reader.string();
                    break;
                case 2:
                    if (!(message.edges && message.edges.length))
                        message.edges = [];
                    message.edges.push($root.Types.Edge.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.floorHeight = reader.float();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Hole message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Types.Hole
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Types.Hole} Hole
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Hole.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Hole message.
         * @function verify
         * @memberof Types.Hole
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Hole.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.uuid != null && message.hasOwnProperty("uuid"))
                if (!$util.isString(message.uuid))
                    return "uuid: string expected";
            if (message.edges != null && message.hasOwnProperty("edges")) {
                if (!Array.isArray(message.edges))
                    return "edges: array expected";
                for (let i = 0; i < message.edges.length; ++i) {
                    let error = $root.Types.Edge.verify(message.edges[i]);
                    if (error)
                        return "edges." + error;
                }
            }
            if (message.floorHeight != null && message.hasOwnProperty("floorHeight"))
                if (typeof message.floorHeight !== "number")
                    return "floorHeight: number expected";
            return null;
        };

        /**
         * Creates a Hole message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Types.Hole
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Types.Hole} Hole
         */
        Hole.fromObject = function fromObject(object) {
            if (object instanceof $root.Types.Hole)
                return object;
            let message = new $root.Types.Hole();
            if (object.uuid != null)
                message.uuid = String(object.uuid);
            if (object.edges) {
                if (!Array.isArray(object.edges))
                    throw TypeError(".Types.Hole.edges: array expected");
                message.edges = [];
                for (let i = 0; i < object.edges.length; ++i) {
                    if (typeof object.edges[i] !== "object")
                        throw TypeError(".Types.Hole.edges: object expected");
                    message.edges[i] = $root.Types.Edge.fromObject(object.edges[i]);
                }
            }
            if (object.floorHeight != null)
                message.floorHeight = Number(object.floorHeight);
            return message;
        };

        /**
         * Creates a plain object from a Hole message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Types.Hole
         * @static
         * @param {Types.Hole} message Hole
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Hole.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.edges = [];
            if (options.defaults) {
                object.uuid = "";
                object.floorHeight = 0;
            }
            if (message.uuid != null && message.hasOwnProperty("uuid"))
                object.uuid = message.uuid;
            if (message.edges && message.edges.length) {
                object.edges = [];
                for (let j = 0; j < message.edges.length; ++j)
                    object.edges[j] = $root.Types.Edge.toObject(message.edges[j], options);
            }
            if (message.floorHeight != null && message.hasOwnProperty("floorHeight"))
                object.floorHeight = options.json && !isFinite(message.floorHeight) ? String(message.floorHeight) : message.floorHeight;
            return object;
        };

        /**
         * Converts this Hole to JSON.
         * @function toJSON
         * @memberof Types.Hole
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Hole.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Hole;
    })();

    Types.Wall = (function() {

        /**
         * Properties of a Wall.
         * @memberof Types
         * @interface IWall
         * @property {string|null} [uuid] Wall uuid
         * @property {Types.IEdge|null} [edge] Wall edge
         * @property {Types.IEdge|null} [outEdge] Wall outEdge
         * @property {Types.WallType|null} [type] Wall type
         * @property {number|null} [startExtend] Wall startExtend
         * @property {number|null} [endExtend] Wall endExtend
         * @property {number|null} [depth] Wall depth
         * @property {number|null} [height] Wall height
         * @property {Array.<Types.IComponent>|null} [components] Wall components
         * @property {Types.IEdge|null} [holeEdge] Wall holeEdge
         * @property {Types.IVector3|null} [normal] Wall normal
         */

        /**
         * Constructs a new Wall.
         * @memberof Types
         * @classdesc Represents a Wall.
         * @implements IWall
         * @constructor
         * @param {Types.IWall=} [properties] Properties to set
         */
        function Wall(properties) {
            this.components = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Wall uuid.
         * @member {string} uuid
         * @memberof Types.Wall
         * @instance
         */
        Wall.prototype.uuid = "";

        /**
         * Wall edge.
         * @member {Types.IEdge|null|undefined} edge
         * @memberof Types.Wall
         * @instance
         */
        Wall.prototype.edge = null;

        /**
         * Wall outEdge.
         * @member {Types.IEdge|null|undefined} outEdge
         * @memberof Types.Wall
         * @instance
         */
        Wall.prototype.outEdge = null;

        /**
         * Wall type.
         * @member {Types.WallType} type
         * @memberof Types.Wall
         * @instance
         */
        Wall.prototype.type = 0;

        /**
         * Wall startExtend.
         * @member {number} startExtend
         * @memberof Types.Wall
         * @instance
         */
        Wall.prototype.startExtend = 0;

        /**
         * Wall endExtend.
         * @member {number} endExtend
         * @memberof Types.Wall
         * @instance
         */
        Wall.prototype.endExtend = 0;

        /**
         * Wall depth.
         * @member {number} depth
         * @memberof Types.Wall
         * @instance
         */
        Wall.prototype.depth = 0;

        /**
         * Wall height.
         * @member {number} height
         * @memberof Types.Wall
         * @instance
         */
        Wall.prototype.height = 0;

        /**
         * Wall components.
         * @member {Array.<Types.IComponent>} components
         * @memberof Types.Wall
         * @instance
         */
        Wall.prototype.components = $util.emptyArray;

        /**
         * Wall holeEdge.
         * @member {Types.IEdge|null|undefined} holeEdge
         * @memberof Types.Wall
         * @instance
         */
        Wall.prototype.holeEdge = null;

        /**
         * Wall normal.
         * @member {Types.IVector3|null|undefined} normal
         * @memberof Types.Wall
         * @instance
         */
        Wall.prototype.normal = null;

        /**
         * Creates a new Wall instance using the specified properties.
         * @function create
         * @memberof Types.Wall
         * @static
         * @param {Types.IWall=} [properties] Properties to set
         * @returns {Types.Wall} Wall instance
         */
        Wall.create = function create(properties) {
            return new Wall(properties);
        };

        /**
         * Encodes the specified Wall message. Does not implicitly {@link Types.Wall.verify|verify} messages.
         * @function encode
         * @memberof Types.Wall
         * @static
         * @param {Types.IWall} message Wall message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Wall.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.uuid != null && Object.hasOwnProperty.call(message, "uuid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.uuid);
            if (message.edge != null && Object.hasOwnProperty.call(message, "edge"))
                $root.Types.Edge.encode(message.edge, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.outEdge != null && Object.hasOwnProperty.call(message, "outEdge"))
                $root.Types.Edge.encode(message.outEdge, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.type);
            if (message.startExtend != null && Object.hasOwnProperty.call(message, "startExtend"))
                writer.uint32(/* id 5, wireType 5 =*/45).float(message.startExtend);
            if (message.endExtend != null && Object.hasOwnProperty.call(message, "endExtend"))
                writer.uint32(/* id 6, wireType 5 =*/53).float(message.endExtend);
            if (message.depth != null && Object.hasOwnProperty.call(message, "depth"))
                writer.uint32(/* id 7, wireType 5 =*/61).float(message.depth);
            if (message.height != null && Object.hasOwnProperty.call(message, "height"))
                writer.uint32(/* id 8, wireType 5 =*/69).float(message.height);
            if (message.components != null && message.components.length)
                for (let i = 0; i < message.components.length; ++i)
                    $root.Types.Component.encode(message.components[i], writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
            if (message.holeEdge != null && Object.hasOwnProperty.call(message, "holeEdge"))
                $root.Types.Edge.encode(message.holeEdge, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
            if (message.normal != null && Object.hasOwnProperty.call(message, "normal"))
                $root.Types.Vector3.encode(message.normal, writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Wall message, length delimited. Does not implicitly {@link Types.Wall.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Types.Wall
         * @static
         * @param {Types.IWall} message Wall message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Wall.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Wall message from the specified reader or buffer.
         * @function decode
         * @memberof Types.Wall
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Types.Wall} Wall
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Wall.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Types.Wall();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.uuid = reader.string();
                    break;
                case 2:
                    message.edge = $root.Types.Edge.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.outEdge = $root.Types.Edge.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.type = reader.int32();
                    break;
                case 5:
                    message.startExtend = reader.float();
                    break;
                case 6:
                    message.endExtend = reader.float();
                    break;
                case 7:
                    message.depth = reader.float();
                    break;
                case 8:
                    message.height = reader.float();
                    break;
                case 9:
                    if (!(message.components && message.components.length))
                        message.components = [];
                    message.components.push($root.Types.Component.decode(reader, reader.uint32()));
                    break;
                case 10:
                    message.holeEdge = $root.Types.Edge.decode(reader, reader.uint32());
                    break;
                case 11:
                    message.normal = $root.Types.Vector3.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Wall message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Types.Wall
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Types.Wall} Wall
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Wall.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Wall message.
         * @function verify
         * @memberof Types.Wall
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Wall.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.uuid != null && message.hasOwnProperty("uuid"))
                if (!$util.isString(message.uuid))
                    return "uuid: string expected";
            if (message.edge != null && message.hasOwnProperty("edge")) {
                let error = $root.Types.Edge.verify(message.edge);
                if (error)
                    return "edge." + error;
            }
            if (message.outEdge != null && message.hasOwnProperty("outEdge")) {
                let error = $root.Types.Edge.verify(message.outEdge);
                if (error)
                    return "outEdge." + error;
            }
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    break;
                }
            if (message.startExtend != null && message.hasOwnProperty("startExtend"))
                if (typeof message.startExtend !== "number")
                    return "startExtend: number expected";
            if (message.endExtend != null && message.hasOwnProperty("endExtend"))
                if (typeof message.endExtend !== "number")
                    return "endExtend: number expected";
            if (message.depth != null && message.hasOwnProperty("depth"))
                if (typeof message.depth !== "number")
                    return "depth: number expected";
            if (message.height != null && message.hasOwnProperty("height"))
                if (typeof message.height !== "number")
                    return "height: number expected";
            if (message.components != null && message.hasOwnProperty("components")) {
                if (!Array.isArray(message.components))
                    return "components: array expected";
                for (let i = 0; i < message.components.length; ++i) {
                    let error = $root.Types.Component.verify(message.components[i]);
                    if (error)
                        return "components." + error;
                }
            }
            if (message.holeEdge != null && message.hasOwnProperty("holeEdge")) {
                let error = $root.Types.Edge.verify(message.holeEdge);
                if (error)
                    return "holeEdge." + error;
            }
            if (message.normal != null && message.hasOwnProperty("normal")) {
                let error = $root.Types.Vector3.verify(message.normal);
                if (error)
                    return "normal." + error;
            }
            return null;
        };

        /**
         * Creates a Wall message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Types.Wall
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Types.Wall} Wall
         */
        Wall.fromObject = function fromObject(object) {
            if (object instanceof $root.Types.Wall)
                return object;
            let message = new $root.Types.Wall();
            if (object.uuid != null)
                message.uuid = String(object.uuid);
            if (object.edge != null) {
                if (typeof object.edge !== "object")
                    throw TypeError(".Types.Wall.edge: object expected");
                message.edge = $root.Types.Edge.fromObject(object.edge);
            }
            if (object.outEdge != null) {
                if (typeof object.outEdge !== "object")
                    throw TypeError(".Types.Wall.outEdge: object expected");
                message.outEdge = $root.Types.Edge.fromObject(object.outEdge);
            }
            switch (object.type) {
            case "wph":
            case 0:
                message.type = 0;
                break;
            case "wfirst":
            case 1:
                message.type = 1;
                break;
            case "wsecond":
            case 2:
                message.type = 2;
                break;
            case "wboth":
            case 3:
                message.type = 3;
                break;
            case "wnone":
            case 4:
                message.type = 4;
                break;
            }
            if (object.startExtend != null)
                message.startExtend = Number(object.startExtend);
            if (object.endExtend != null)
                message.endExtend = Number(object.endExtend);
            if (object.depth != null)
                message.depth = Number(object.depth);
            if (object.height != null)
                message.height = Number(object.height);
            if (object.components) {
                if (!Array.isArray(object.components))
                    throw TypeError(".Types.Wall.components: array expected");
                message.components = [];
                for (let i = 0; i < object.components.length; ++i) {
                    if (typeof object.components[i] !== "object")
                        throw TypeError(".Types.Wall.components: object expected");
                    message.components[i] = $root.Types.Component.fromObject(object.components[i]);
                }
            }
            if (object.holeEdge != null) {
                if (typeof object.holeEdge !== "object")
                    throw TypeError(".Types.Wall.holeEdge: object expected");
                message.holeEdge = $root.Types.Edge.fromObject(object.holeEdge);
            }
            if (object.normal != null) {
                if (typeof object.normal !== "object")
                    throw TypeError(".Types.Wall.normal: object expected");
                message.normal = $root.Types.Vector3.fromObject(object.normal);
            }
            return message;
        };

        /**
         * Creates a plain object from a Wall message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Types.Wall
         * @static
         * @param {Types.Wall} message Wall
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Wall.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.components = [];
            if (options.defaults) {
                object.uuid = "";
                object.edge = null;
                object.outEdge = null;
                object.type = options.enums === String ? "wph" : 0;
                object.startExtend = 0;
                object.endExtend = 0;
                object.depth = 0;
                object.height = 0;
                object.holeEdge = null;
                object.normal = null;
            }
            if (message.uuid != null && message.hasOwnProperty("uuid"))
                object.uuid = message.uuid;
            if (message.edge != null && message.hasOwnProperty("edge"))
                object.edge = $root.Types.Edge.toObject(message.edge, options);
            if (message.outEdge != null && message.hasOwnProperty("outEdge"))
                object.outEdge = $root.Types.Edge.toObject(message.outEdge, options);
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.Types.WallType[message.type] : message.type;
            if (message.startExtend != null && message.hasOwnProperty("startExtend"))
                object.startExtend = options.json && !isFinite(message.startExtend) ? String(message.startExtend) : message.startExtend;
            if (message.endExtend != null && message.hasOwnProperty("endExtend"))
                object.endExtend = options.json && !isFinite(message.endExtend) ? String(message.endExtend) : message.endExtend;
            if (message.depth != null && message.hasOwnProperty("depth"))
                object.depth = options.json && !isFinite(message.depth) ? String(message.depth) : message.depth;
            if (message.height != null && message.hasOwnProperty("height"))
                object.height = options.json && !isFinite(message.height) ? String(message.height) : message.height;
            if (message.components && message.components.length) {
                object.components = [];
                for (let j = 0; j < message.components.length; ++j)
                    object.components[j] = $root.Types.Component.toObject(message.components[j], options);
            }
            if (message.holeEdge != null && message.hasOwnProperty("holeEdge"))
                object.holeEdge = $root.Types.Edge.toObject(message.holeEdge, options);
            if (message.normal != null && message.hasOwnProperty("normal"))
                object.normal = $root.Types.Vector3.toObject(message.normal, options);
            return object;
        };

        /**
         * Converts this Wall to JSON.
         * @function toJSON
         * @memberof Types.Wall
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Wall.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Wall;
    })();

    Types.Component = (function() {

        /**
         * Properties of a Component.
         * @memberof Types
         * @interface IComponent
         * @property {string|null} [uuid] Component uuid
         * @property {Types.ComponentType|null} [type] Component type
         * @property {number|null} [width] Component width
         * @property {number|null} [height] Component height
         * @property {number|null} [depth] Component depth
         * @property {number|null} [offGround] Component offGround
         * @property {number|null} [disToStart] Component disToStart
         * @property {number|null} [interval] Component interval
         * @property {Types.IVector3|null} [position] Component position
         * @property {Types.IVector3|null} [rotation] Component rotation
         */

        /**
         * Constructs a new Component.
         * @memberof Types
         * @classdesc Represents a Component.
         * @implements IComponent
         * @constructor
         * @param {Types.IComponent=} [properties] Properties to set
         */
        function Component(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Component uuid.
         * @member {string} uuid
         * @memberof Types.Component
         * @instance
         */
        Component.prototype.uuid = "";

        /**
         * Component type.
         * @member {Types.ComponentType} type
         * @memberof Types.Component
         * @instance
         */
        Component.prototype.type = 0;

        /**
         * Component width.
         * @member {number} width
         * @memberof Types.Component
         * @instance
         */
        Component.prototype.width = 0;

        /**
         * Component height.
         * @member {number} height
         * @memberof Types.Component
         * @instance
         */
        Component.prototype.height = 0;

        /**
         * Component depth.
         * @member {number} depth
         * @memberof Types.Component
         * @instance
         */
        Component.prototype.depth = 0;

        /**
         * Component offGround.
         * @member {number} offGround
         * @memberof Types.Component
         * @instance
         */
        Component.prototype.offGround = 0;

        /**
         * Component disToStart.
         * @member {number} disToStart
         * @memberof Types.Component
         * @instance
         */
        Component.prototype.disToStart = 0;

        /**
         * Component interval.
         * @member {number} interval
         * @memberof Types.Component
         * @instance
         */
        Component.prototype.interval = 0;

        /**
         * Component position.
         * @member {Types.IVector3|null|undefined} position
         * @memberof Types.Component
         * @instance
         */
        Component.prototype.position = null;

        /**
         * Component rotation.
         * @member {Types.IVector3|null|undefined} rotation
         * @memberof Types.Component
         * @instance
         */
        Component.prototype.rotation = null;

        /**
         * Creates a new Component instance using the specified properties.
         * @function create
         * @memberof Types.Component
         * @static
         * @param {Types.IComponent=} [properties] Properties to set
         * @returns {Types.Component} Component instance
         */
        Component.create = function create(properties) {
            return new Component(properties);
        };

        /**
         * Encodes the specified Component message. Does not implicitly {@link Types.Component.verify|verify} messages.
         * @function encode
         * @memberof Types.Component
         * @static
         * @param {Types.IComponent} message Component message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Component.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.uuid != null && Object.hasOwnProperty.call(message, "uuid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.uuid);
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.type);
            if (message.width != null && Object.hasOwnProperty.call(message, "width"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.width);
            if (message.height != null && Object.hasOwnProperty.call(message, "height"))
                writer.uint32(/* id 4, wireType 5 =*/37).float(message.height);
            if (message.depth != null && Object.hasOwnProperty.call(message, "depth"))
                writer.uint32(/* id 5, wireType 5 =*/45).float(message.depth);
            if (message.offGround != null && Object.hasOwnProperty.call(message, "offGround"))
                writer.uint32(/* id 6, wireType 5 =*/53).float(message.offGround);
            if (message.disToStart != null && Object.hasOwnProperty.call(message, "disToStart"))
                writer.uint32(/* id 7, wireType 5 =*/61).float(message.disToStart);
            if (message.interval != null && Object.hasOwnProperty.call(message, "interval"))
                writer.uint32(/* id 8, wireType 5 =*/69).float(message.interval);
            if (message.position != null && Object.hasOwnProperty.call(message, "position"))
                $root.Types.Vector3.encode(message.position, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
            if (message.rotation != null && Object.hasOwnProperty.call(message, "rotation"))
                $root.Types.Vector3.encode(message.rotation, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Component message, length delimited. Does not implicitly {@link Types.Component.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Types.Component
         * @static
         * @param {Types.IComponent} message Component message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Component.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Component message from the specified reader or buffer.
         * @function decode
         * @memberof Types.Component
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Types.Component} Component
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Component.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Types.Component();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.uuid = reader.string();
                    break;
                case 2:
                    message.type = reader.int32();
                    break;
                case 3:
                    message.width = reader.float();
                    break;
                case 4:
                    message.height = reader.float();
                    break;
                case 5:
                    message.depth = reader.float();
                    break;
                case 6:
                    message.offGround = reader.float();
                    break;
                case 7:
                    message.disToStart = reader.float();
                    break;
                case 8:
                    message.interval = reader.float();
                    break;
                case 9:
                    message.position = $root.Types.Vector3.decode(reader, reader.uint32());
                    break;
                case 10:
                    message.rotation = $root.Types.Vector3.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Component message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Types.Component
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Types.Component} Component
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Component.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Component message.
         * @function verify
         * @memberof Types.Component
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Component.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.uuid != null && message.hasOwnProperty("uuid"))
                if (!$util.isString(message.uuid))
                    return "uuid: string expected";
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                }
            if (message.width != null && message.hasOwnProperty("width"))
                if (typeof message.width !== "number")
                    return "width: number expected";
            if (message.height != null && message.hasOwnProperty("height"))
                if (typeof message.height !== "number")
                    return "height: number expected";
            if (message.depth != null && message.hasOwnProperty("depth"))
                if (typeof message.depth !== "number")
                    return "depth: number expected";
            if (message.offGround != null && message.hasOwnProperty("offGround"))
                if (typeof message.offGround !== "number")
                    return "offGround: number expected";
            if (message.disToStart != null && message.hasOwnProperty("disToStart"))
                if (typeof message.disToStart !== "number")
                    return "disToStart: number expected";
            if (message.interval != null && message.hasOwnProperty("interval"))
                if (typeof message.interval !== "number")
                    return "interval: number expected";
            if (message.position != null && message.hasOwnProperty("position")) {
                let error = $root.Types.Vector3.verify(message.position);
                if (error)
                    return "position." + error;
            }
            if (message.rotation != null && message.hasOwnProperty("rotation")) {
                let error = $root.Types.Vector3.verify(message.rotation);
                if (error)
                    return "rotation." + error;
            }
            return null;
        };

        /**
         * Creates a Component message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Types.Component
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Types.Component} Component
         */
        Component.fromObject = function fromObject(object) {
            if (object instanceof $root.Types.Component)
                return object;
            let message = new $root.Types.Component();
            if (object.uuid != null)
                message.uuid = String(object.uuid);
            switch (object.type) {
            case "cph":
            case 0:
                message.type = 0;
                break;
            case "cdoor":
            case 1:
                message.type = 1;
                break;
            case "cwindow":
            case 2:
                message.type = 2;
                break;
            case "cdoor_hole":
            case 3:
                message.type = 3;
                break;
            case "cbeam":
            case 4:
                message.type = 4;
                break;
            case "cpillar":
            case 5:
                message.type = 5;
                break;
            }
            if (object.width != null)
                message.width = Number(object.width);
            if (object.height != null)
                message.height = Number(object.height);
            if (object.depth != null)
                message.depth = Number(object.depth);
            if (object.offGround != null)
                message.offGround = Number(object.offGround);
            if (object.disToStart != null)
                message.disToStart = Number(object.disToStart);
            if (object.interval != null)
                message.interval = Number(object.interval);
            if (object.position != null) {
                if (typeof object.position !== "object")
                    throw TypeError(".Types.Component.position: object expected");
                message.position = $root.Types.Vector3.fromObject(object.position);
            }
            if (object.rotation != null) {
                if (typeof object.rotation !== "object")
                    throw TypeError(".Types.Component.rotation: object expected");
                message.rotation = $root.Types.Vector3.fromObject(object.rotation);
            }
            return message;
        };

        /**
         * Creates a plain object from a Component message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Types.Component
         * @static
         * @param {Types.Component} message Component
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Component.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.uuid = "";
                object.type = options.enums === String ? "cph" : 0;
                object.width = 0;
                object.height = 0;
                object.depth = 0;
                object.offGround = 0;
                object.disToStart = 0;
                object.interval = 0;
                object.position = null;
                object.rotation = null;
            }
            if (message.uuid != null && message.hasOwnProperty("uuid"))
                object.uuid = message.uuid;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.Types.ComponentType[message.type] : message.type;
            if (message.width != null && message.hasOwnProperty("width"))
                object.width = options.json && !isFinite(message.width) ? String(message.width) : message.width;
            if (message.height != null && message.hasOwnProperty("height"))
                object.height = options.json && !isFinite(message.height) ? String(message.height) : message.height;
            if (message.depth != null && message.hasOwnProperty("depth"))
                object.depth = options.json && !isFinite(message.depth) ? String(message.depth) : message.depth;
            if (message.offGround != null && message.hasOwnProperty("offGround"))
                object.offGround = options.json && !isFinite(message.offGround) ? String(message.offGround) : message.offGround;
            if (message.disToStart != null && message.hasOwnProperty("disToStart"))
                object.disToStart = options.json && !isFinite(message.disToStart) ? String(message.disToStart) : message.disToStart;
            if (message.interval != null && message.hasOwnProperty("interval"))
                object.interval = options.json && !isFinite(message.interval) ? String(message.interval) : message.interval;
            if (message.position != null && message.hasOwnProperty("position"))
                object.position = $root.Types.Vector3.toObject(message.position, options);
            if (message.rotation != null && message.hasOwnProperty("rotation"))
                object.rotation = $root.Types.Vector3.toObject(message.rotation, options);
            return object;
        };

        /**
         * Converts this Component to JSON.
         * @function toJSON
         * @memberof Types.Component
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Component.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Component;
    })();

    Types.Material = (function() {

        /**
         * Properties of a Material.
         * @memberof Types
         * @interface IMaterial
         */

        /**
         * Constructs a new Material.
         * @memberof Types
         * @classdesc Represents a Material.
         * @implements IMaterial
         * @constructor
         * @param {Types.IMaterial=} [properties] Properties to set
         */
        function Material(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new Material instance using the specified properties.
         * @function create
         * @memberof Types.Material
         * @static
         * @param {Types.IMaterial=} [properties] Properties to set
         * @returns {Types.Material} Material instance
         */
        Material.create = function create(properties) {
            return new Material(properties);
        };

        /**
         * Encodes the specified Material message. Does not implicitly {@link Types.Material.verify|verify} messages.
         * @function encode
         * @memberof Types.Material
         * @static
         * @param {Types.IMaterial} message Material message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Material.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified Material message, length delimited. Does not implicitly {@link Types.Material.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Types.Material
         * @static
         * @param {Types.IMaterial} message Material message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Material.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Material message from the specified reader or buffer.
         * @function decode
         * @memberof Types.Material
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Types.Material} Material
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Material.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Types.Material();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Material message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Types.Material
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Types.Material} Material
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Material.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Material message.
         * @function verify
         * @memberof Types.Material
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Material.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a Material message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Types.Material
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Types.Material} Material
         */
        Material.fromObject = function fromObject(object) {
            if (object instanceof $root.Types.Material)
                return object;
            return new $root.Types.Material();
        };

        /**
         * Creates a plain object from a Material message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Types.Material
         * @static
         * @param {Types.Material} message Material
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Material.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this Material to JSON.
         * @function toJSON
         * @memberof Types.Material
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Material.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Material;
    })();

    Types.Stair = (function() {

        /**
         * Properties of a Stair.
         * @memberof Types
         * @interface IStair
         * @property {string|null} [uuid] Stair uuid
         * @property {number|null} [startBeamDepth] Stair startBeamDepth
         * @property {number|null} [exitBeamDepth] Stair exitBeamDepth
         * @property {Types.StairType|null} [type] Stair type
         * @property {Types.AgainstWallType|null} [againstWallType] Stair againstWallType
         * @property {Types.ITreadParameters|null} [treadParameters] Stair treadParameters
         * @property {Types.IRiserParameters|null} [riserParameters] Stair riserParameters
         * @property {Types.IStepParameters|null} [stepParameters] Stair stepParameters
         * @property {Types.IBigColParameters|null} [bigColParameters] Stair bigColParameters
         * @property {Types.ISmallColParameters|null} [smallColParameters] Stair smallColParameters
         * @property {Types.IHandrailParameters|null} [handrailParameters] Stair handrailParameters
         * @property {Types.IGirderParameters|null} [girderParameters] Stair girderParameters
         * @property {Array.<Types.IFlight>|null} [flights] Stair flights
         * @property {Array.<Types.ILanding>|null} [landings] Stair landings
         * @property {Array.<Types.IBigColumn>|null} [bigColumns] Stair bigColumns
         * @property {Array.<Types.ISmallColumn>|null} [smallColumns] Stair smallColumns
         * @property {Array.<Types.IHandrail>|null} [handrails] Stair handrails
         * @property {Array.<Types.IGirder>|null} [girders] Stair girders
         * @property {Types.IHangingBoard|null} [hangingBoard] Stair hangingBoard
         * @property {number|null} [stepHeight] Stair stepHeight
         * @property {Types.IVector3|null} [position] Stair position
         * @property {Types.Side|null} [floadSide] Stair floadSide
         */

        /**
         * Constructs a new Stair.
         * @memberof Types
         * @classdesc Represents a Stair.
         * @implements IStair
         * @constructor
         * @param {Types.IStair=} [properties] Properties to set
         */
        function Stair(properties) {
            this.flights = [];
            this.landings = [];
            this.bigColumns = [];
            this.smallColumns = [];
            this.handrails = [];
            this.girders = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Stair uuid.
         * @member {string} uuid
         * @memberof Types.Stair
         * @instance
         */
        Stair.prototype.uuid = "";

        /**
         * Stair startBeamDepth.
         * @member {number} startBeamDepth
         * @memberof Types.Stair
         * @instance
         */
        Stair.prototype.startBeamDepth = 0;

        /**
         * Stair exitBeamDepth.
         * @member {number} exitBeamDepth
         * @memberof Types.Stair
         * @instance
         */
        Stair.prototype.exitBeamDepth = 0;

        /**
         * Stair type.
         * @member {Types.StairType} type
         * @memberof Types.Stair
         * @instance
         */
        Stair.prototype.type = 0;

        /**
         * Stair againstWallType.
         * @member {Types.AgainstWallType} againstWallType
         * @memberof Types.Stair
         * @instance
         */
        Stair.prototype.againstWallType = 0;

        /**
         * Stair treadParameters.
         * @member {Types.ITreadParameters|null|undefined} treadParameters
         * @memberof Types.Stair
         * @instance
         */
        Stair.prototype.treadParameters = null;

        /**
         * Stair riserParameters.
         * @member {Types.IRiserParameters|null|undefined} riserParameters
         * @memberof Types.Stair
         * @instance
         */
        Stair.prototype.riserParameters = null;

        /**
         * Stair stepParameters.
         * @member {Types.IStepParameters|null|undefined} stepParameters
         * @memberof Types.Stair
         * @instance
         */
        Stair.prototype.stepParameters = null;

        /**
         * Stair bigColParameters.
         * @member {Types.IBigColParameters|null|undefined} bigColParameters
         * @memberof Types.Stair
         * @instance
         */
        Stair.prototype.bigColParameters = null;

        /**
         * Stair smallColParameters.
         * @member {Types.ISmallColParameters|null|undefined} smallColParameters
         * @memberof Types.Stair
         * @instance
         */
        Stair.prototype.smallColParameters = null;

        /**
         * Stair handrailParameters.
         * @member {Types.IHandrailParameters|null|undefined} handrailParameters
         * @memberof Types.Stair
         * @instance
         */
        Stair.prototype.handrailParameters = null;

        /**
         * Stair girderParameters.
         * @member {Types.IGirderParameters|null|undefined} girderParameters
         * @memberof Types.Stair
         * @instance
         */
        Stair.prototype.girderParameters = null;

        /**
         * Stair flights.
         * @member {Array.<Types.IFlight>} flights
         * @memberof Types.Stair
         * @instance
         */
        Stair.prototype.flights = $util.emptyArray;

        /**
         * Stair landings.
         * @member {Array.<Types.ILanding>} landings
         * @memberof Types.Stair
         * @instance
         */
        Stair.prototype.landings = $util.emptyArray;

        /**
         * Stair bigColumns.
         * @member {Array.<Types.IBigColumn>} bigColumns
         * @memberof Types.Stair
         * @instance
         */
        Stair.prototype.bigColumns = $util.emptyArray;

        /**
         * Stair smallColumns.
         * @member {Array.<Types.ISmallColumn>} smallColumns
         * @memberof Types.Stair
         * @instance
         */
        Stair.prototype.smallColumns = $util.emptyArray;

        /**
         * Stair handrails.
         * @member {Array.<Types.IHandrail>} handrails
         * @memberof Types.Stair
         * @instance
         */
        Stair.prototype.handrails = $util.emptyArray;

        /**
         * Stair girders.
         * @member {Array.<Types.IGirder>} girders
         * @memberof Types.Stair
         * @instance
         */
        Stair.prototype.girders = $util.emptyArray;

        /**
         * Stair hangingBoard.
         * @member {Types.IHangingBoard|null|undefined} hangingBoard
         * @memberof Types.Stair
         * @instance
         */
        Stair.prototype.hangingBoard = null;

        /**
         * Stair stepHeight.
         * @member {number} stepHeight
         * @memberof Types.Stair
         * @instance
         */
        Stair.prototype.stepHeight = 0;

        /**
         * Stair position.
         * @member {Types.IVector3|null|undefined} position
         * @memberof Types.Stair
         * @instance
         */
        Stair.prototype.position = null;

        /**
         * Stair floadSide.
         * @member {Types.Side} floadSide
         * @memberof Types.Stair
         * @instance
         */
        Stair.prototype.floadSide = 0;

        /**
         * Creates a new Stair instance using the specified properties.
         * @function create
         * @memberof Types.Stair
         * @static
         * @param {Types.IStair=} [properties] Properties to set
         * @returns {Types.Stair} Stair instance
         */
        Stair.create = function create(properties) {
            return new Stair(properties);
        };

        /**
         * Encodes the specified Stair message. Does not implicitly {@link Types.Stair.verify|verify} messages.
         * @function encode
         * @memberof Types.Stair
         * @static
         * @param {Types.IStair} message Stair message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Stair.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.uuid != null && Object.hasOwnProperty.call(message, "uuid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.uuid);
            if (message.startBeamDepth != null && Object.hasOwnProperty.call(message, "startBeamDepth"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.startBeamDepth);
            if (message.exitBeamDepth != null && Object.hasOwnProperty.call(message, "exitBeamDepth"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.exitBeamDepth);
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.type);
            if (message.againstWallType != null && Object.hasOwnProperty.call(message, "againstWallType"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.againstWallType);
            if (message.treadParameters != null && Object.hasOwnProperty.call(message, "treadParameters"))
                $root.Types.TreadParameters.encode(message.treadParameters, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            if (message.riserParameters != null && Object.hasOwnProperty.call(message, "riserParameters"))
                $root.Types.RiserParameters.encode(message.riserParameters, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
            if (message.stepParameters != null && Object.hasOwnProperty.call(message, "stepParameters"))
                $root.Types.StepParameters.encode(message.stepParameters, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
            if (message.bigColParameters != null && Object.hasOwnProperty.call(message, "bigColParameters"))
                $root.Types.BigColParameters.encode(message.bigColParameters, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
            if (message.smallColParameters != null && Object.hasOwnProperty.call(message, "smallColParameters"))
                $root.Types.SmallColParameters.encode(message.smallColParameters, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
            if (message.handrailParameters != null && Object.hasOwnProperty.call(message, "handrailParameters"))
                $root.Types.HandrailParameters.encode(message.handrailParameters, writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
            if (message.girderParameters != null && Object.hasOwnProperty.call(message, "girderParameters"))
                $root.Types.GirderParameters.encode(message.girderParameters, writer.uint32(/* id 12, wireType 2 =*/98).fork()).ldelim();
            if (message.flights != null && message.flights.length)
                for (let i = 0; i < message.flights.length; ++i)
                    $root.Types.Flight.encode(message.flights[i], writer.uint32(/* id 15, wireType 2 =*/122).fork()).ldelim();
            if (message.landings != null && message.landings.length)
                for (let i = 0; i < message.landings.length; ++i)
                    $root.Types.Landing.encode(message.landings[i], writer.uint32(/* id 16, wireType 2 =*/130).fork()).ldelim();
            if (message.bigColumns != null && message.bigColumns.length)
                for (let i = 0; i < message.bigColumns.length; ++i)
                    $root.Types.BigColumn.encode(message.bigColumns[i], writer.uint32(/* id 17, wireType 2 =*/138).fork()).ldelim();
            if (message.smallColumns != null && message.smallColumns.length)
                for (let i = 0; i < message.smallColumns.length; ++i)
                    $root.Types.SmallColumn.encode(message.smallColumns[i], writer.uint32(/* id 18, wireType 2 =*/146).fork()).ldelim();
            if (message.handrails != null && message.handrails.length)
                for (let i = 0; i < message.handrails.length; ++i)
                    $root.Types.Handrail.encode(message.handrails[i], writer.uint32(/* id 19, wireType 2 =*/154).fork()).ldelim();
            if (message.girders != null && message.girders.length)
                for (let i = 0; i < message.girders.length; ++i)
                    $root.Types.Girder.encode(message.girders[i], writer.uint32(/* id 20, wireType 2 =*/162).fork()).ldelim();
            if (message.hangingBoard != null && Object.hasOwnProperty.call(message, "hangingBoard"))
                $root.Types.HangingBoard.encode(message.hangingBoard, writer.uint32(/* id 21, wireType 2 =*/170).fork()).ldelim();
            if (message.stepHeight != null && Object.hasOwnProperty.call(message, "stepHeight"))
                writer.uint32(/* id 25, wireType 5 =*/205).float(message.stepHeight);
            if (message.position != null && Object.hasOwnProperty.call(message, "position"))
                $root.Types.Vector3.encode(message.position, writer.uint32(/* id 26, wireType 2 =*/210).fork()).ldelim();
            if (message.floadSide != null && Object.hasOwnProperty.call(message, "floadSide"))
                writer.uint32(/* id 27, wireType 0 =*/216).int32(message.floadSide);
            return writer;
        };

        /**
         * Encodes the specified Stair message, length delimited. Does not implicitly {@link Types.Stair.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Types.Stair
         * @static
         * @param {Types.IStair} message Stair message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Stair.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Stair message from the specified reader or buffer.
         * @function decode
         * @memberof Types.Stair
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Types.Stair} Stair
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Stair.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Types.Stair();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.uuid = reader.string();
                    break;
                case 2:
                    message.startBeamDepth = reader.float();
                    break;
                case 3:
                    message.exitBeamDepth = reader.float();
                    break;
                case 4:
                    message.type = reader.int32();
                    break;
                case 5:
                    message.againstWallType = reader.int32();
                    break;
                case 6:
                    message.treadParameters = $root.Types.TreadParameters.decode(reader, reader.uint32());
                    break;
                case 7:
                    message.riserParameters = $root.Types.RiserParameters.decode(reader, reader.uint32());
                    break;
                case 8:
                    message.stepParameters = $root.Types.StepParameters.decode(reader, reader.uint32());
                    break;
                case 9:
                    message.bigColParameters = $root.Types.BigColParameters.decode(reader, reader.uint32());
                    break;
                case 10:
                    message.smallColParameters = $root.Types.SmallColParameters.decode(reader, reader.uint32());
                    break;
                case 11:
                    message.handrailParameters = $root.Types.HandrailParameters.decode(reader, reader.uint32());
                    break;
                case 12:
                    message.girderParameters = $root.Types.GirderParameters.decode(reader, reader.uint32());
                    break;
                case 15:
                    if (!(message.flights && message.flights.length))
                        message.flights = [];
                    message.flights.push($root.Types.Flight.decode(reader, reader.uint32()));
                    break;
                case 16:
                    if (!(message.landings && message.landings.length))
                        message.landings = [];
                    message.landings.push($root.Types.Landing.decode(reader, reader.uint32()));
                    break;
                case 17:
                    if (!(message.bigColumns && message.bigColumns.length))
                        message.bigColumns = [];
                    message.bigColumns.push($root.Types.BigColumn.decode(reader, reader.uint32()));
                    break;
                case 18:
                    if (!(message.smallColumns && message.smallColumns.length))
                        message.smallColumns = [];
                    message.smallColumns.push($root.Types.SmallColumn.decode(reader, reader.uint32()));
                    break;
                case 19:
                    if (!(message.handrails && message.handrails.length))
                        message.handrails = [];
                    message.handrails.push($root.Types.Handrail.decode(reader, reader.uint32()));
                    break;
                case 20:
                    if (!(message.girders && message.girders.length))
                        message.girders = [];
                    message.girders.push($root.Types.Girder.decode(reader, reader.uint32()));
                    break;
                case 21:
                    message.hangingBoard = $root.Types.HangingBoard.decode(reader, reader.uint32());
                    break;
                case 25:
                    message.stepHeight = reader.float();
                    break;
                case 26:
                    message.position = $root.Types.Vector3.decode(reader, reader.uint32());
                    break;
                case 27:
                    message.floadSide = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Stair message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Types.Stair
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Types.Stair} Stair
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Stair.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Stair message.
         * @function verify
         * @memberof Types.Stair
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Stair.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.uuid != null && message.hasOwnProperty("uuid"))
                if (!$util.isString(message.uuid))
                    return "uuid: string expected";
            if (message.startBeamDepth != null && message.hasOwnProperty("startBeamDepth"))
                if (typeof message.startBeamDepth !== "number")
                    return "startBeamDepth: number expected";
            if (message.exitBeamDepth != null && message.hasOwnProperty("exitBeamDepth"))
                if (typeof message.exitBeamDepth !== "number")
                    return "exitBeamDepth: number expected";
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    break;
                }
            if (message.againstWallType != null && message.hasOwnProperty("againstWallType"))
                switch (message.againstWallType) {
                default:
                    return "againstWallType: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                }
            if (message.treadParameters != null && message.hasOwnProperty("treadParameters")) {
                let error = $root.Types.TreadParameters.verify(message.treadParameters);
                if (error)
                    return "treadParameters." + error;
            }
            if (message.riserParameters != null && message.hasOwnProperty("riserParameters")) {
                let error = $root.Types.RiserParameters.verify(message.riserParameters);
                if (error)
                    return "riserParameters." + error;
            }
            if (message.stepParameters != null && message.hasOwnProperty("stepParameters")) {
                let error = $root.Types.StepParameters.verify(message.stepParameters);
                if (error)
                    return "stepParameters." + error;
            }
            if (message.bigColParameters != null && message.hasOwnProperty("bigColParameters")) {
                let error = $root.Types.BigColParameters.verify(message.bigColParameters);
                if (error)
                    return "bigColParameters." + error;
            }
            if (message.smallColParameters != null && message.hasOwnProperty("smallColParameters")) {
                let error = $root.Types.SmallColParameters.verify(message.smallColParameters);
                if (error)
                    return "smallColParameters." + error;
            }
            if (message.handrailParameters != null && message.hasOwnProperty("handrailParameters")) {
                let error = $root.Types.HandrailParameters.verify(message.handrailParameters);
                if (error)
                    return "handrailParameters." + error;
            }
            if (message.girderParameters != null && message.hasOwnProperty("girderParameters")) {
                let error = $root.Types.GirderParameters.verify(message.girderParameters);
                if (error)
                    return "girderParameters." + error;
            }
            if (message.flights != null && message.hasOwnProperty("flights")) {
                if (!Array.isArray(message.flights))
                    return "flights: array expected";
                for (let i = 0; i < message.flights.length; ++i) {
                    let error = $root.Types.Flight.verify(message.flights[i]);
                    if (error)
                        return "flights." + error;
                }
            }
            if (message.landings != null && message.hasOwnProperty("landings")) {
                if (!Array.isArray(message.landings))
                    return "landings: array expected";
                for (let i = 0; i < message.landings.length; ++i) {
                    let error = $root.Types.Landing.verify(message.landings[i]);
                    if (error)
                        return "landings." + error;
                }
            }
            if (message.bigColumns != null && message.hasOwnProperty("bigColumns")) {
                if (!Array.isArray(message.bigColumns))
                    return "bigColumns: array expected";
                for (let i = 0; i < message.bigColumns.length; ++i) {
                    let error = $root.Types.BigColumn.verify(message.bigColumns[i]);
                    if (error)
                        return "bigColumns." + error;
                }
            }
            if (message.smallColumns != null && message.hasOwnProperty("smallColumns")) {
                if (!Array.isArray(message.smallColumns))
                    return "smallColumns: array expected";
                for (let i = 0; i < message.smallColumns.length; ++i) {
                    let error = $root.Types.SmallColumn.verify(message.smallColumns[i]);
                    if (error)
                        return "smallColumns." + error;
                }
            }
            if (message.handrails != null && message.hasOwnProperty("handrails")) {
                if (!Array.isArray(message.handrails))
                    return "handrails: array expected";
                for (let i = 0; i < message.handrails.length; ++i) {
                    let error = $root.Types.Handrail.verify(message.handrails[i]);
                    if (error)
                        return "handrails." + error;
                }
            }
            if (message.girders != null && message.hasOwnProperty("girders")) {
                if (!Array.isArray(message.girders))
                    return "girders: array expected";
                for (let i = 0; i < message.girders.length; ++i) {
                    let error = $root.Types.Girder.verify(message.girders[i]);
                    if (error)
                        return "girders." + error;
                }
            }
            if (message.hangingBoard != null && message.hasOwnProperty("hangingBoard")) {
                let error = $root.Types.HangingBoard.verify(message.hangingBoard);
                if (error)
                    return "hangingBoard." + error;
            }
            if (message.stepHeight != null && message.hasOwnProperty("stepHeight"))
                if (typeof message.stepHeight !== "number")
                    return "stepHeight: number expected";
            if (message.position != null && message.hasOwnProperty("position")) {
                let error = $root.Types.Vector3.verify(message.position);
                if (error)
                    return "position." + error;
            }
            if (message.floadSide != null && message.hasOwnProperty("floadSide"))
                switch (message.floadSide) {
                default:
                    return "floadSide: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            return null;
        };

        /**
         * Creates a Stair message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Types.Stair
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Types.Stair} Stair
         */
        Stair.fromObject = function fromObject(object) {
            if (object instanceof $root.Types.Stair)
                return object;
            let message = new $root.Types.Stair();
            if (object.uuid != null)
                message.uuid = String(object.uuid);
            if (object.startBeamDepth != null)
                message.startBeamDepth = Number(object.startBeamDepth);
            if (object.exitBeamDepth != null)
                message.exitBeamDepth = Number(object.exitBeamDepth);
            switch (object.type) {
            case "sph":
            case 0:
                message.type = 0;
                break;
            case "sstright":
            case 1:
                message.type = 1;
                break;
            case "sl_type":
            case 2:
                message.type = 2;
                break;
            case "s_small_u_type":
            case 3:
                message.type = 3;
                break;
            case "s_big_u_type":
            case 4:
                message.type = 4;
                break;
            }
            switch (object.againstWallType) {
            case "aw_ph":
            case 0:
                message.againstWallType = 0;
                break;
            case "aw_no":
            case 1:
                message.againstWallType = 1;
                break;
            case "aw_left":
            case 2:
                message.againstWallType = 2;
                break;
            case "aw_right":
            case 3:
                message.againstWallType = 3;
                break;
            }
            if (object.treadParameters != null) {
                if (typeof object.treadParameters !== "object")
                    throw TypeError(".Types.Stair.treadParameters: object expected");
                message.treadParameters = $root.Types.TreadParameters.fromObject(object.treadParameters);
            }
            if (object.riserParameters != null) {
                if (typeof object.riserParameters !== "object")
                    throw TypeError(".Types.Stair.riserParameters: object expected");
                message.riserParameters = $root.Types.RiserParameters.fromObject(object.riserParameters);
            }
            if (object.stepParameters != null) {
                if (typeof object.stepParameters !== "object")
                    throw TypeError(".Types.Stair.stepParameters: object expected");
                message.stepParameters = $root.Types.StepParameters.fromObject(object.stepParameters);
            }
            if (object.bigColParameters != null) {
                if (typeof object.bigColParameters !== "object")
                    throw TypeError(".Types.Stair.bigColParameters: object expected");
                message.bigColParameters = $root.Types.BigColParameters.fromObject(object.bigColParameters);
            }
            if (object.smallColParameters != null) {
                if (typeof object.smallColParameters !== "object")
                    throw TypeError(".Types.Stair.smallColParameters: object expected");
                message.smallColParameters = $root.Types.SmallColParameters.fromObject(object.smallColParameters);
            }
            if (object.handrailParameters != null) {
                if (typeof object.handrailParameters !== "object")
                    throw TypeError(".Types.Stair.handrailParameters: object expected");
                message.handrailParameters = $root.Types.HandrailParameters.fromObject(object.handrailParameters);
            }
            if (object.girderParameters != null) {
                if (typeof object.girderParameters !== "object")
                    throw TypeError(".Types.Stair.girderParameters: object expected");
                message.girderParameters = $root.Types.GirderParameters.fromObject(object.girderParameters);
            }
            if (object.flights) {
                if (!Array.isArray(object.flights))
                    throw TypeError(".Types.Stair.flights: array expected");
                message.flights = [];
                for (let i = 0; i < object.flights.length; ++i) {
                    if (typeof object.flights[i] !== "object")
                        throw TypeError(".Types.Stair.flights: object expected");
                    message.flights[i] = $root.Types.Flight.fromObject(object.flights[i]);
                }
            }
            if (object.landings) {
                if (!Array.isArray(object.landings))
                    throw TypeError(".Types.Stair.landings: array expected");
                message.landings = [];
                for (let i = 0; i < object.landings.length; ++i) {
                    if (typeof object.landings[i] !== "object")
                        throw TypeError(".Types.Stair.landings: object expected");
                    message.landings[i] = $root.Types.Landing.fromObject(object.landings[i]);
                }
            }
            if (object.bigColumns) {
                if (!Array.isArray(object.bigColumns))
                    throw TypeError(".Types.Stair.bigColumns: array expected");
                message.bigColumns = [];
                for (let i = 0; i < object.bigColumns.length; ++i) {
                    if (typeof object.bigColumns[i] !== "object")
                        throw TypeError(".Types.Stair.bigColumns: object expected");
                    message.bigColumns[i] = $root.Types.BigColumn.fromObject(object.bigColumns[i]);
                }
            }
            if (object.smallColumns) {
                if (!Array.isArray(object.smallColumns))
                    throw TypeError(".Types.Stair.smallColumns: array expected");
                message.smallColumns = [];
                for (let i = 0; i < object.smallColumns.length; ++i) {
                    if (typeof object.smallColumns[i] !== "object")
                        throw TypeError(".Types.Stair.smallColumns: object expected");
                    message.smallColumns[i] = $root.Types.SmallColumn.fromObject(object.smallColumns[i]);
                }
            }
            if (object.handrails) {
                if (!Array.isArray(object.handrails))
                    throw TypeError(".Types.Stair.handrails: array expected");
                message.handrails = [];
                for (let i = 0; i < object.handrails.length; ++i) {
                    if (typeof object.handrails[i] !== "object")
                        throw TypeError(".Types.Stair.handrails: object expected");
                    message.handrails[i] = $root.Types.Handrail.fromObject(object.handrails[i]);
                }
            }
            if (object.girders) {
                if (!Array.isArray(object.girders))
                    throw TypeError(".Types.Stair.girders: array expected");
                message.girders = [];
                for (let i = 0; i < object.girders.length; ++i) {
                    if (typeof object.girders[i] !== "object")
                        throw TypeError(".Types.Stair.girders: object expected");
                    message.girders[i] = $root.Types.Girder.fromObject(object.girders[i]);
                }
            }
            if (object.hangingBoard != null) {
                if (typeof object.hangingBoard !== "object")
                    throw TypeError(".Types.Stair.hangingBoard: object expected");
                message.hangingBoard = $root.Types.HangingBoard.fromObject(object.hangingBoard);
            }
            if (object.stepHeight != null)
                message.stepHeight = Number(object.stepHeight);
            if (object.position != null) {
                if (typeof object.position !== "object")
                    throw TypeError(".Types.Stair.position: object expected");
                message.position = $root.Types.Vector3.fromObject(object.position);
            }
            switch (object.floadSide) {
            case "si_ph":
            case 0:
                message.floadSide = 0;
                break;
            case "si_left":
            case 1:
                message.floadSide = 1;
                break;
            case "si_right":
            case 2:
                message.floadSide = 2;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a Stair message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Types.Stair
         * @static
         * @param {Types.Stair} message Stair
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Stair.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.flights = [];
                object.landings = [];
                object.bigColumns = [];
                object.smallColumns = [];
                object.handrails = [];
                object.girders = [];
            }
            if (options.defaults) {
                object.uuid = "";
                object.startBeamDepth = 0;
                object.exitBeamDepth = 0;
                object.type = options.enums === String ? "sph" : 0;
                object.againstWallType = options.enums === String ? "aw_ph" : 0;
                object.treadParameters = null;
                object.riserParameters = null;
                object.stepParameters = null;
                object.bigColParameters = null;
                object.smallColParameters = null;
                object.handrailParameters = null;
                object.girderParameters = null;
                object.hangingBoard = null;
                object.stepHeight = 0;
                object.position = null;
                object.floadSide = options.enums === String ? "si_ph" : 0;
            }
            if (message.uuid != null && message.hasOwnProperty("uuid"))
                object.uuid = message.uuid;
            if (message.startBeamDepth != null && message.hasOwnProperty("startBeamDepth"))
                object.startBeamDepth = options.json && !isFinite(message.startBeamDepth) ? String(message.startBeamDepth) : message.startBeamDepth;
            if (message.exitBeamDepth != null && message.hasOwnProperty("exitBeamDepth"))
                object.exitBeamDepth = options.json && !isFinite(message.exitBeamDepth) ? String(message.exitBeamDepth) : message.exitBeamDepth;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.Types.StairType[message.type] : message.type;
            if (message.againstWallType != null && message.hasOwnProperty("againstWallType"))
                object.againstWallType = options.enums === String ? $root.Types.AgainstWallType[message.againstWallType] : message.againstWallType;
            if (message.treadParameters != null && message.hasOwnProperty("treadParameters"))
                object.treadParameters = $root.Types.TreadParameters.toObject(message.treadParameters, options);
            if (message.riserParameters != null && message.hasOwnProperty("riserParameters"))
                object.riserParameters = $root.Types.RiserParameters.toObject(message.riserParameters, options);
            if (message.stepParameters != null && message.hasOwnProperty("stepParameters"))
                object.stepParameters = $root.Types.StepParameters.toObject(message.stepParameters, options);
            if (message.bigColParameters != null && message.hasOwnProperty("bigColParameters"))
                object.bigColParameters = $root.Types.BigColParameters.toObject(message.bigColParameters, options);
            if (message.smallColParameters != null && message.hasOwnProperty("smallColParameters"))
                object.smallColParameters = $root.Types.SmallColParameters.toObject(message.smallColParameters, options);
            if (message.handrailParameters != null && message.hasOwnProperty("handrailParameters"))
                object.handrailParameters = $root.Types.HandrailParameters.toObject(message.handrailParameters, options);
            if (message.girderParameters != null && message.hasOwnProperty("girderParameters"))
                object.girderParameters = $root.Types.GirderParameters.toObject(message.girderParameters, options);
            if (message.flights && message.flights.length) {
                object.flights = [];
                for (let j = 0; j < message.flights.length; ++j)
                    object.flights[j] = $root.Types.Flight.toObject(message.flights[j], options);
            }
            if (message.landings && message.landings.length) {
                object.landings = [];
                for (let j = 0; j < message.landings.length; ++j)
                    object.landings[j] = $root.Types.Landing.toObject(message.landings[j], options);
            }
            if (message.bigColumns && message.bigColumns.length) {
                object.bigColumns = [];
                for (let j = 0; j < message.bigColumns.length; ++j)
                    object.bigColumns[j] = $root.Types.BigColumn.toObject(message.bigColumns[j], options);
            }
            if (message.smallColumns && message.smallColumns.length) {
                object.smallColumns = [];
                for (let j = 0; j < message.smallColumns.length; ++j)
                    object.smallColumns[j] = $root.Types.SmallColumn.toObject(message.smallColumns[j], options);
            }
            if (message.handrails && message.handrails.length) {
                object.handrails = [];
                for (let j = 0; j < message.handrails.length; ++j)
                    object.handrails[j] = $root.Types.Handrail.toObject(message.handrails[j], options);
            }
            if (message.girders && message.girders.length) {
                object.girders = [];
                for (let j = 0; j < message.girders.length; ++j)
                    object.girders[j] = $root.Types.Girder.toObject(message.girders[j], options);
            }
            if (message.hangingBoard != null && message.hasOwnProperty("hangingBoard"))
                object.hangingBoard = $root.Types.HangingBoard.toObject(message.hangingBoard, options);
            if (message.stepHeight != null && message.hasOwnProperty("stepHeight"))
                object.stepHeight = options.json && !isFinite(message.stepHeight) ? String(message.stepHeight) : message.stepHeight;
            if (message.position != null && message.hasOwnProperty("position"))
                object.position = $root.Types.Vector3.toObject(message.position, options);
            if (message.floadSide != null && message.hasOwnProperty("floadSide"))
                object.floadSide = options.enums === String ? $root.Types.Side[message.floadSide] : message.floadSide;
            return object;
        };

        /**
         * Converts this Stair to JSON.
         * @function toJSON
         * @memberof Types.Stair
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Stair.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Stair;
    })();

    Types.HangingBoard = (function() {

        /**
         * Properties of a HangingBoard.
         * @memberof Types
         * @interface IHangingBoard
         * @property {string|null} [uuid] HangingBoard uuid
         * @property {number|null} [depth] HangingBoard depth
         * @property {number|null} [width] HangingBoard width
         * @property {number|null} [height] HangingBoard height
         */

        /**
         * Constructs a new HangingBoard.
         * @memberof Types
         * @classdesc Represents a HangingBoard.
         * @implements IHangingBoard
         * @constructor
         * @param {Types.IHangingBoard=} [properties] Properties to set
         */
        function HangingBoard(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * HangingBoard uuid.
         * @member {string} uuid
         * @memberof Types.HangingBoard
         * @instance
         */
        HangingBoard.prototype.uuid = "";

        /**
         * HangingBoard depth.
         * @member {number} depth
         * @memberof Types.HangingBoard
         * @instance
         */
        HangingBoard.prototype.depth = 0;

        /**
         * HangingBoard width.
         * @member {number} width
         * @memberof Types.HangingBoard
         * @instance
         */
        HangingBoard.prototype.width = 0;

        /**
         * HangingBoard height.
         * @member {number} height
         * @memberof Types.HangingBoard
         * @instance
         */
        HangingBoard.prototype.height = 0;

        /**
         * Creates a new HangingBoard instance using the specified properties.
         * @function create
         * @memberof Types.HangingBoard
         * @static
         * @param {Types.IHangingBoard=} [properties] Properties to set
         * @returns {Types.HangingBoard} HangingBoard instance
         */
        HangingBoard.create = function create(properties) {
            return new HangingBoard(properties);
        };

        /**
         * Encodes the specified HangingBoard message. Does not implicitly {@link Types.HangingBoard.verify|verify} messages.
         * @function encode
         * @memberof Types.HangingBoard
         * @static
         * @param {Types.IHangingBoard} message HangingBoard message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HangingBoard.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.uuid != null && Object.hasOwnProperty.call(message, "uuid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.uuid);
            if (message.depth != null && Object.hasOwnProperty.call(message, "depth"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.depth);
            if (message.width != null && Object.hasOwnProperty.call(message, "width"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.width);
            if (message.height != null && Object.hasOwnProperty.call(message, "height"))
                writer.uint32(/* id 4, wireType 5 =*/37).float(message.height);
            return writer;
        };

        /**
         * Encodes the specified HangingBoard message, length delimited. Does not implicitly {@link Types.HangingBoard.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Types.HangingBoard
         * @static
         * @param {Types.IHangingBoard} message HangingBoard message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HangingBoard.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a HangingBoard message from the specified reader or buffer.
         * @function decode
         * @memberof Types.HangingBoard
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Types.HangingBoard} HangingBoard
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HangingBoard.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Types.HangingBoard();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.uuid = reader.string();
                    break;
                case 2:
                    message.depth = reader.float();
                    break;
                case 3:
                    message.width = reader.float();
                    break;
                case 4:
                    message.height = reader.float();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a HangingBoard message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Types.HangingBoard
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Types.HangingBoard} HangingBoard
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HangingBoard.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a HangingBoard message.
         * @function verify
         * @memberof Types.HangingBoard
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        HangingBoard.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.uuid != null && message.hasOwnProperty("uuid"))
                if (!$util.isString(message.uuid))
                    return "uuid: string expected";
            if (message.depth != null && message.hasOwnProperty("depth"))
                if (typeof message.depth !== "number")
                    return "depth: number expected";
            if (message.width != null && message.hasOwnProperty("width"))
                if (typeof message.width !== "number")
                    return "width: number expected";
            if (message.height != null && message.hasOwnProperty("height"))
                if (typeof message.height !== "number")
                    return "height: number expected";
            return null;
        };

        /**
         * Creates a HangingBoard message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Types.HangingBoard
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Types.HangingBoard} HangingBoard
         */
        HangingBoard.fromObject = function fromObject(object) {
            if (object instanceof $root.Types.HangingBoard)
                return object;
            let message = new $root.Types.HangingBoard();
            if (object.uuid != null)
                message.uuid = String(object.uuid);
            if (object.depth != null)
                message.depth = Number(object.depth);
            if (object.width != null)
                message.width = Number(object.width);
            if (object.height != null)
                message.height = Number(object.height);
            return message;
        };

        /**
         * Creates a plain object from a HangingBoard message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Types.HangingBoard
         * @static
         * @param {Types.HangingBoard} message HangingBoard
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        HangingBoard.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.uuid = "";
                object.depth = 0;
                object.width = 0;
                object.height = 0;
            }
            if (message.uuid != null && message.hasOwnProperty("uuid"))
                object.uuid = message.uuid;
            if (message.depth != null && message.hasOwnProperty("depth"))
                object.depth = options.json && !isFinite(message.depth) ? String(message.depth) : message.depth;
            if (message.width != null && message.hasOwnProperty("width"))
                object.width = options.json && !isFinite(message.width) ? String(message.width) : message.width;
            if (message.height != null && message.hasOwnProperty("height"))
                object.height = options.json && !isFinite(message.height) ? String(message.height) : message.height;
            return object;
        };

        /**
         * Converts this HangingBoard to JSON.
         * @function toJSON
         * @memberof Types.HangingBoard
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        HangingBoard.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return HangingBoard;
    })();

    Types.Flight = (function() {

        /**
         * Properties of a Flight.
         * @memberof Types
         * @interface IFlight
         * @property {string|null} [uuid] Flight uuid
         * @property {number|null} [stepHeight] Flight stepHeight
         * @property {Types.IStepParameters|null} [stepParameters] Flight stepParameters
         * @property {number|null} [length] Flight length
         * @property {Array.<Types.ITread>|null} [treads] Flight treads
         * @property {Array.<Types.IRiser>|null} [risers] Flight risers
         */

        /**
         * Constructs a new Flight.
         * @memberof Types
         * @classdesc Represents a Flight.
         * @implements IFlight
         * @constructor
         * @param {Types.IFlight=} [properties] Properties to set
         */
        function Flight(properties) {
            this.treads = [];
            this.risers = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Flight uuid.
         * @member {string} uuid
         * @memberof Types.Flight
         * @instance
         */
        Flight.prototype.uuid = "";

        /**
         * Flight stepHeight.
         * @member {number} stepHeight
         * @memberof Types.Flight
         * @instance
         */
        Flight.prototype.stepHeight = 0;

        /**
         * Flight stepParameters.
         * @member {Types.IStepParameters|null|undefined} stepParameters
         * @memberof Types.Flight
         * @instance
         */
        Flight.prototype.stepParameters = null;

        /**
         * Flight length.
         * @member {number} length
         * @memberof Types.Flight
         * @instance
         */
        Flight.prototype.length = 0;

        /**
         * Flight treads.
         * @member {Array.<Types.ITread>} treads
         * @memberof Types.Flight
         * @instance
         */
        Flight.prototype.treads = $util.emptyArray;

        /**
         * Flight risers.
         * @member {Array.<Types.IRiser>} risers
         * @memberof Types.Flight
         * @instance
         */
        Flight.prototype.risers = $util.emptyArray;

        /**
         * Creates a new Flight instance using the specified properties.
         * @function create
         * @memberof Types.Flight
         * @static
         * @param {Types.IFlight=} [properties] Properties to set
         * @returns {Types.Flight} Flight instance
         */
        Flight.create = function create(properties) {
            return new Flight(properties);
        };

        /**
         * Encodes the specified Flight message. Does not implicitly {@link Types.Flight.verify|verify} messages.
         * @function encode
         * @memberof Types.Flight
         * @static
         * @param {Types.IFlight} message Flight message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Flight.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.uuid != null && Object.hasOwnProperty.call(message, "uuid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.uuid);
            if (message.stepHeight != null && Object.hasOwnProperty.call(message, "stepHeight"))
                writer.uint32(/* id 4, wireType 5 =*/37).float(message.stepHeight);
            if (message.stepParameters != null && Object.hasOwnProperty.call(message, "stepParameters"))
                $root.Types.StepParameters.encode(message.stepParameters, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.length != null && Object.hasOwnProperty.call(message, "length"))
                writer.uint32(/* id 6, wireType 5 =*/53).float(message.length);
            if (message.treads != null && message.treads.length)
                for (let i = 0; i < message.treads.length; ++i)
                    $root.Types.Tread.encode(message.treads[i], writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
            if (message.risers != null && message.risers.length)
                for (let i = 0; i < message.risers.length; ++i)
                    $root.Types.Riser.encode(message.risers[i], writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Flight message, length delimited. Does not implicitly {@link Types.Flight.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Types.Flight
         * @static
         * @param {Types.IFlight} message Flight message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Flight.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Flight message from the specified reader or buffer.
         * @function decode
         * @memberof Types.Flight
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Types.Flight} Flight
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Flight.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Types.Flight();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.uuid = reader.string();
                    break;
                case 4:
                    message.stepHeight = reader.float();
                    break;
                case 5:
                    message.stepParameters = $root.Types.StepParameters.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.length = reader.float();
                    break;
                case 7:
                    if (!(message.treads && message.treads.length))
                        message.treads = [];
                    message.treads.push($root.Types.Tread.decode(reader, reader.uint32()));
                    break;
                case 8:
                    if (!(message.risers && message.risers.length))
                        message.risers = [];
                    message.risers.push($root.Types.Riser.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Flight message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Types.Flight
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Types.Flight} Flight
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Flight.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Flight message.
         * @function verify
         * @memberof Types.Flight
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Flight.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.uuid != null && message.hasOwnProperty("uuid"))
                if (!$util.isString(message.uuid))
                    return "uuid: string expected";
            if (message.stepHeight != null && message.hasOwnProperty("stepHeight"))
                if (typeof message.stepHeight !== "number")
                    return "stepHeight: number expected";
            if (message.stepParameters != null && message.hasOwnProperty("stepParameters")) {
                let error = $root.Types.StepParameters.verify(message.stepParameters);
                if (error)
                    return "stepParameters." + error;
            }
            if (message.length != null && message.hasOwnProperty("length"))
                if (typeof message.length !== "number")
                    return "length: number expected";
            if (message.treads != null && message.hasOwnProperty("treads")) {
                if (!Array.isArray(message.treads))
                    return "treads: array expected";
                for (let i = 0; i < message.treads.length; ++i) {
                    let error = $root.Types.Tread.verify(message.treads[i]);
                    if (error)
                        return "treads." + error;
                }
            }
            if (message.risers != null && message.hasOwnProperty("risers")) {
                if (!Array.isArray(message.risers))
                    return "risers: array expected";
                for (let i = 0; i < message.risers.length; ++i) {
                    let error = $root.Types.Riser.verify(message.risers[i]);
                    if (error)
                        return "risers." + error;
                }
            }
            return null;
        };

        /**
         * Creates a Flight message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Types.Flight
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Types.Flight} Flight
         */
        Flight.fromObject = function fromObject(object) {
            if (object instanceof $root.Types.Flight)
                return object;
            let message = new $root.Types.Flight();
            if (object.uuid != null)
                message.uuid = String(object.uuid);
            if (object.stepHeight != null)
                message.stepHeight = Number(object.stepHeight);
            if (object.stepParameters != null) {
                if (typeof object.stepParameters !== "object")
                    throw TypeError(".Types.Flight.stepParameters: object expected");
                message.stepParameters = $root.Types.StepParameters.fromObject(object.stepParameters);
            }
            if (object.length != null)
                message.length = Number(object.length);
            if (object.treads) {
                if (!Array.isArray(object.treads))
                    throw TypeError(".Types.Flight.treads: array expected");
                message.treads = [];
                for (let i = 0; i < object.treads.length; ++i) {
                    if (typeof object.treads[i] !== "object")
                        throw TypeError(".Types.Flight.treads: object expected");
                    message.treads[i] = $root.Types.Tread.fromObject(object.treads[i]);
                }
            }
            if (object.risers) {
                if (!Array.isArray(object.risers))
                    throw TypeError(".Types.Flight.risers: array expected");
                message.risers = [];
                for (let i = 0; i < object.risers.length; ++i) {
                    if (typeof object.risers[i] !== "object")
                        throw TypeError(".Types.Flight.risers: object expected");
                    message.risers[i] = $root.Types.Riser.fromObject(object.risers[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a Flight message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Types.Flight
         * @static
         * @param {Types.Flight} message Flight
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Flight.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.treads = [];
                object.risers = [];
            }
            if (options.defaults) {
                object.uuid = "";
                object.stepHeight = 0;
                object.stepParameters = null;
                object.length = 0;
            }
            if (message.uuid != null && message.hasOwnProperty("uuid"))
                object.uuid = message.uuid;
            if (message.stepHeight != null && message.hasOwnProperty("stepHeight"))
                object.stepHeight = options.json && !isFinite(message.stepHeight) ? String(message.stepHeight) : message.stepHeight;
            if (message.stepParameters != null && message.hasOwnProperty("stepParameters"))
                object.stepParameters = $root.Types.StepParameters.toObject(message.stepParameters, options);
            if (message.length != null && message.hasOwnProperty("length"))
                object.length = options.json && !isFinite(message.length) ? String(message.length) : message.length;
            if (message.treads && message.treads.length) {
                object.treads = [];
                for (let j = 0; j < message.treads.length; ++j)
                    object.treads[j] = $root.Types.Tread.toObject(message.treads[j], options);
            }
            if (message.risers && message.risers.length) {
                object.risers = [];
                for (let j = 0; j < message.risers.length; ++j)
                    object.risers[j] = $root.Types.Riser.toObject(message.risers[j], options);
            }
            return object;
        };

        /**
         * Converts this Flight to JSON.
         * @function toJSON
         * @memberof Types.Flight
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Flight.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Flight;
    })();

    Types.Tread = (function() {

        /**
         * Properties of a Tread.
         * @memberof Types
         * @interface ITread
         * @property {string|null} [uuid] Tread uuid
         * @property {Types.ITreadBorder|null} [border] Tread border
         * @property {number|null} [index] Tread index
         * @property {boolean|null} [isLast] Tread isLast
         * @property {number|null} [stepLength] Tread stepLength
         * @property {number|null} [stepWidth] Tread stepWidth
         * @property {number|null} [stepHeight] Tread stepHeight
         * @property {boolean|null} [inheritL] Tread inheritL
         * @property {boolean|null} [inheritH] Tread inheritH
         * @property {boolean|null} [inheritW] Tread inheritW
         * @property {Types.TreadType|null} [type] Tread type
         */

        /**
         * Constructs a new Tread.
         * @memberof Types
         * @classdesc Represents a Tread.
         * @implements ITread
         * @constructor
         * @param {Types.ITread=} [properties] Properties to set
         */
        function Tread(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Tread uuid.
         * @member {string} uuid
         * @memberof Types.Tread
         * @instance
         */
        Tread.prototype.uuid = "";

        /**
         * Tread border.
         * @member {Types.ITreadBorder|null|undefined} border
         * @memberof Types.Tread
         * @instance
         */
        Tread.prototype.border = null;

        /**
         * Tread index.
         * @member {number} index
         * @memberof Types.Tread
         * @instance
         */
        Tread.prototype.index = 0;

        /**
         * Tread isLast.
         * @member {boolean} isLast
         * @memberof Types.Tread
         * @instance
         */
        Tread.prototype.isLast = false;

        /**
         * Tread stepLength.
         * @member {number} stepLength
         * @memberof Types.Tread
         * @instance
         */
        Tread.prototype.stepLength = 0;

        /**
         * Tread stepWidth.
         * @member {number} stepWidth
         * @memberof Types.Tread
         * @instance
         */
        Tread.prototype.stepWidth = 0;

        /**
         * Tread stepHeight.
         * @member {number} stepHeight
         * @memberof Types.Tread
         * @instance
         */
        Tread.prototype.stepHeight = 0;

        /**
         * Tread inheritL.
         * @member {boolean} inheritL
         * @memberof Types.Tread
         * @instance
         */
        Tread.prototype.inheritL = false;

        /**
         * Tread inheritH.
         * @member {boolean} inheritH
         * @memberof Types.Tread
         * @instance
         */
        Tread.prototype.inheritH = false;

        /**
         * Tread inheritW.
         * @member {boolean} inheritW
         * @memberof Types.Tread
         * @instance
         */
        Tread.prototype.inheritW = false;

        /**
         * Tread type.
         * @member {Types.TreadType} type
         * @memberof Types.Tread
         * @instance
         */
        Tread.prototype.type = 0;

        /**
         * Creates a new Tread instance using the specified properties.
         * @function create
         * @memberof Types.Tread
         * @static
         * @param {Types.ITread=} [properties] Properties to set
         * @returns {Types.Tread} Tread instance
         */
        Tread.create = function create(properties) {
            return new Tread(properties);
        };

        /**
         * Encodes the specified Tread message. Does not implicitly {@link Types.Tread.verify|verify} messages.
         * @function encode
         * @memberof Types.Tread
         * @static
         * @param {Types.ITread} message Tread message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Tread.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.uuid != null && Object.hasOwnProperty.call(message, "uuid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.uuid);
            if (message.border != null && Object.hasOwnProperty.call(message, "border"))
                $root.Types.TreadBorder.encode(message.border, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.index != null && Object.hasOwnProperty.call(message, "index"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.index);
            if (message.isLast != null && Object.hasOwnProperty.call(message, "isLast"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.isLast);
            if (message.stepLength != null && Object.hasOwnProperty.call(message, "stepLength"))
                writer.uint32(/* id 5, wireType 5 =*/45).float(message.stepLength);
            if (message.stepWidth != null && Object.hasOwnProperty.call(message, "stepWidth"))
                writer.uint32(/* id 6, wireType 5 =*/53).float(message.stepWidth);
            if (message.stepHeight != null && Object.hasOwnProperty.call(message, "stepHeight"))
                writer.uint32(/* id 7, wireType 5 =*/61).float(message.stepHeight);
            if (message.inheritL != null && Object.hasOwnProperty.call(message, "inheritL"))
                writer.uint32(/* id 8, wireType 0 =*/64).bool(message.inheritL);
            if (message.inheritH != null && Object.hasOwnProperty.call(message, "inheritH"))
                writer.uint32(/* id 9, wireType 0 =*/72).bool(message.inheritH);
            if (message.inheritW != null && Object.hasOwnProperty.call(message, "inheritW"))
                writer.uint32(/* id 10, wireType 0 =*/80).bool(message.inheritW);
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 11, wireType 0 =*/88).int32(message.type);
            return writer;
        };

        /**
         * Encodes the specified Tread message, length delimited. Does not implicitly {@link Types.Tread.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Types.Tread
         * @static
         * @param {Types.ITread} message Tread message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Tread.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Tread message from the specified reader or buffer.
         * @function decode
         * @memberof Types.Tread
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Types.Tread} Tread
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Tread.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Types.Tread();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.uuid = reader.string();
                    break;
                case 2:
                    message.border = $root.Types.TreadBorder.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.index = reader.float();
                    break;
                case 4:
                    message.isLast = reader.bool();
                    break;
                case 5:
                    message.stepLength = reader.float();
                    break;
                case 6:
                    message.stepWidth = reader.float();
                    break;
                case 7:
                    message.stepHeight = reader.float();
                    break;
                case 8:
                    message.inheritL = reader.bool();
                    break;
                case 9:
                    message.inheritH = reader.bool();
                    break;
                case 10:
                    message.inheritW = reader.bool();
                    break;
                case 11:
                    message.type = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Tread message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Types.Tread
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Types.Tread} Tread
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Tread.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Tread message.
         * @function verify
         * @memberof Types.Tread
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Tread.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.uuid != null && message.hasOwnProperty("uuid"))
                if (!$util.isString(message.uuid))
                    return "uuid: string expected";
            if (message.border != null && message.hasOwnProperty("border")) {
                let error = $root.Types.TreadBorder.verify(message.border);
                if (error)
                    return "border." + error;
            }
            if (message.index != null && message.hasOwnProperty("index"))
                if (typeof message.index !== "number")
                    return "index: number expected";
            if (message.isLast != null && message.hasOwnProperty("isLast"))
                if (typeof message.isLast !== "boolean")
                    return "isLast: boolean expected";
            if (message.stepLength != null && message.hasOwnProperty("stepLength"))
                if (typeof message.stepLength !== "number")
                    return "stepLength: number expected";
            if (message.stepWidth != null && message.hasOwnProperty("stepWidth"))
                if (typeof message.stepWidth !== "number")
                    return "stepWidth: number expected";
            if (message.stepHeight != null && message.hasOwnProperty("stepHeight"))
                if (typeof message.stepHeight !== "number")
                    return "stepHeight: number expected";
            if (message.inheritL != null && message.hasOwnProperty("inheritL"))
                if (typeof message.inheritL !== "boolean")
                    return "inheritL: boolean expected";
            if (message.inheritH != null && message.hasOwnProperty("inheritH"))
                if (typeof message.inheritH !== "boolean")
                    return "inheritH: boolean expected";
            if (message.inheritW != null && message.hasOwnProperty("inheritW"))
                if (typeof message.inheritW !== "boolean")
                    return "inheritW: boolean expected";
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    break;
                }
            return null;
        };

        /**
         * Creates a Tread message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Types.Tread
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Types.Tread} Tread
         */
        Tread.fromObject = function fromObject(object) {
            if (object instanceof $root.Types.Tread)
                return object;
            let message = new $root.Types.Tread();
            if (object.uuid != null)
                message.uuid = String(object.uuid);
            if (object.border != null) {
                if (typeof object.border !== "object")
                    throw TypeError(".Types.Tread.border: object expected");
                message.border = $root.Types.TreadBorder.fromObject(object.border);
            }
            if (object.index != null)
                message.index = Number(object.index);
            if (object.isLast != null)
                message.isLast = Boolean(object.isLast);
            if (object.stepLength != null)
                message.stepLength = Number(object.stepLength);
            if (object.stepWidth != null)
                message.stepWidth = Number(object.stepWidth);
            if (object.stepHeight != null)
                message.stepHeight = Number(object.stepHeight);
            if (object.inheritL != null)
                message.inheritL = Boolean(object.inheritL);
            if (object.inheritH != null)
                message.inheritH = Boolean(object.inheritH);
            if (object.inheritW != null)
                message.inheritW = Boolean(object.inheritW);
            switch (object.type) {
            case "tph":
            case 0:
                message.type = 0;
                break;
            case "trect":
            case 1:
                message.type = 1;
                break;
            case "tStart":
            case 2:
                message.type = 2;
                break;
            case "tSpec":
            case 3:
                message.type = 3;
                break;
            case "tCor":
            case 4:
                message.type = 4;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a Tread message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Types.Tread
         * @static
         * @param {Types.Tread} message Tread
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Tread.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.uuid = "";
                object.border = null;
                object.index = 0;
                object.isLast = false;
                object.stepLength = 0;
                object.stepWidth = 0;
                object.stepHeight = 0;
                object.inheritL = false;
                object.inheritH = false;
                object.inheritW = false;
                object.type = options.enums === String ? "tph" : 0;
            }
            if (message.uuid != null && message.hasOwnProperty("uuid"))
                object.uuid = message.uuid;
            if (message.border != null && message.hasOwnProperty("border"))
                object.border = $root.Types.TreadBorder.toObject(message.border, options);
            if (message.index != null && message.hasOwnProperty("index"))
                object.index = options.json && !isFinite(message.index) ? String(message.index) : message.index;
            if (message.isLast != null && message.hasOwnProperty("isLast"))
                object.isLast = message.isLast;
            if (message.stepLength != null && message.hasOwnProperty("stepLength"))
                object.stepLength = options.json && !isFinite(message.stepLength) ? String(message.stepLength) : message.stepLength;
            if (message.stepWidth != null && message.hasOwnProperty("stepWidth"))
                object.stepWidth = options.json && !isFinite(message.stepWidth) ? String(message.stepWidth) : message.stepWidth;
            if (message.stepHeight != null && message.hasOwnProperty("stepHeight"))
                object.stepHeight = options.json && !isFinite(message.stepHeight) ? String(message.stepHeight) : message.stepHeight;
            if (message.inheritL != null && message.hasOwnProperty("inheritL"))
                object.inheritL = message.inheritL;
            if (message.inheritH != null && message.hasOwnProperty("inheritH"))
                object.inheritH = message.inheritH;
            if (message.inheritW != null && message.hasOwnProperty("inheritW"))
                object.inheritW = message.inheritW;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.Types.TreadType[message.type] : message.type;
            return object;
        };

        /**
         * Converts this Tread to JSON.
         * @function toJSON
         * @memberof Types.Tread
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Tread.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Tread;
    })();

    Types.TreadBorder = (function() {

        /**
         * Properties of a TreadBorder.
         * @memberof Types
         * @interface ITreadBorder
         * @property {Types.IOutline|null} [stepOutline] TreadBorder stepOutline
         * @property {Types.IOutline|null} [treadOutline] TreadBorder treadOutline
         * @property {Array.<number>|null} [inIndex] TreadBorder inIndex
         * @property {Array.<number>|null} [outIndex] TreadBorder outIndex
         * @property {Array.<number>|null} [frontIndex] TreadBorder frontIndex
         * @property {Array.<number>|null} [backIndex] TreadBorder backIndex
         */

        /**
         * Constructs a new TreadBorder.
         * @memberof Types
         * @classdesc Represents a TreadBorder.
         * @implements ITreadBorder
         * @constructor
         * @param {Types.ITreadBorder=} [properties] Properties to set
         */
        function TreadBorder(properties) {
            this.inIndex = [];
            this.outIndex = [];
            this.frontIndex = [];
            this.backIndex = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TreadBorder stepOutline.
         * @member {Types.IOutline|null|undefined} stepOutline
         * @memberof Types.TreadBorder
         * @instance
         */
        TreadBorder.prototype.stepOutline = null;

        /**
         * TreadBorder treadOutline.
         * @member {Types.IOutline|null|undefined} treadOutline
         * @memberof Types.TreadBorder
         * @instance
         */
        TreadBorder.prototype.treadOutline = null;

        /**
         * TreadBorder inIndex.
         * @member {Array.<number>} inIndex
         * @memberof Types.TreadBorder
         * @instance
         */
        TreadBorder.prototype.inIndex = $util.emptyArray;

        /**
         * TreadBorder outIndex.
         * @member {Array.<number>} outIndex
         * @memberof Types.TreadBorder
         * @instance
         */
        TreadBorder.prototype.outIndex = $util.emptyArray;

        /**
         * TreadBorder frontIndex.
         * @member {Array.<number>} frontIndex
         * @memberof Types.TreadBorder
         * @instance
         */
        TreadBorder.prototype.frontIndex = $util.emptyArray;

        /**
         * TreadBorder backIndex.
         * @member {Array.<number>} backIndex
         * @memberof Types.TreadBorder
         * @instance
         */
        TreadBorder.prototype.backIndex = $util.emptyArray;

        /**
         * Creates a new TreadBorder instance using the specified properties.
         * @function create
         * @memberof Types.TreadBorder
         * @static
         * @param {Types.ITreadBorder=} [properties] Properties to set
         * @returns {Types.TreadBorder} TreadBorder instance
         */
        TreadBorder.create = function create(properties) {
            return new TreadBorder(properties);
        };

        /**
         * Encodes the specified TreadBorder message. Does not implicitly {@link Types.TreadBorder.verify|verify} messages.
         * @function encode
         * @memberof Types.TreadBorder
         * @static
         * @param {Types.ITreadBorder} message TreadBorder message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TreadBorder.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.stepOutline != null && Object.hasOwnProperty.call(message, "stepOutline"))
                $root.Types.Outline.encode(message.stepOutline, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.treadOutline != null && Object.hasOwnProperty.call(message, "treadOutline"))
                $root.Types.Outline.encode(message.treadOutline, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.inIndex != null && message.inIndex.length) {
                writer.uint32(/* id 3, wireType 2 =*/26).fork();
                for (let i = 0; i < message.inIndex.length; ++i)
                    writer.float(message.inIndex[i]);
                writer.ldelim();
            }
            if (message.outIndex != null && message.outIndex.length) {
                writer.uint32(/* id 4, wireType 2 =*/34).fork();
                for (let i = 0; i < message.outIndex.length; ++i)
                    writer.float(message.outIndex[i]);
                writer.ldelim();
            }
            if (message.frontIndex != null && message.frontIndex.length) {
                writer.uint32(/* id 5, wireType 2 =*/42).fork();
                for (let i = 0; i < message.frontIndex.length; ++i)
                    writer.float(message.frontIndex[i]);
                writer.ldelim();
            }
            if (message.backIndex != null && message.backIndex.length) {
                writer.uint32(/* id 6, wireType 2 =*/50).fork();
                for (let i = 0; i < message.backIndex.length; ++i)
                    writer.float(message.backIndex[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified TreadBorder message, length delimited. Does not implicitly {@link Types.TreadBorder.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Types.TreadBorder
         * @static
         * @param {Types.ITreadBorder} message TreadBorder message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TreadBorder.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TreadBorder message from the specified reader or buffer.
         * @function decode
         * @memberof Types.TreadBorder
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Types.TreadBorder} TreadBorder
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TreadBorder.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Types.TreadBorder();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.stepOutline = $root.Types.Outline.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.treadOutline = $root.Types.Outline.decode(reader, reader.uint32());
                    break;
                case 3:
                    if (!(message.inIndex && message.inIndex.length))
                        message.inIndex = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.inIndex.push(reader.float());
                    } else
                        message.inIndex.push(reader.float());
                    break;
                case 4:
                    if (!(message.outIndex && message.outIndex.length))
                        message.outIndex = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.outIndex.push(reader.float());
                    } else
                        message.outIndex.push(reader.float());
                    break;
                case 5:
                    if (!(message.frontIndex && message.frontIndex.length))
                        message.frontIndex = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.frontIndex.push(reader.float());
                    } else
                        message.frontIndex.push(reader.float());
                    break;
                case 6:
                    if (!(message.backIndex && message.backIndex.length))
                        message.backIndex = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.backIndex.push(reader.float());
                    } else
                        message.backIndex.push(reader.float());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TreadBorder message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Types.TreadBorder
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Types.TreadBorder} TreadBorder
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TreadBorder.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TreadBorder message.
         * @function verify
         * @memberof Types.TreadBorder
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TreadBorder.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.stepOutline != null && message.hasOwnProperty("stepOutline")) {
                let error = $root.Types.Outline.verify(message.stepOutline);
                if (error)
                    return "stepOutline." + error;
            }
            if (message.treadOutline != null && message.hasOwnProperty("treadOutline")) {
                let error = $root.Types.Outline.verify(message.treadOutline);
                if (error)
                    return "treadOutline." + error;
            }
            if (message.inIndex != null && message.hasOwnProperty("inIndex")) {
                if (!Array.isArray(message.inIndex))
                    return "inIndex: array expected";
                for (let i = 0; i < message.inIndex.length; ++i)
                    if (typeof message.inIndex[i] !== "number")
                        return "inIndex: number[] expected";
            }
            if (message.outIndex != null && message.hasOwnProperty("outIndex")) {
                if (!Array.isArray(message.outIndex))
                    return "outIndex: array expected";
                for (let i = 0; i < message.outIndex.length; ++i)
                    if (typeof message.outIndex[i] !== "number")
                        return "outIndex: number[] expected";
            }
            if (message.frontIndex != null && message.hasOwnProperty("frontIndex")) {
                if (!Array.isArray(message.frontIndex))
                    return "frontIndex: array expected";
                for (let i = 0; i < message.frontIndex.length; ++i)
                    if (typeof message.frontIndex[i] !== "number")
                        return "frontIndex: number[] expected";
            }
            if (message.backIndex != null && message.hasOwnProperty("backIndex")) {
                if (!Array.isArray(message.backIndex))
                    return "backIndex: array expected";
                for (let i = 0; i < message.backIndex.length; ++i)
                    if (typeof message.backIndex[i] !== "number")
                        return "backIndex: number[] expected";
            }
            return null;
        };

        /**
         * Creates a TreadBorder message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Types.TreadBorder
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Types.TreadBorder} TreadBorder
         */
        TreadBorder.fromObject = function fromObject(object) {
            if (object instanceof $root.Types.TreadBorder)
                return object;
            let message = new $root.Types.TreadBorder();
            if (object.stepOutline != null) {
                if (typeof object.stepOutline !== "object")
                    throw TypeError(".Types.TreadBorder.stepOutline: object expected");
                message.stepOutline = $root.Types.Outline.fromObject(object.stepOutline);
            }
            if (object.treadOutline != null) {
                if (typeof object.treadOutline !== "object")
                    throw TypeError(".Types.TreadBorder.treadOutline: object expected");
                message.treadOutline = $root.Types.Outline.fromObject(object.treadOutline);
            }
            if (object.inIndex) {
                if (!Array.isArray(object.inIndex))
                    throw TypeError(".Types.TreadBorder.inIndex: array expected");
                message.inIndex = [];
                for (let i = 0; i < object.inIndex.length; ++i)
                    message.inIndex[i] = Number(object.inIndex[i]);
            }
            if (object.outIndex) {
                if (!Array.isArray(object.outIndex))
                    throw TypeError(".Types.TreadBorder.outIndex: array expected");
                message.outIndex = [];
                for (let i = 0; i < object.outIndex.length; ++i)
                    message.outIndex[i] = Number(object.outIndex[i]);
            }
            if (object.frontIndex) {
                if (!Array.isArray(object.frontIndex))
                    throw TypeError(".Types.TreadBorder.frontIndex: array expected");
                message.frontIndex = [];
                for (let i = 0; i < object.frontIndex.length; ++i)
                    message.frontIndex[i] = Number(object.frontIndex[i]);
            }
            if (object.backIndex) {
                if (!Array.isArray(object.backIndex))
                    throw TypeError(".Types.TreadBorder.backIndex: array expected");
                message.backIndex = [];
                for (let i = 0; i < object.backIndex.length; ++i)
                    message.backIndex[i] = Number(object.backIndex[i]);
            }
            return message;
        };

        /**
         * Creates a plain object from a TreadBorder message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Types.TreadBorder
         * @static
         * @param {Types.TreadBorder} message TreadBorder
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TreadBorder.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.inIndex = [];
                object.outIndex = [];
                object.frontIndex = [];
                object.backIndex = [];
            }
            if (options.defaults) {
                object.stepOutline = null;
                object.treadOutline = null;
            }
            if (message.stepOutline != null && message.hasOwnProperty("stepOutline"))
                object.stepOutline = $root.Types.Outline.toObject(message.stepOutline, options);
            if (message.treadOutline != null && message.hasOwnProperty("treadOutline"))
                object.treadOutline = $root.Types.Outline.toObject(message.treadOutline, options);
            if (message.inIndex && message.inIndex.length) {
                object.inIndex = [];
                for (let j = 0; j < message.inIndex.length; ++j)
                    object.inIndex[j] = options.json && !isFinite(message.inIndex[j]) ? String(message.inIndex[j]) : message.inIndex[j];
            }
            if (message.outIndex && message.outIndex.length) {
                object.outIndex = [];
                for (let j = 0; j < message.outIndex.length; ++j)
                    object.outIndex[j] = options.json && !isFinite(message.outIndex[j]) ? String(message.outIndex[j]) : message.outIndex[j];
            }
            if (message.frontIndex && message.frontIndex.length) {
                object.frontIndex = [];
                for (let j = 0; j < message.frontIndex.length; ++j)
                    object.frontIndex[j] = options.json && !isFinite(message.frontIndex[j]) ? String(message.frontIndex[j]) : message.frontIndex[j];
            }
            if (message.backIndex && message.backIndex.length) {
                object.backIndex = [];
                for (let j = 0; j < message.backIndex.length; ++j)
                    object.backIndex[j] = options.json && !isFinite(message.backIndex[j]) ? String(message.backIndex[j]) : message.backIndex[j];
            }
            return object;
        };

        /**
         * Converts this TreadBorder to JSON.
         * @function toJSON
         * @memberof Types.TreadBorder
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TreadBorder.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TreadBorder;
    })();

    Types.StepParameters = (function() {

        /**
         * Properties of a StepParameters.
         * @memberof Types
         * @interface IStepParameters
         * @property {number|null} [stepLength] StepParameters stepLength
         * @property {number|null} [stepWidth] StepParameters stepWidth
         * @property {Types.StepNumRule|null} [stepNumRule] StepParameters stepNumRule
         * @property {number|null} [stepNum] StepParameters stepNum
         */

        /**
         * Constructs a new StepParameters.
         * @memberof Types
         * @classdesc Represents a StepParameters.
         * @implements IStepParameters
         * @constructor
         * @param {Types.IStepParameters=} [properties] Properties to set
         */
        function StepParameters(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * StepParameters stepLength.
         * @member {number} stepLength
         * @memberof Types.StepParameters
         * @instance
         */
        StepParameters.prototype.stepLength = 0;

        /**
         * StepParameters stepWidth.
         * @member {number} stepWidth
         * @memberof Types.StepParameters
         * @instance
         */
        StepParameters.prototype.stepWidth = 0;

        /**
         * StepParameters stepNumRule.
         * @member {Types.StepNumRule} stepNumRule
         * @memberof Types.StepParameters
         * @instance
         */
        StepParameters.prototype.stepNumRule = 0;

        /**
         * StepParameters stepNum.
         * @member {number} stepNum
         * @memberof Types.StepParameters
         * @instance
         */
        StepParameters.prototype.stepNum = 0;

        /**
         * Creates a new StepParameters instance using the specified properties.
         * @function create
         * @memberof Types.StepParameters
         * @static
         * @param {Types.IStepParameters=} [properties] Properties to set
         * @returns {Types.StepParameters} StepParameters instance
         */
        StepParameters.create = function create(properties) {
            return new StepParameters(properties);
        };

        /**
         * Encodes the specified StepParameters message. Does not implicitly {@link Types.StepParameters.verify|verify} messages.
         * @function encode
         * @memberof Types.StepParameters
         * @static
         * @param {Types.IStepParameters} message StepParameters message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StepParameters.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.stepLength != null && Object.hasOwnProperty.call(message, "stepLength"))
                writer.uint32(/* id 1, wireType 5 =*/13).float(message.stepLength);
            if (message.stepWidth != null && Object.hasOwnProperty.call(message, "stepWidth"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.stepWidth);
            if (message.stepNumRule != null && Object.hasOwnProperty.call(message, "stepNumRule"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.stepNumRule);
            if (message.stepNum != null && Object.hasOwnProperty.call(message, "stepNum"))
                writer.uint32(/* id 4, wireType 5 =*/37).float(message.stepNum);
            return writer;
        };

        /**
         * Encodes the specified StepParameters message, length delimited. Does not implicitly {@link Types.StepParameters.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Types.StepParameters
         * @static
         * @param {Types.IStepParameters} message StepParameters message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StepParameters.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a StepParameters message from the specified reader or buffer.
         * @function decode
         * @memberof Types.StepParameters
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Types.StepParameters} StepParameters
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StepParameters.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Types.StepParameters();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.stepLength = reader.float();
                    break;
                case 2:
                    message.stepWidth = reader.float();
                    break;
                case 3:
                    message.stepNumRule = reader.int32();
                    break;
                case 4:
                    message.stepNum = reader.float();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a StepParameters message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Types.StepParameters
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Types.StepParameters} StepParameters
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StepParameters.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a StepParameters message.
         * @function verify
         * @memberof Types.StepParameters
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        StepParameters.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.stepLength != null && message.hasOwnProperty("stepLength"))
                if (typeof message.stepLength !== "number")
                    return "stepLength: number expected";
            if (message.stepWidth != null && message.hasOwnProperty("stepWidth"))
                if (typeof message.stepWidth !== "number")
                    return "stepWidth: number expected";
            if (message.stepNumRule != null && message.hasOwnProperty("stepNumRule"))
                switch (message.stepNumRule) {
                default:
                    return "stepNumRule: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            if (message.stepNum != null && message.hasOwnProperty("stepNum"))
                if (typeof message.stepNum !== "number")
                    return "stepNum: number expected";
            return null;
        };

        /**
         * Creates a StepParameters message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Types.StepParameters
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Types.StepParameters} StepParameters
         */
        StepParameters.fromObject = function fromObject(object) {
            if (object instanceof $root.Types.StepParameters)
                return object;
            let message = new $root.Types.StepParameters();
            if (object.stepLength != null)
                message.stepLength = Number(object.stepLength);
            if (object.stepWidth != null)
                message.stepWidth = Number(object.stepWidth);
            switch (object.stepNumRule) {
            case "snr_ph":
            case 0:
                message.stepNumRule = 0;
                break;
            case "snr_n":
            case 1:
                message.stepNumRule = 1;
                break;
            case "snr_n_add_1":
            case 2:
                message.stepNumRule = 2;
                break;
            }
            if (object.stepNum != null)
                message.stepNum = Number(object.stepNum);
            return message;
        };

        /**
         * Creates a plain object from a StepParameters message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Types.StepParameters
         * @static
         * @param {Types.StepParameters} message StepParameters
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        StepParameters.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.stepLength = 0;
                object.stepWidth = 0;
                object.stepNumRule = options.enums === String ? "snr_ph" : 0;
                object.stepNum = 0;
            }
            if (message.stepLength != null && message.hasOwnProperty("stepLength"))
                object.stepLength = options.json && !isFinite(message.stepLength) ? String(message.stepLength) : message.stepLength;
            if (message.stepWidth != null && message.hasOwnProperty("stepWidth"))
                object.stepWidth = options.json && !isFinite(message.stepWidth) ? String(message.stepWidth) : message.stepWidth;
            if (message.stepNumRule != null && message.hasOwnProperty("stepNumRule"))
                object.stepNumRule = options.enums === String ? $root.Types.StepNumRule[message.stepNumRule] : message.stepNumRule;
            if (message.stepNum != null && message.hasOwnProperty("stepNum"))
                object.stepNum = options.json && !isFinite(message.stepNum) ? String(message.stepNum) : message.stepNum;
            return object;
        };

        /**
         * Converts this StepParameters to JSON.
         * @function toJSON
         * @memberof Types.StepParameters
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        StepParameters.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return StepParameters;
    })();

    Types.TreadParameters = (function() {

        /**
         * Properties of a TreadParameters.
         * @memberof Types
         * @interface ITreadParameters
         * @property {number|null} [depth] TreadParameters depth
         * @property {Types.IMaterial|null} [material] TreadParameters material
         * @property {boolean|null} [doubleFaceMaterial] TreadParameters doubleFaceMaterial
         * @property {Types.NossingType|null} [nossingType] TreadParameters nossingType
         * @property {number|null} [nossing] TreadParameters nossing
         * @property {number|null} [sideNossing] TreadParameters sideNossing
         */

        /**
         * Constructs a new TreadParameters.
         * @memberof Types
         * @classdesc Represents a TreadParameters.
         * @implements ITreadParameters
         * @constructor
         * @param {Types.ITreadParameters=} [properties] Properties to set
         */
        function TreadParameters(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TreadParameters depth.
         * @member {number} depth
         * @memberof Types.TreadParameters
         * @instance
         */
        TreadParameters.prototype.depth = 0;

        /**
         * TreadParameters material.
         * @member {Types.IMaterial|null|undefined} material
         * @memberof Types.TreadParameters
         * @instance
         */
        TreadParameters.prototype.material = null;

        /**
         * TreadParameters doubleFaceMaterial.
         * @member {boolean} doubleFaceMaterial
         * @memberof Types.TreadParameters
         * @instance
         */
        TreadParameters.prototype.doubleFaceMaterial = false;

        /**
         * TreadParameters nossingType.
         * @member {Types.NossingType} nossingType
         * @memberof Types.TreadParameters
         * @instance
         */
        TreadParameters.prototype.nossingType = 0;

        /**
         * TreadParameters nossing.
         * @member {number} nossing
         * @memberof Types.TreadParameters
         * @instance
         */
        TreadParameters.prototype.nossing = 0;

        /**
         * TreadParameters sideNossing.
         * @member {number} sideNossing
         * @memberof Types.TreadParameters
         * @instance
         */
        TreadParameters.prototype.sideNossing = 0;

        /**
         * Creates a new TreadParameters instance using the specified properties.
         * @function create
         * @memberof Types.TreadParameters
         * @static
         * @param {Types.ITreadParameters=} [properties] Properties to set
         * @returns {Types.TreadParameters} TreadParameters instance
         */
        TreadParameters.create = function create(properties) {
            return new TreadParameters(properties);
        };

        /**
         * Encodes the specified TreadParameters message. Does not implicitly {@link Types.TreadParameters.verify|verify} messages.
         * @function encode
         * @memberof Types.TreadParameters
         * @static
         * @param {Types.ITreadParameters} message TreadParameters message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TreadParameters.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.depth != null && Object.hasOwnProperty.call(message, "depth"))
                writer.uint32(/* id 1, wireType 5 =*/13).float(message.depth);
            if (message.material != null && Object.hasOwnProperty.call(message, "material"))
                $root.Types.Material.encode(message.material, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.doubleFaceMaterial != null && Object.hasOwnProperty.call(message, "doubleFaceMaterial"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.doubleFaceMaterial);
            if (message.nossingType != null && Object.hasOwnProperty.call(message, "nossingType"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.nossingType);
            if (message.nossing != null && Object.hasOwnProperty.call(message, "nossing"))
                writer.uint32(/* id 5, wireType 5 =*/45).float(message.nossing);
            if (message.sideNossing != null && Object.hasOwnProperty.call(message, "sideNossing"))
                writer.uint32(/* id 6, wireType 5 =*/53).float(message.sideNossing);
            return writer;
        };

        /**
         * Encodes the specified TreadParameters message, length delimited. Does not implicitly {@link Types.TreadParameters.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Types.TreadParameters
         * @static
         * @param {Types.ITreadParameters} message TreadParameters message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TreadParameters.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TreadParameters message from the specified reader or buffer.
         * @function decode
         * @memberof Types.TreadParameters
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Types.TreadParameters} TreadParameters
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TreadParameters.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Types.TreadParameters();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.depth = reader.float();
                    break;
                case 2:
                    message.material = $root.Types.Material.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.doubleFaceMaterial = reader.bool();
                    break;
                case 4:
                    message.nossingType = reader.int32();
                    break;
                case 5:
                    message.nossing = reader.float();
                    break;
                case 6:
                    message.sideNossing = reader.float();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TreadParameters message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Types.TreadParameters
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Types.TreadParameters} TreadParameters
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TreadParameters.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TreadParameters message.
         * @function verify
         * @memberof Types.TreadParameters
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TreadParameters.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.depth != null && message.hasOwnProperty("depth"))
                if (typeof message.depth !== "number")
                    return "depth: number expected";
            if (message.material != null && message.hasOwnProperty("material")) {
                let error = $root.Types.Material.verify(message.material);
                if (error)
                    return "material." + error;
            }
            if (message.doubleFaceMaterial != null && message.hasOwnProperty("doubleFaceMaterial"))
                if (typeof message.doubleFaceMaterial !== "boolean")
                    return "doubleFaceMaterial: boolean expected";
            if (message.nossingType != null && message.hasOwnProperty("nossingType"))
                switch (message.nossingType) {
                default:
                    return "nossingType: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                }
            if (message.nossing != null && message.hasOwnProperty("nossing"))
                if (typeof message.nossing !== "number")
                    return "nossing: number expected";
            if (message.sideNossing != null && message.hasOwnProperty("sideNossing"))
                if (typeof message.sideNossing !== "number")
                    return "sideNossing: number expected";
            return null;
        };

        /**
         * Creates a TreadParameters message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Types.TreadParameters
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Types.TreadParameters} TreadParameters
         */
        TreadParameters.fromObject = function fromObject(object) {
            if (object instanceof $root.Types.TreadParameters)
                return object;
            let message = new $root.Types.TreadParameters();
            if (object.depth != null)
                message.depth = Number(object.depth);
            if (object.material != null) {
                if (typeof object.material !== "object")
                    throw TypeError(".Types.TreadParameters.material: object expected");
                message.material = $root.Types.Material.fromObject(object.material);
            }
            if (object.doubleFaceMaterial != null)
                message.doubleFaceMaterial = Boolean(object.doubleFaceMaterial);
            switch (object.nossingType) {
            case "nph":
            case 0:
                message.nossingType = 0;
                break;
            case "nno":
            case 1:
                message.nossingType = 1;
                break;
            case "ncommon":
            case 2:
                message.nossingType = 2;
                break;
            case "nluxury":
            case 3:
                message.nossingType = 3;
                break;
            }
            if (object.nossing != null)
                message.nossing = Number(object.nossing);
            if (object.sideNossing != null)
                message.sideNossing = Number(object.sideNossing);
            return message;
        };

        /**
         * Creates a plain object from a TreadParameters message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Types.TreadParameters
         * @static
         * @param {Types.TreadParameters} message TreadParameters
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TreadParameters.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.depth = 0;
                object.material = null;
                object.doubleFaceMaterial = false;
                object.nossingType = options.enums === String ? "nph" : 0;
                object.nossing = 0;
                object.sideNossing = 0;
            }
            if (message.depth != null && message.hasOwnProperty("depth"))
                object.depth = options.json && !isFinite(message.depth) ? String(message.depth) : message.depth;
            if (message.material != null && message.hasOwnProperty("material"))
                object.material = $root.Types.Material.toObject(message.material, options);
            if (message.doubleFaceMaterial != null && message.hasOwnProperty("doubleFaceMaterial"))
                object.doubleFaceMaterial = message.doubleFaceMaterial;
            if (message.nossingType != null && message.hasOwnProperty("nossingType"))
                object.nossingType = options.enums === String ? $root.Types.NossingType[message.nossingType] : message.nossingType;
            if (message.nossing != null && message.hasOwnProperty("nossing"))
                object.nossing = options.json && !isFinite(message.nossing) ? String(message.nossing) : message.nossing;
            if (message.sideNossing != null && message.hasOwnProperty("sideNossing"))
                object.sideNossing = options.json && !isFinite(message.sideNossing) ? String(message.sideNossing) : message.sideNossing;
            return object;
        };

        /**
         * Converts this TreadParameters to JSON.
         * @function toJSON
         * @memberof Types.TreadParameters
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TreadParameters.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TreadParameters;
    })();

    Types.Landing = (function() {

        /**
         * Properties of a Landing.
         * @memberof Types
         * @interface ILanding
         * @property {string|null} [uuid] Landing uuid
         * @property {Types.LandingCutType|null} [type] Landing type
         * @property {Array.<Types.ITread>|null} [treads] Landing treads
         * @property {Array.<Types.IRiser>|null} [risers] Landing risers
         * @property {Types.IBigColumn|null} [oppoBigCol] Landing oppoBigCol
         * @property {Types.IBigColumn|null} [corBigCol] Landing corBigCol
         */

        /**
         * Constructs a new Landing.
         * @memberof Types
         * @classdesc Represents a Landing.
         * @implements ILanding
         * @constructor
         * @param {Types.ILanding=} [properties] Properties to set
         */
        function Landing(properties) {
            this.treads = [];
            this.risers = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Landing uuid.
         * @member {string} uuid
         * @memberof Types.Landing
         * @instance
         */
        Landing.prototype.uuid = "";

        /**
         * Landing type.
         * @member {Types.LandingCutType} type
         * @memberof Types.Landing
         * @instance
         */
        Landing.prototype.type = 0;

        /**
         * Landing treads.
         * @member {Array.<Types.ITread>} treads
         * @memberof Types.Landing
         * @instance
         */
        Landing.prototype.treads = $util.emptyArray;

        /**
         * Landing risers.
         * @member {Array.<Types.IRiser>} risers
         * @memberof Types.Landing
         * @instance
         */
        Landing.prototype.risers = $util.emptyArray;

        /**
         * Landing oppoBigCol.
         * @member {Types.IBigColumn|null|undefined} oppoBigCol
         * @memberof Types.Landing
         * @instance
         */
        Landing.prototype.oppoBigCol = null;

        /**
         * Landing corBigCol.
         * @member {Types.IBigColumn|null|undefined} corBigCol
         * @memberof Types.Landing
         * @instance
         */
        Landing.prototype.corBigCol = null;

        /**
         * Creates a new Landing instance using the specified properties.
         * @function create
         * @memberof Types.Landing
         * @static
         * @param {Types.ILanding=} [properties] Properties to set
         * @returns {Types.Landing} Landing instance
         */
        Landing.create = function create(properties) {
            return new Landing(properties);
        };

        /**
         * Encodes the specified Landing message. Does not implicitly {@link Types.Landing.verify|verify} messages.
         * @function encode
         * @memberof Types.Landing
         * @static
         * @param {Types.ILanding} message Landing message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Landing.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.uuid != null && Object.hasOwnProperty.call(message, "uuid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.uuid);
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.type);
            if (message.treads != null && message.treads.length)
                for (let i = 0; i < message.treads.length; ++i)
                    $root.Types.Tread.encode(message.treads[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.risers != null && message.risers.length)
                for (let i = 0; i < message.risers.length; ++i)
                    $root.Types.Riser.encode(message.risers[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.oppoBigCol != null && Object.hasOwnProperty.call(message, "oppoBigCol"))
                $root.Types.BigColumn.encode(message.oppoBigCol, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.corBigCol != null && Object.hasOwnProperty.call(message, "corBigCol"))
                $root.Types.BigColumn.encode(message.corBigCol, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Landing message, length delimited. Does not implicitly {@link Types.Landing.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Types.Landing
         * @static
         * @param {Types.ILanding} message Landing message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Landing.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Landing message from the specified reader or buffer.
         * @function decode
         * @memberof Types.Landing
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Types.Landing} Landing
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Landing.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Types.Landing();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.uuid = reader.string();
                    break;
                case 2:
                    message.type = reader.int32();
                    break;
                case 3:
                    if (!(message.treads && message.treads.length))
                        message.treads = [];
                    message.treads.push($root.Types.Tread.decode(reader, reader.uint32()));
                    break;
                case 4:
                    if (!(message.risers && message.risers.length))
                        message.risers = [];
                    message.risers.push($root.Types.Riser.decode(reader, reader.uint32()));
                    break;
                case 5:
                    message.oppoBigCol = $root.Types.BigColumn.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.corBigCol = $root.Types.BigColumn.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Landing message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Types.Landing
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Types.Landing} Landing
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Landing.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Landing message.
         * @function verify
         * @memberof Types.Landing
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Landing.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.uuid != null && message.hasOwnProperty("uuid"))
                if (!$util.isString(message.uuid))
                    return "uuid: string expected";
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                }
            if (message.treads != null && message.hasOwnProperty("treads")) {
                if (!Array.isArray(message.treads))
                    return "treads: array expected";
                for (let i = 0; i < message.treads.length; ++i) {
                    let error = $root.Types.Tread.verify(message.treads[i]);
                    if (error)
                        return "treads." + error;
                }
            }
            if (message.risers != null && message.hasOwnProperty("risers")) {
                if (!Array.isArray(message.risers))
                    return "risers: array expected";
                for (let i = 0; i < message.risers.length; ++i) {
                    let error = $root.Types.Riser.verify(message.risers[i]);
                    if (error)
                        return "risers." + error;
                }
            }
            if (message.oppoBigCol != null && message.hasOwnProperty("oppoBigCol")) {
                let error = $root.Types.BigColumn.verify(message.oppoBigCol);
                if (error)
                    return "oppoBigCol." + error;
            }
            if (message.corBigCol != null && message.hasOwnProperty("corBigCol")) {
                let error = $root.Types.BigColumn.verify(message.corBigCol);
                if (error)
                    return "corBigCol." + error;
            }
            return null;
        };

        /**
         * Creates a Landing message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Types.Landing
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Types.Landing} Landing
         */
        Landing.fromObject = function fromObject(object) {
            if (object instanceof $root.Types.Landing)
                return object;
            let message = new $root.Types.Landing();
            if (object.uuid != null)
                message.uuid = String(object.uuid);
            switch (object.type) {
            case "lct_ph":
            case 0:
                message.type = 0;
                break;
            case "lct_first":
            case 1:
                message.type = 1;
                break;
            case "lct_second":
            case 2:
                message.type = 2;
                break;
            case "lct_third":
            case 3:
                message.type = 3;
                break;
            case "lct_fourth":
            case 4:
                message.type = 4;
                break;
            case "lct_fifth":
            case 5:
                message.type = 5;
                break;
            }
            if (object.treads) {
                if (!Array.isArray(object.treads))
                    throw TypeError(".Types.Landing.treads: array expected");
                message.treads = [];
                for (let i = 0; i < object.treads.length; ++i) {
                    if (typeof object.treads[i] !== "object")
                        throw TypeError(".Types.Landing.treads: object expected");
                    message.treads[i] = $root.Types.Tread.fromObject(object.treads[i]);
                }
            }
            if (object.risers) {
                if (!Array.isArray(object.risers))
                    throw TypeError(".Types.Landing.risers: array expected");
                message.risers = [];
                for (let i = 0; i < object.risers.length; ++i) {
                    if (typeof object.risers[i] !== "object")
                        throw TypeError(".Types.Landing.risers: object expected");
                    message.risers[i] = $root.Types.Riser.fromObject(object.risers[i]);
                }
            }
            if (object.oppoBigCol != null) {
                if (typeof object.oppoBigCol !== "object")
                    throw TypeError(".Types.Landing.oppoBigCol: object expected");
                message.oppoBigCol = $root.Types.BigColumn.fromObject(object.oppoBigCol);
            }
            if (object.corBigCol != null) {
                if (typeof object.corBigCol !== "object")
                    throw TypeError(".Types.Landing.corBigCol: object expected");
                message.corBigCol = $root.Types.BigColumn.fromObject(object.corBigCol);
            }
            return message;
        };

        /**
         * Creates a plain object from a Landing message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Types.Landing
         * @static
         * @param {Types.Landing} message Landing
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Landing.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.treads = [];
                object.risers = [];
            }
            if (options.defaults) {
                object.uuid = "";
                object.type = options.enums === String ? "lct_ph" : 0;
                object.oppoBigCol = null;
                object.corBigCol = null;
            }
            if (message.uuid != null && message.hasOwnProperty("uuid"))
                object.uuid = message.uuid;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.Types.LandingCutType[message.type] : message.type;
            if (message.treads && message.treads.length) {
                object.treads = [];
                for (let j = 0; j < message.treads.length; ++j)
                    object.treads[j] = $root.Types.Tread.toObject(message.treads[j], options);
            }
            if (message.risers && message.risers.length) {
                object.risers = [];
                for (let j = 0; j < message.risers.length; ++j)
                    object.risers[j] = $root.Types.Riser.toObject(message.risers[j], options);
            }
            if (message.oppoBigCol != null && message.hasOwnProperty("oppoBigCol"))
                object.oppoBigCol = $root.Types.BigColumn.toObject(message.oppoBigCol, options);
            if (message.corBigCol != null && message.hasOwnProperty("corBigCol"))
                object.corBigCol = $root.Types.BigColumn.toObject(message.corBigCol, options);
            return object;
        };

        /**
         * Converts this Landing to JSON.
         * @function toJSON
         * @memberof Types.Landing
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Landing.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Landing;
    })();

    Types.Riser = (function() {

        /**
         * Properties of a Riser.
         * @memberof Types
         * @interface IRiser
         * @property {string|null} [uuid] Riser uuid
         */

        /**
         * Constructs a new Riser.
         * @memberof Types
         * @classdesc Represents a Riser.
         * @implements IRiser
         * @constructor
         * @param {Types.IRiser=} [properties] Properties to set
         */
        function Riser(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Riser uuid.
         * @member {string} uuid
         * @memberof Types.Riser
         * @instance
         */
        Riser.prototype.uuid = "";

        /**
         * Creates a new Riser instance using the specified properties.
         * @function create
         * @memberof Types.Riser
         * @static
         * @param {Types.IRiser=} [properties] Properties to set
         * @returns {Types.Riser} Riser instance
         */
        Riser.create = function create(properties) {
            return new Riser(properties);
        };

        /**
         * Encodes the specified Riser message. Does not implicitly {@link Types.Riser.verify|verify} messages.
         * @function encode
         * @memberof Types.Riser
         * @static
         * @param {Types.IRiser} message Riser message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Riser.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.uuid != null && Object.hasOwnProperty.call(message, "uuid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.uuid);
            return writer;
        };

        /**
         * Encodes the specified Riser message, length delimited. Does not implicitly {@link Types.Riser.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Types.Riser
         * @static
         * @param {Types.IRiser} message Riser message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Riser.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Riser message from the specified reader or buffer.
         * @function decode
         * @memberof Types.Riser
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Types.Riser} Riser
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Riser.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Types.Riser();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.uuid = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Riser message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Types.Riser
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Types.Riser} Riser
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Riser.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Riser message.
         * @function verify
         * @memberof Types.Riser
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Riser.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.uuid != null && message.hasOwnProperty("uuid"))
                if (!$util.isString(message.uuid))
                    return "uuid: string expected";
            return null;
        };

        /**
         * Creates a Riser message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Types.Riser
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Types.Riser} Riser
         */
        Riser.fromObject = function fromObject(object) {
            if (object instanceof $root.Types.Riser)
                return object;
            let message = new $root.Types.Riser();
            if (object.uuid != null)
                message.uuid = String(object.uuid);
            return message;
        };

        /**
         * Creates a plain object from a Riser message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Types.Riser
         * @static
         * @param {Types.Riser} message Riser
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Riser.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.uuid = "";
            if (message.uuid != null && message.hasOwnProperty("uuid"))
                object.uuid = message.uuid;
            return object;
        };

        /**
         * Converts this Riser to JSON.
         * @function toJSON
         * @memberof Types.Riser
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Riser.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Riser;
    })();

    Types.RiserParameters = (function() {

        /**
         * Properties of a RiserParameters.
         * @memberof Types
         * @interface IRiserParameters
         * @property {boolean|null} [riserExist] RiserParameters riserExist
         * @property {number|null} [depth] RiserParameters depth
         * @property {boolean|null} [doubleFaceMaterial] RiserParameters doubleFaceMaterial
         * @property {Types.IMaterial|null} [material] RiserParameters material
         */

        /**
         * Constructs a new RiserParameters.
         * @memberof Types
         * @classdesc Represents a RiserParameters.
         * @implements IRiserParameters
         * @constructor
         * @param {Types.IRiserParameters=} [properties] Properties to set
         */
        function RiserParameters(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RiserParameters riserExist.
         * @member {boolean} riserExist
         * @memberof Types.RiserParameters
         * @instance
         */
        RiserParameters.prototype.riserExist = false;

        /**
         * RiserParameters depth.
         * @member {number} depth
         * @memberof Types.RiserParameters
         * @instance
         */
        RiserParameters.prototype.depth = 0;

        /**
         * RiserParameters doubleFaceMaterial.
         * @member {boolean} doubleFaceMaterial
         * @memberof Types.RiserParameters
         * @instance
         */
        RiserParameters.prototype.doubleFaceMaterial = false;

        /**
         * RiserParameters material.
         * @member {Types.IMaterial|null|undefined} material
         * @memberof Types.RiserParameters
         * @instance
         */
        RiserParameters.prototype.material = null;

        /**
         * Creates a new RiserParameters instance using the specified properties.
         * @function create
         * @memberof Types.RiserParameters
         * @static
         * @param {Types.IRiserParameters=} [properties] Properties to set
         * @returns {Types.RiserParameters} RiserParameters instance
         */
        RiserParameters.create = function create(properties) {
            return new RiserParameters(properties);
        };

        /**
         * Encodes the specified RiserParameters message. Does not implicitly {@link Types.RiserParameters.verify|verify} messages.
         * @function encode
         * @memberof Types.RiserParameters
         * @static
         * @param {Types.IRiserParameters} message RiserParameters message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RiserParameters.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.riserExist != null && Object.hasOwnProperty.call(message, "riserExist"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.riserExist);
            if (message.depth != null && Object.hasOwnProperty.call(message, "depth"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.depth);
            if (message.doubleFaceMaterial != null && Object.hasOwnProperty.call(message, "doubleFaceMaterial"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.doubleFaceMaterial);
            if (message.material != null && Object.hasOwnProperty.call(message, "material"))
                $root.Types.Material.encode(message.material, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified RiserParameters message, length delimited. Does not implicitly {@link Types.RiserParameters.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Types.RiserParameters
         * @static
         * @param {Types.IRiserParameters} message RiserParameters message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RiserParameters.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RiserParameters message from the specified reader or buffer.
         * @function decode
         * @memberof Types.RiserParameters
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Types.RiserParameters} RiserParameters
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RiserParameters.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Types.RiserParameters();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.riserExist = reader.bool();
                    break;
                case 2:
                    message.depth = reader.float();
                    break;
                case 3:
                    message.doubleFaceMaterial = reader.bool();
                    break;
                case 4:
                    message.material = $root.Types.Material.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RiserParameters message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Types.RiserParameters
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Types.RiserParameters} RiserParameters
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RiserParameters.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RiserParameters message.
         * @function verify
         * @memberof Types.RiserParameters
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RiserParameters.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.riserExist != null && message.hasOwnProperty("riserExist"))
                if (typeof message.riserExist !== "boolean")
                    return "riserExist: boolean expected";
            if (message.depth != null && message.hasOwnProperty("depth"))
                if (typeof message.depth !== "number")
                    return "depth: number expected";
            if (message.doubleFaceMaterial != null && message.hasOwnProperty("doubleFaceMaterial"))
                if (typeof message.doubleFaceMaterial !== "boolean")
                    return "doubleFaceMaterial: boolean expected";
            if (message.material != null && message.hasOwnProperty("material")) {
                let error = $root.Types.Material.verify(message.material);
                if (error)
                    return "material." + error;
            }
            return null;
        };

        /**
         * Creates a RiserParameters message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Types.RiserParameters
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Types.RiserParameters} RiserParameters
         */
        RiserParameters.fromObject = function fromObject(object) {
            if (object instanceof $root.Types.RiserParameters)
                return object;
            let message = new $root.Types.RiserParameters();
            if (object.riserExist != null)
                message.riserExist = Boolean(object.riserExist);
            if (object.depth != null)
                message.depth = Number(object.depth);
            if (object.doubleFaceMaterial != null)
                message.doubleFaceMaterial = Boolean(object.doubleFaceMaterial);
            if (object.material != null) {
                if (typeof object.material !== "object")
                    throw TypeError(".Types.RiserParameters.material: object expected");
                message.material = $root.Types.Material.fromObject(object.material);
            }
            return message;
        };

        /**
         * Creates a plain object from a RiserParameters message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Types.RiserParameters
         * @static
         * @param {Types.RiserParameters} message RiserParameters
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RiserParameters.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.riserExist = false;
                object.depth = 0;
                object.doubleFaceMaterial = false;
                object.material = null;
            }
            if (message.riserExist != null && message.hasOwnProperty("riserExist"))
                object.riserExist = message.riserExist;
            if (message.depth != null && message.hasOwnProperty("depth"))
                object.depth = options.json && !isFinite(message.depth) ? String(message.depth) : message.depth;
            if (message.doubleFaceMaterial != null && message.hasOwnProperty("doubleFaceMaterial"))
                object.doubleFaceMaterial = message.doubleFaceMaterial;
            if (message.material != null && message.hasOwnProperty("material"))
                object.material = $root.Types.Material.toObject(message.material, options);
            return object;
        };

        /**
         * Converts this RiserParameters to JSON.
         * @function toJSON
         * @memberof Types.RiserParameters
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RiserParameters.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RiserParameters;
    })();

    Types.ObjData = (function() {

        /**
         * Properties of an ObjData.
         * @memberof Types
         * @interface IObjData
         * @property {string|null} [modelPath] ObjData modelPath
         * @property {string|null} [imgPath] ObjData imgPath
         * @property {string|null} [maxPath] ObjData maxPath
         */

        /**
         * Constructs a new ObjData.
         * @memberof Types
         * @classdesc Represents an ObjData.
         * @implements IObjData
         * @constructor
         * @param {Types.IObjData=} [properties] Properties to set
         */
        function ObjData(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ObjData modelPath.
         * @member {string} modelPath
         * @memberof Types.ObjData
         * @instance
         */
        ObjData.prototype.modelPath = "";

        /**
         * ObjData imgPath.
         * @member {string} imgPath
         * @memberof Types.ObjData
         * @instance
         */
        ObjData.prototype.imgPath = "";

        /**
         * ObjData maxPath.
         * @member {string} maxPath
         * @memberof Types.ObjData
         * @instance
         */
        ObjData.prototype.maxPath = "";

        /**
         * Creates a new ObjData instance using the specified properties.
         * @function create
         * @memberof Types.ObjData
         * @static
         * @param {Types.IObjData=} [properties] Properties to set
         * @returns {Types.ObjData} ObjData instance
         */
        ObjData.create = function create(properties) {
            return new ObjData(properties);
        };

        /**
         * Encodes the specified ObjData message. Does not implicitly {@link Types.ObjData.verify|verify} messages.
         * @function encode
         * @memberof Types.ObjData
         * @static
         * @param {Types.IObjData} message ObjData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ObjData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.modelPath != null && Object.hasOwnProperty.call(message, "modelPath"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.modelPath);
            if (message.imgPath != null && Object.hasOwnProperty.call(message, "imgPath"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.imgPath);
            if (message.maxPath != null && Object.hasOwnProperty.call(message, "maxPath"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.maxPath);
            return writer;
        };

        /**
         * Encodes the specified ObjData message, length delimited. Does not implicitly {@link Types.ObjData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Types.ObjData
         * @static
         * @param {Types.IObjData} message ObjData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ObjData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ObjData message from the specified reader or buffer.
         * @function decode
         * @memberof Types.ObjData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Types.ObjData} ObjData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ObjData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Types.ObjData();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.modelPath = reader.string();
                    break;
                case 2:
                    message.imgPath = reader.string();
                    break;
                case 3:
                    message.maxPath = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an ObjData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Types.ObjData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Types.ObjData} ObjData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ObjData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ObjData message.
         * @function verify
         * @memberof Types.ObjData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ObjData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.modelPath != null && message.hasOwnProperty("modelPath"))
                if (!$util.isString(message.modelPath))
                    return "modelPath: string expected";
            if (message.imgPath != null && message.hasOwnProperty("imgPath"))
                if (!$util.isString(message.imgPath))
                    return "imgPath: string expected";
            if (message.maxPath != null && message.hasOwnProperty("maxPath"))
                if (!$util.isString(message.maxPath))
                    return "maxPath: string expected";
            return null;
        };

        /**
         * Creates an ObjData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Types.ObjData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Types.ObjData} ObjData
         */
        ObjData.fromObject = function fromObject(object) {
            if (object instanceof $root.Types.ObjData)
                return object;
            let message = new $root.Types.ObjData();
            if (object.modelPath != null)
                message.modelPath = String(object.modelPath);
            if (object.imgPath != null)
                message.imgPath = String(object.imgPath);
            if (object.maxPath != null)
                message.maxPath = String(object.maxPath);
            return message;
        };

        /**
         * Creates a plain object from an ObjData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Types.ObjData
         * @static
         * @param {Types.ObjData} message ObjData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ObjData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.modelPath = "";
                object.imgPath = "";
                object.maxPath = "";
            }
            if (message.modelPath != null && message.hasOwnProperty("modelPath"))
                object.modelPath = message.modelPath;
            if (message.imgPath != null && message.hasOwnProperty("imgPath"))
                object.imgPath = message.imgPath;
            if (message.maxPath != null && message.hasOwnProperty("maxPath"))
                object.maxPath = message.maxPath;
            return object;
        };

        /**
         * Converts this ObjData to JSON.
         * @function toJSON
         * @memberof Types.ObjData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ObjData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ObjData;
    })();

    Types.SmallColumn = (function() {

        /**
         * Properties of a SmallColumn.
         * @memberof Types
         * @interface ISmallColumn
         * @property {string|null} [uuid] SmallColumn uuid
         * @property {Types.IVector3|null} [size] SmallColumn size
         * @property {Types.IVector3|null} [position] SmallColumn position
         * @property {Types.IVector3|null} [rotation] SmallColumn rotation
         */

        /**
         * Constructs a new SmallColumn.
         * @memberof Types
         * @classdesc Represents a SmallColumn.
         * @implements ISmallColumn
         * @constructor
         * @param {Types.ISmallColumn=} [properties] Properties to set
         */
        function SmallColumn(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SmallColumn uuid.
         * @member {string} uuid
         * @memberof Types.SmallColumn
         * @instance
         */
        SmallColumn.prototype.uuid = "";

        /**
         * SmallColumn size.
         * @member {Types.IVector3|null|undefined} size
         * @memberof Types.SmallColumn
         * @instance
         */
        SmallColumn.prototype.size = null;

        /**
         * SmallColumn position.
         * @member {Types.IVector3|null|undefined} position
         * @memberof Types.SmallColumn
         * @instance
         */
        SmallColumn.prototype.position = null;

        /**
         * SmallColumn rotation.
         * @member {Types.IVector3|null|undefined} rotation
         * @memberof Types.SmallColumn
         * @instance
         */
        SmallColumn.prototype.rotation = null;

        /**
         * Creates a new SmallColumn instance using the specified properties.
         * @function create
         * @memberof Types.SmallColumn
         * @static
         * @param {Types.ISmallColumn=} [properties] Properties to set
         * @returns {Types.SmallColumn} SmallColumn instance
         */
        SmallColumn.create = function create(properties) {
            return new SmallColumn(properties);
        };

        /**
         * Encodes the specified SmallColumn message. Does not implicitly {@link Types.SmallColumn.verify|verify} messages.
         * @function encode
         * @memberof Types.SmallColumn
         * @static
         * @param {Types.ISmallColumn} message SmallColumn message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SmallColumn.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.uuid != null && Object.hasOwnProperty.call(message, "uuid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.uuid);
            if (message.size != null && Object.hasOwnProperty.call(message, "size"))
                $root.Types.Vector3.encode(message.size, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.position != null && Object.hasOwnProperty.call(message, "position"))
                $root.Types.Vector3.encode(message.position, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.rotation != null && Object.hasOwnProperty.call(message, "rotation"))
                $root.Types.Vector3.encode(message.rotation, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified SmallColumn message, length delimited. Does not implicitly {@link Types.SmallColumn.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Types.SmallColumn
         * @static
         * @param {Types.ISmallColumn} message SmallColumn message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SmallColumn.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SmallColumn message from the specified reader or buffer.
         * @function decode
         * @memberof Types.SmallColumn
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Types.SmallColumn} SmallColumn
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SmallColumn.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Types.SmallColumn();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.uuid = reader.string();
                    break;
                case 2:
                    message.size = $root.Types.Vector3.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.position = $root.Types.Vector3.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.rotation = $root.Types.Vector3.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SmallColumn message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Types.SmallColumn
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Types.SmallColumn} SmallColumn
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SmallColumn.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SmallColumn message.
         * @function verify
         * @memberof Types.SmallColumn
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SmallColumn.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.uuid != null && message.hasOwnProperty("uuid"))
                if (!$util.isString(message.uuid))
                    return "uuid: string expected";
            if (message.size != null && message.hasOwnProperty("size")) {
                let error = $root.Types.Vector3.verify(message.size);
                if (error)
                    return "size." + error;
            }
            if (message.position != null && message.hasOwnProperty("position")) {
                let error = $root.Types.Vector3.verify(message.position);
                if (error)
                    return "position." + error;
            }
            if (message.rotation != null && message.hasOwnProperty("rotation")) {
                let error = $root.Types.Vector3.verify(message.rotation);
                if (error)
                    return "rotation." + error;
            }
            return null;
        };

        /**
         * Creates a SmallColumn message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Types.SmallColumn
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Types.SmallColumn} SmallColumn
         */
        SmallColumn.fromObject = function fromObject(object) {
            if (object instanceof $root.Types.SmallColumn)
                return object;
            let message = new $root.Types.SmallColumn();
            if (object.uuid != null)
                message.uuid = String(object.uuid);
            if (object.size != null) {
                if (typeof object.size !== "object")
                    throw TypeError(".Types.SmallColumn.size: object expected");
                message.size = $root.Types.Vector3.fromObject(object.size);
            }
            if (object.position != null) {
                if (typeof object.position !== "object")
                    throw TypeError(".Types.SmallColumn.position: object expected");
                message.position = $root.Types.Vector3.fromObject(object.position);
            }
            if (object.rotation != null) {
                if (typeof object.rotation !== "object")
                    throw TypeError(".Types.SmallColumn.rotation: object expected");
                message.rotation = $root.Types.Vector3.fromObject(object.rotation);
            }
            return message;
        };

        /**
         * Creates a plain object from a SmallColumn message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Types.SmallColumn
         * @static
         * @param {Types.SmallColumn} message SmallColumn
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SmallColumn.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.uuid = "";
                object.size = null;
                object.position = null;
                object.rotation = null;
            }
            if (message.uuid != null && message.hasOwnProperty("uuid"))
                object.uuid = message.uuid;
            if (message.size != null && message.hasOwnProperty("size"))
                object.size = $root.Types.Vector3.toObject(message.size, options);
            if (message.position != null && message.hasOwnProperty("position"))
                object.position = $root.Types.Vector3.toObject(message.position, options);
            if (message.rotation != null && message.hasOwnProperty("rotation"))
                object.rotation = $root.Types.Vector3.toObject(message.rotation, options);
            return object;
        };

        /**
         * Converts this SmallColumn to JSON.
         * @function toJSON
         * @memberof Types.SmallColumn
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SmallColumn.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SmallColumn;
    })();

    Types.SmallColParameters = (function() {

        /**
         * Properties of a SmallColParameters.
         * @memberof Types
         * @interface ISmallColParameters
         * @property {Types.IObjData|null} [source] SmallColParameters source
         * @property {Types.ArrangeRule|null} [arrangeRule] SmallColParameters arrangeRule
         * @property {Types.IMaterial|null} [material] SmallColParameters material
         * @property {string|null} [specification] SmallColParameters specification
         */

        /**
         * Constructs a new SmallColParameters.
         * @memberof Types
         * @classdesc Represents a SmallColParameters.
         * @implements ISmallColParameters
         * @constructor
         * @param {Types.ISmallColParameters=} [properties] Properties to set
         */
        function SmallColParameters(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SmallColParameters source.
         * @member {Types.IObjData|null|undefined} source
         * @memberof Types.SmallColParameters
         * @instance
         */
        SmallColParameters.prototype.source = null;

        /**
         * SmallColParameters arrangeRule.
         * @member {Types.ArrangeRule} arrangeRule
         * @memberof Types.SmallColParameters
         * @instance
         */
        SmallColParameters.prototype.arrangeRule = 0;

        /**
         * SmallColParameters material.
         * @member {Types.IMaterial|null|undefined} material
         * @memberof Types.SmallColParameters
         * @instance
         */
        SmallColParameters.prototype.material = null;

        /**
         * SmallColParameters specification.
         * @member {string} specification
         * @memberof Types.SmallColParameters
         * @instance
         */
        SmallColParameters.prototype.specification = "";

        /**
         * Creates a new SmallColParameters instance using the specified properties.
         * @function create
         * @memberof Types.SmallColParameters
         * @static
         * @param {Types.ISmallColParameters=} [properties] Properties to set
         * @returns {Types.SmallColParameters} SmallColParameters instance
         */
        SmallColParameters.create = function create(properties) {
            return new SmallColParameters(properties);
        };

        /**
         * Encodes the specified SmallColParameters message. Does not implicitly {@link Types.SmallColParameters.verify|verify} messages.
         * @function encode
         * @memberof Types.SmallColParameters
         * @static
         * @param {Types.ISmallColParameters} message SmallColParameters message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SmallColParameters.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.source != null && Object.hasOwnProperty.call(message, "source"))
                $root.Types.ObjData.encode(message.source, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.arrangeRule != null && Object.hasOwnProperty.call(message, "arrangeRule"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.arrangeRule);
            if (message.material != null && Object.hasOwnProperty.call(message, "material"))
                $root.Types.Material.encode(message.material, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.specification != null && Object.hasOwnProperty.call(message, "specification"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.specification);
            return writer;
        };

        /**
         * Encodes the specified SmallColParameters message, length delimited. Does not implicitly {@link Types.SmallColParameters.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Types.SmallColParameters
         * @static
         * @param {Types.ISmallColParameters} message SmallColParameters message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SmallColParameters.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SmallColParameters message from the specified reader or buffer.
         * @function decode
         * @memberof Types.SmallColParameters
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Types.SmallColParameters} SmallColParameters
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SmallColParameters.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Types.SmallColParameters();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.source = $root.Types.ObjData.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.arrangeRule = reader.int32();
                    break;
                case 3:
                    message.material = $root.Types.Material.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.specification = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SmallColParameters message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Types.SmallColParameters
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Types.SmallColParameters} SmallColParameters
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SmallColParameters.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SmallColParameters message.
         * @function verify
         * @memberof Types.SmallColParameters
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SmallColParameters.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.source != null && message.hasOwnProperty("source")) {
                let error = $root.Types.ObjData.verify(message.source);
                if (error)
                    return "source." + error;
            }
            if (message.arrangeRule != null && message.hasOwnProperty("arrangeRule"))
                switch (message.arrangeRule) {
                default:
                    return "arrangeRule: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                }
            if (message.material != null && message.hasOwnProperty("material")) {
                let error = $root.Types.Material.verify(message.material);
                if (error)
                    return "material." + error;
            }
            if (message.specification != null && message.hasOwnProperty("specification"))
                if (!$util.isString(message.specification))
                    return "specification: string expected";
            return null;
        };

        /**
         * Creates a SmallColParameters message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Types.SmallColParameters
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Types.SmallColParameters} SmallColParameters
         */
        SmallColParameters.fromObject = function fromObject(object) {
            if (object instanceof $root.Types.SmallColParameters)
                return object;
            let message = new $root.Types.SmallColParameters();
            if (object.source != null) {
                if (typeof object.source !== "object")
                    throw TypeError(".Types.SmallColParameters.source: object expected");
                message.source = $root.Types.ObjData.fromObject(object.source);
            }
            switch (object.arrangeRule) {
            case "arph":
            case 0:
                message.arrangeRule = 0;
                break;
            case "arrFour":
            case 1:
                message.arrangeRule = 1;
                break;
            case "arrThree":
            case 2:
                message.arrangeRule = 2;
                break;
            case "arrTwo":
            case 3:
                message.arrangeRule = 3;
                break;
            }
            if (object.material != null) {
                if (typeof object.material !== "object")
                    throw TypeError(".Types.SmallColParameters.material: object expected");
                message.material = $root.Types.Material.fromObject(object.material);
            }
            if (object.specification != null)
                message.specification = String(object.specification);
            return message;
        };

        /**
         * Creates a plain object from a SmallColParameters message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Types.SmallColParameters
         * @static
         * @param {Types.SmallColParameters} message SmallColParameters
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SmallColParameters.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.source = null;
                object.arrangeRule = options.enums === String ? "arph" : 0;
                object.material = null;
                object.specification = "";
            }
            if (message.source != null && message.hasOwnProperty("source"))
                object.source = $root.Types.ObjData.toObject(message.source, options);
            if (message.arrangeRule != null && message.hasOwnProperty("arrangeRule"))
                object.arrangeRule = options.enums === String ? $root.Types.ArrangeRule[message.arrangeRule] : message.arrangeRule;
            if (message.material != null && message.hasOwnProperty("material"))
                object.material = $root.Types.Material.toObject(message.material, options);
            if (message.specification != null && message.hasOwnProperty("specification"))
                object.specification = message.specification;
            return object;
        };

        /**
         * Converts this SmallColParameters to JSON.
         * @function toJSON
         * @memberof Types.SmallColParameters
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SmallColParameters.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SmallColParameters;
    })();

    Types.BigColumn = (function() {

        /**
         * Properties of a BigColumn.
         * @memberof Types
         * @interface IBigColumn
         * @property {string|null} [uuid] BigColumn uuid
         * @property {Types.IVector3|null} [position] BigColumn position
         * @property {Types.IVector3|null} [size] BigColumn size
         * @property {Types.IVector3|null} [rotation] BigColumn rotation
         * @property {Types.IBigColParameters|null} [paras] BigColumn paras
         * @property {Types.BigColumnType|null} [type] BigColumn type
         */

        /**
         * Constructs a new BigColumn.
         * @memberof Types
         * @classdesc Represents a BigColumn.
         * @implements IBigColumn
         * @constructor
         * @param {Types.IBigColumn=} [properties] Properties to set
         */
        function BigColumn(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BigColumn uuid.
         * @member {string} uuid
         * @memberof Types.BigColumn
         * @instance
         */
        BigColumn.prototype.uuid = "";

        /**
         * BigColumn position.
         * @member {Types.IVector3|null|undefined} position
         * @memberof Types.BigColumn
         * @instance
         */
        BigColumn.prototype.position = null;

        /**
         * BigColumn size.
         * @member {Types.IVector3|null|undefined} size
         * @memberof Types.BigColumn
         * @instance
         */
        BigColumn.prototype.size = null;

        /**
         * BigColumn rotation.
         * @member {Types.IVector3|null|undefined} rotation
         * @memberof Types.BigColumn
         * @instance
         */
        BigColumn.prototype.rotation = null;

        /**
         * BigColumn paras.
         * @member {Types.IBigColParameters|null|undefined} paras
         * @memberof Types.BigColumn
         * @instance
         */
        BigColumn.prototype.paras = null;

        /**
         * BigColumn type.
         * @member {Types.BigColumnType} type
         * @memberof Types.BigColumn
         * @instance
         */
        BigColumn.prototype.type = 0;

        /**
         * Creates a new BigColumn instance using the specified properties.
         * @function create
         * @memberof Types.BigColumn
         * @static
         * @param {Types.IBigColumn=} [properties] Properties to set
         * @returns {Types.BigColumn} BigColumn instance
         */
        BigColumn.create = function create(properties) {
            return new BigColumn(properties);
        };

        /**
         * Encodes the specified BigColumn message. Does not implicitly {@link Types.BigColumn.verify|verify} messages.
         * @function encode
         * @memberof Types.BigColumn
         * @static
         * @param {Types.IBigColumn} message BigColumn message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BigColumn.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.uuid != null && Object.hasOwnProperty.call(message, "uuid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.uuid);
            if (message.position != null && Object.hasOwnProperty.call(message, "position"))
                $root.Types.Vector3.encode(message.position, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.size != null && Object.hasOwnProperty.call(message, "size"))
                $root.Types.Vector3.encode(message.size, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.rotation != null && Object.hasOwnProperty.call(message, "rotation"))
                $root.Types.Vector3.encode(message.rotation, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.paras != null && Object.hasOwnProperty.call(message, "paras"))
                $root.Types.BigColParameters.encode(message.paras, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.type);
            return writer;
        };

        /**
         * Encodes the specified BigColumn message, length delimited. Does not implicitly {@link Types.BigColumn.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Types.BigColumn
         * @static
         * @param {Types.IBigColumn} message BigColumn message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BigColumn.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BigColumn message from the specified reader or buffer.
         * @function decode
         * @memberof Types.BigColumn
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Types.BigColumn} BigColumn
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BigColumn.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Types.BigColumn();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.uuid = reader.string();
                    break;
                case 2:
                    message.position = $root.Types.Vector3.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.size = $root.Types.Vector3.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.rotation = $root.Types.Vector3.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.paras = $root.Types.BigColParameters.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.type = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BigColumn message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Types.BigColumn
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Types.BigColumn} BigColumn
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BigColumn.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BigColumn message.
         * @function verify
         * @memberof Types.BigColumn
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BigColumn.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.uuid != null && message.hasOwnProperty("uuid"))
                if (!$util.isString(message.uuid))
                    return "uuid: string expected";
            if (message.position != null && message.hasOwnProperty("position")) {
                let error = $root.Types.Vector3.verify(message.position);
                if (error)
                    return "position." + error;
            }
            if (message.size != null && message.hasOwnProperty("size")) {
                let error = $root.Types.Vector3.verify(message.size);
                if (error)
                    return "size." + error;
            }
            if (message.rotation != null && message.hasOwnProperty("rotation")) {
                let error = $root.Types.Vector3.verify(message.rotation);
                if (error)
                    return "rotation." + error;
            }
            if (message.paras != null && message.hasOwnProperty("paras")) {
                let error = $root.Types.BigColParameters.verify(message.paras);
                if (error)
                    return "paras." + error;
            }
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                }
            return null;
        };

        /**
         * Creates a BigColumn message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Types.BigColumn
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Types.BigColumn} BigColumn
         */
        BigColumn.fromObject = function fromObject(object) {
            if (object instanceof $root.Types.BigColumn)
                return object;
            let message = new $root.Types.BigColumn();
            if (object.uuid != null)
                message.uuid = String(object.uuid);
            if (object.position != null) {
                if (typeof object.position !== "object")
                    throw TypeError(".Types.BigColumn.position: object expected");
                message.position = $root.Types.Vector3.fromObject(object.position);
            }
            if (object.size != null) {
                if (typeof object.size !== "object")
                    throw TypeError(".Types.BigColumn.size: object expected");
                message.size = $root.Types.Vector3.fromObject(object.size);
            }
            if (object.rotation != null) {
                if (typeof object.rotation !== "object")
                    throw TypeError(".Types.BigColumn.rotation: object expected");
                message.rotation = $root.Types.Vector3.fromObject(object.rotation);
            }
            if (object.paras != null) {
                if (typeof object.paras !== "object")
                    throw TypeError(".Types.BigColumn.paras: object expected");
                message.paras = $root.Types.BigColParameters.fromObject(object.paras);
            }
            switch (object.type) {
            case "bc_ph":
            case 0:
                message.type = 0;
                break;
            case "bc_common":
            case 1:
                message.type = 1;
                break;
            case "bc_support":
            case 2:
                message.type = 2;
                break;
            case "bc_start":
            case 3:
                message.type = 3;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a BigColumn message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Types.BigColumn
         * @static
         * @param {Types.BigColumn} message BigColumn
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BigColumn.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.uuid = "";
                object.position = null;
                object.size = null;
                object.rotation = null;
                object.paras = null;
                object.type = options.enums === String ? "bc_ph" : 0;
            }
            if (message.uuid != null && message.hasOwnProperty("uuid"))
                object.uuid = message.uuid;
            if (message.position != null && message.hasOwnProperty("position"))
                object.position = $root.Types.Vector3.toObject(message.position, options);
            if (message.size != null && message.hasOwnProperty("size"))
                object.size = $root.Types.Vector3.toObject(message.size, options);
            if (message.rotation != null && message.hasOwnProperty("rotation"))
                object.rotation = $root.Types.Vector3.toObject(message.rotation, options);
            if (message.paras != null && message.hasOwnProperty("paras"))
                object.paras = $root.Types.BigColParameters.toObject(message.paras, options);
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.Types.BigColumnType[message.type] : message.type;
            return object;
        };

        /**
         * Converts this BigColumn to JSON.
         * @function toJSON
         * @memberof Types.BigColumn
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BigColumn.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BigColumn;
    })();

    Types.BigColParameters = (function() {

        /**
         * Properties of a BigColParameters.
         * @memberof Types
         * @interface IBigColParameters
         * @property {Types.IObjData|null} [source] BigColParameters source
         * @property {Types.BigColumnPosType|null} [posType] BigColParameters posType
         * @property {Types.IMaterial|null} [material] BigColParameters material
         * @property {string|null} [specification] BigColParameters specification
         */

        /**
         * Constructs a new BigColParameters.
         * @memberof Types
         * @classdesc Represents a BigColParameters.
         * @implements IBigColParameters
         * @constructor
         * @param {Types.IBigColParameters=} [properties] Properties to set
         */
        function BigColParameters(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BigColParameters source.
         * @member {Types.IObjData|null|undefined} source
         * @memberof Types.BigColParameters
         * @instance
         */
        BigColParameters.prototype.source = null;

        /**
         * BigColParameters posType.
         * @member {Types.BigColumnPosType} posType
         * @memberof Types.BigColParameters
         * @instance
         */
        BigColParameters.prototype.posType = 0;

        /**
         * BigColParameters material.
         * @member {Types.IMaterial|null|undefined} material
         * @memberof Types.BigColParameters
         * @instance
         */
        BigColParameters.prototype.material = null;

        /**
         * BigColParameters specification.
         * @member {string} specification
         * @memberof Types.BigColParameters
         * @instance
         */
        BigColParameters.prototype.specification = "";

        /**
         * Creates a new BigColParameters instance using the specified properties.
         * @function create
         * @memberof Types.BigColParameters
         * @static
         * @param {Types.IBigColParameters=} [properties] Properties to set
         * @returns {Types.BigColParameters} BigColParameters instance
         */
        BigColParameters.create = function create(properties) {
            return new BigColParameters(properties);
        };

        /**
         * Encodes the specified BigColParameters message. Does not implicitly {@link Types.BigColParameters.verify|verify} messages.
         * @function encode
         * @memberof Types.BigColParameters
         * @static
         * @param {Types.IBigColParameters} message BigColParameters message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BigColParameters.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.source != null && Object.hasOwnProperty.call(message, "source"))
                $root.Types.ObjData.encode(message.source, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.posType != null && Object.hasOwnProperty.call(message, "posType"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.posType);
            if (message.material != null && Object.hasOwnProperty.call(message, "material"))
                $root.Types.Material.encode(message.material, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.specification != null && Object.hasOwnProperty.call(message, "specification"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.specification);
            return writer;
        };

        /**
         * Encodes the specified BigColParameters message, length delimited. Does not implicitly {@link Types.BigColParameters.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Types.BigColParameters
         * @static
         * @param {Types.IBigColParameters} message BigColParameters message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BigColParameters.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BigColParameters message from the specified reader or buffer.
         * @function decode
         * @memberof Types.BigColParameters
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Types.BigColParameters} BigColParameters
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BigColParameters.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Types.BigColParameters();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.source = $root.Types.ObjData.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.posType = reader.int32();
                    break;
                case 3:
                    message.material = $root.Types.Material.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.specification = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BigColParameters message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Types.BigColParameters
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Types.BigColParameters} BigColParameters
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BigColParameters.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BigColParameters message.
         * @function verify
         * @memberof Types.BigColParameters
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BigColParameters.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.source != null && message.hasOwnProperty("source")) {
                let error = $root.Types.ObjData.verify(message.source);
                if (error)
                    return "source." + error;
            }
            if (message.posType != null && message.hasOwnProperty("posType"))
                switch (message.posType) {
                default:
                    return "posType: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                }
            if (message.material != null && message.hasOwnProperty("material")) {
                let error = $root.Types.Material.verify(message.material);
                if (error)
                    return "material." + error;
            }
            if (message.specification != null && message.hasOwnProperty("specification"))
                if (!$util.isString(message.specification))
                    return "specification: string expected";
            return null;
        };

        /**
         * Creates a BigColParameters message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Types.BigColParameters
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Types.BigColParameters} BigColParameters
         */
        BigColParameters.fromObject = function fromObject(object) {
            if (object instanceof $root.Types.BigColParameters)
                return object;
            let message = new $root.Types.BigColParameters();
            if (object.source != null) {
                if (typeof object.source !== "object")
                    throw TypeError(".Types.BigColParameters.source: object expected");
                message.source = $root.Types.ObjData.fromObject(object.source);
            }
            switch (object.posType) {
            case "bcp_ph":
            case 0:
                message.posType = 0;
                break;
            case "bcp_floor":
            case 1:
                message.posType = 1;
                break;
            case "bcp_first":
            case 2:
                message.posType = 2;
                break;
            case "bcp_second":
            case 3:
                message.posType = 3;
                break;
            }
            if (object.material != null) {
                if (typeof object.material !== "object")
                    throw TypeError(".Types.BigColParameters.material: object expected");
                message.material = $root.Types.Material.fromObject(object.material);
            }
            if (object.specification != null)
                message.specification = String(object.specification);
            return message;
        };

        /**
         * Creates a plain object from a BigColParameters message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Types.BigColParameters
         * @static
         * @param {Types.BigColParameters} message BigColParameters
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BigColParameters.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.source = null;
                object.posType = options.enums === String ? "bcp_ph" : 0;
                object.material = null;
                object.specification = "";
            }
            if (message.source != null && message.hasOwnProperty("source"))
                object.source = $root.Types.ObjData.toObject(message.source, options);
            if (message.posType != null && message.hasOwnProperty("posType"))
                object.posType = options.enums === String ? $root.Types.BigColumnPosType[message.posType] : message.posType;
            if (message.material != null && message.hasOwnProperty("material"))
                object.material = $root.Types.Material.toObject(message.material, options);
            if (message.specification != null && message.hasOwnProperty("specification"))
                object.specification = message.specification;
            return object;
        };

        /**
         * Converts this BigColParameters to JSON.
         * @function toJSON
         * @memberof Types.BigColParameters
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BigColParameters.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BigColParameters;
    })();

    Types.DxfData = (function() {

        /**
         * Properties of a DxfData.
         * @memberof Types
         * @interface IDxfData
         * @property {string|null} [specification] DxfData specification
         */

        /**
         * Constructs a new DxfData.
         * @memberof Types
         * @classdesc Represents a DxfData.
         * @implements IDxfData
         * @constructor
         * @param {Types.IDxfData=} [properties] Properties to set
         */
        function DxfData(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DxfData specification.
         * @member {string} specification
         * @memberof Types.DxfData
         * @instance
         */
        DxfData.prototype.specification = "";

        /**
         * Creates a new DxfData instance using the specified properties.
         * @function create
         * @memberof Types.DxfData
         * @static
         * @param {Types.IDxfData=} [properties] Properties to set
         * @returns {Types.DxfData} DxfData instance
         */
        DxfData.create = function create(properties) {
            return new DxfData(properties);
        };

        /**
         * Encodes the specified DxfData message. Does not implicitly {@link Types.DxfData.verify|verify} messages.
         * @function encode
         * @memberof Types.DxfData
         * @static
         * @param {Types.IDxfData} message DxfData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DxfData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.specification != null && Object.hasOwnProperty.call(message, "specification"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.specification);
            return writer;
        };

        /**
         * Encodes the specified DxfData message, length delimited. Does not implicitly {@link Types.DxfData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Types.DxfData
         * @static
         * @param {Types.IDxfData} message DxfData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DxfData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DxfData message from the specified reader or buffer.
         * @function decode
         * @memberof Types.DxfData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Types.DxfData} DxfData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DxfData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Types.DxfData();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.specification = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a DxfData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Types.DxfData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Types.DxfData} DxfData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DxfData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DxfData message.
         * @function verify
         * @memberof Types.DxfData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DxfData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.specification != null && message.hasOwnProperty("specification"))
                if (!$util.isString(message.specification))
                    return "specification: string expected";
            return null;
        };

        /**
         * Creates a DxfData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Types.DxfData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Types.DxfData} DxfData
         */
        DxfData.fromObject = function fromObject(object) {
            if (object instanceof $root.Types.DxfData)
                return object;
            let message = new $root.Types.DxfData();
            if (object.specification != null)
                message.specification = String(object.specification);
            return message;
        };

        /**
         * Creates a plain object from a DxfData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Types.DxfData
         * @static
         * @param {Types.DxfData} message DxfData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DxfData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.specification = "";
            if (message.specification != null && message.hasOwnProperty("specification"))
                object.specification = message.specification;
            return object;
        };

        /**
         * Converts this DxfData to JSON.
         * @function toJSON
         * @memberof Types.DxfData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DxfData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return DxfData;
    })();

    Types.Handrail = (function() {

        /**
         * Properties of a Handrail.
         * @memberof Types
         * @interface IHandrail
         * @property {string|null} [uuid] Handrail uuid
         * @property {Types.IOutline|null} [route] Handrail route
         * @property {number|null} [width] Handrail width
         */

        /**
         * Constructs a new Handrail.
         * @memberof Types
         * @classdesc Represents a Handrail.
         * @implements IHandrail
         * @constructor
         * @param {Types.IHandrail=} [properties] Properties to set
         */
        function Handrail(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Handrail uuid.
         * @member {string} uuid
         * @memberof Types.Handrail
         * @instance
         */
        Handrail.prototype.uuid = "";

        /**
         * Handrail route.
         * @member {Types.IOutline|null|undefined} route
         * @memberof Types.Handrail
         * @instance
         */
        Handrail.prototype.route = null;

        /**
         * Handrail width.
         * @member {number} width
         * @memberof Types.Handrail
         * @instance
         */
        Handrail.prototype.width = 0;

        /**
         * Creates a new Handrail instance using the specified properties.
         * @function create
         * @memberof Types.Handrail
         * @static
         * @param {Types.IHandrail=} [properties] Properties to set
         * @returns {Types.Handrail} Handrail instance
         */
        Handrail.create = function create(properties) {
            return new Handrail(properties);
        };

        /**
         * Encodes the specified Handrail message. Does not implicitly {@link Types.Handrail.verify|verify} messages.
         * @function encode
         * @memberof Types.Handrail
         * @static
         * @param {Types.IHandrail} message Handrail message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Handrail.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.uuid != null && Object.hasOwnProperty.call(message, "uuid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.uuid);
            if (message.route != null && Object.hasOwnProperty.call(message, "route"))
                $root.Types.Outline.encode(message.route, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.width != null && Object.hasOwnProperty.call(message, "width"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.width);
            return writer;
        };

        /**
         * Encodes the specified Handrail message, length delimited. Does not implicitly {@link Types.Handrail.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Types.Handrail
         * @static
         * @param {Types.IHandrail} message Handrail message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Handrail.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Handrail message from the specified reader or buffer.
         * @function decode
         * @memberof Types.Handrail
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Types.Handrail} Handrail
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Handrail.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Types.Handrail();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.uuid = reader.string();
                    break;
                case 2:
                    message.route = $root.Types.Outline.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.width = reader.float();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Handrail message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Types.Handrail
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Types.Handrail} Handrail
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Handrail.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Handrail message.
         * @function verify
         * @memberof Types.Handrail
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Handrail.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.uuid != null && message.hasOwnProperty("uuid"))
                if (!$util.isString(message.uuid))
                    return "uuid: string expected";
            if (message.route != null && message.hasOwnProperty("route")) {
                let error = $root.Types.Outline.verify(message.route);
                if (error)
                    return "route." + error;
            }
            if (message.width != null && message.hasOwnProperty("width"))
                if (typeof message.width !== "number")
                    return "width: number expected";
            return null;
        };

        /**
         * Creates a Handrail message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Types.Handrail
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Types.Handrail} Handrail
         */
        Handrail.fromObject = function fromObject(object) {
            if (object instanceof $root.Types.Handrail)
                return object;
            let message = new $root.Types.Handrail();
            if (object.uuid != null)
                message.uuid = String(object.uuid);
            if (object.route != null) {
                if (typeof object.route !== "object")
                    throw TypeError(".Types.Handrail.route: object expected");
                message.route = $root.Types.Outline.fromObject(object.route);
            }
            if (object.width != null)
                message.width = Number(object.width);
            return message;
        };

        /**
         * Creates a plain object from a Handrail message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Types.Handrail
         * @static
         * @param {Types.Handrail} message Handrail
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Handrail.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.uuid = "";
                object.route = null;
                object.width = 0;
            }
            if (message.uuid != null && message.hasOwnProperty("uuid"))
                object.uuid = message.uuid;
            if (message.route != null && message.hasOwnProperty("route"))
                object.route = $root.Types.Outline.toObject(message.route, options);
            if (message.width != null && message.hasOwnProperty("width"))
                object.width = options.json && !isFinite(message.width) ? String(message.width) : message.width;
            return object;
        };

        /**
         * Converts this Handrail to JSON.
         * @function toJSON
         * @memberof Types.Handrail
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Handrail.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Handrail;
    })();

    Types.HandrailParameters = (function() {

        /**
         * Properties of a HandrailParameters.
         * @memberof Types
         * @interface IHandrailParameters
         * @property {number|null} [height] HandrailParameters height
         * @property {Types.IDxfData|null} [source] HandrailParameters source
         * @property {Types.IMaterial|null} [material] HandrailParameters material
         */

        /**
         * Constructs a new HandrailParameters.
         * @memberof Types
         * @classdesc Represents a HandrailParameters.
         * @implements IHandrailParameters
         * @constructor
         * @param {Types.IHandrailParameters=} [properties] Properties to set
         */
        function HandrailParameters(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * HandrailParameters height.
         * @member {number} height
         * @memberof Types.HandrailParameters
         * @instance
         */
        HandrailParameters.prototype.height = 0;

        /**
         * HandrailParameters source.
         * @member {Types.IDxfData|null|undefined} source
         * @memberof Types.HandrailParameters
         * @instance
         */
        HandrailParameters.prototype.source = null;

        /**
         * HandrailParameters material.
         * @member {Types.IMaterial|null|undefined} material
         * @memberof Types.HandrailParameters
         * @instance
         */
        HandrailParameters.prototype.material = null;

        /**
         * Creates a new HandrailParameters instance using the specified properties.
         * @function create
         * @memberof Types.HandrailParameters
         * @static
         * @param {Types.IHandrailParameters=} [properties] Properties to set
         * @returns {Types.HandrailParameters} HandrailParameters instance
         */
        HandrailParameters.create = function create(properties) {
            return new HandrailParameters(properties);
        };

        /**
         * Encodes the specified HandrailParameters message. Does not implicitly {@link Types.HandrailParameters.verify|verify} messages.
         * @function encode
         * @memberof Types.HandrailParameters
         * @static
         * @param {Types.IHandrailParameters} message HandrailParameters message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HandrailParameters.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.height != null && Object.hasOwnProperty.call(message, "height"))
                writer.uint32(/* id 1, wireType 5 =*/13).float(message.height);
            if (message.source != null && Object.hasOwnProperty.call(message, "source"))
                $root.Types.DxfData.encode(message.source, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.material != null && Object.hasOwnProperty.call(message, "material"))
                $root.Types.Material.encode(message.material, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified HandrailParameters message, length delimited. Does not implicitly {@link Types.HandrailParameters.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Types.HandrailParameters
         * @static
         * @param {Types.IHandrailParameters} message HandrailParameters message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HandrailParameters.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a HandrailParameters message from the specified reader or buffer.
         * @function decode
         * @memberof Types.HandrailParameters
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Types.HandrailParameters} HandrailParameters
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HandrailParameters.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Types.HandrailParameters();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.height = reader.float();
                    break;
                case 2:
                    message.source = $root.Types.DxfData.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.material = $root.Types.Material.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a HandrailParameters message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Types.HandrailParameters
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Types.HandrailParameters} HandrailParameters
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HandrailParameters.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a HandrailParameters message.
         * @function verify
         * @memberof Types.HandrailParameters
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        HandrailParameters.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.height != null && message.hasOwnProperty("height"))
                if (typeof message.height !== "number")
                    return "height: number expected";
            if (message.source != null && message.hasOwnProperty("source")) {
                let error = $root.Types.DxfData.verify(message.source);
                if (error)
                    return "source." + error;
            }
            if (message.material != null && message.hasOwnProperty("material")) {
                let error = $root.Types.Material.verify(message.material);
                if (error)
                    return "material." + error;
            }
            return null;
        };

        /**
         * Creates a HandrailParameters message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Types.HandrailParameters
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Types.HandrailParameters} HandrailParameters
         */
        HandrailParameters.fromObject = function fromObject(object) {
            if (object instanceof $root.Types.HandrailParameters)
                return object;
            let message = new $root.Types.HandrailParameters();
            if (object.height != null)
                message.height = Number(object.height);
            if (object.source != null) {
                if (typeof object.source !== "object")
                    throw TypeError(".Types.HandrailParameters.source: object expected");
                message.source = $root.Types.DxfData.fromObject(object.source);
            }
            if (object.material != null) {
                if (typeof object.material !== "object")
                    throw TypeError(".Types.HandrailParameters.material: object expected");
                message.material = $root.Types.Material.fromObject(object.material);
            }
            return message;
        };

        /**
         * Creates a plain object from a HandrailParameters message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Types.HandrailParameters
         * @static
         * @param {Types.HandrailParameters} message HandrailParameters
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        HandrailParameters.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.height = 0;
                object.source = null;
                object.material = null;
            }
            if (message.height != null && message.hasOwnProperty("height"))
                object.height = options.json && !isFinite(message.height) ? String(message.height) : message.height;
            if (message.source != null && message.hasOwnProperty("source"))
                object.source = $root.Types.DxfData.toObject(message.source, options);
            if (message.material != null && message.hasOwnProperty("material"))
                object.material = $root.Types.Material.toObject(message.material, options);
            return object;
        };

        /**
         * Converts this HandrailParameters to JSON.
         * @function toJSON
         * @memberof Types.HandrailParameters
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        HandrailParameters.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return HandrailParameters;
    })();

    Types.Girder = (function() {

        /**
         * Properties of a Girder.
         * @memberof Types
         * @interface IGirder
         * @property {string|null} [uuid] Girder uuid
         * @property {number|null} [length] Girder length
         * @property {Array.<Types.ITreadGirBorder>|null} [borders] Girder borders
         */

        /**
         * Constructs a new Girder.
         * @memberof Types
         * @classdesc Represents a Girder.
         * @implements IGirder
         * @constructor
         * @param {Types.IGirder=} [properties] Properties to set
         */
        function Girder(properties) {
            this.borders = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Girder uuid.
         * @member {string} uuid
         * @memberof Types.Girder
         * @instance
         */
        Girder.prototype.uuid = "";

        /**
         * Girder length.
         * @member {number} length
         * @memberof Types.Girder
         * @instance
         */
        Girder.prototype.length = 0;

        /**
         * Girder borders.
         * @member {Array.<Types.ITreadGirBorder>} borders
         * @memberof Types.Girder
         * @instance
         */
        Girder.prototype.borders = $util.emptyArray;

        /**
         * Creates a new Girder instance using the specified properties.
         * @function create
         * @memberof Types.Girder
         * @static
         * @param {Types.IGirder=} [properties] Properties to set
         * @returns {Types.Girder} Girder instance
         */
        Girder.create = function create(properties) {
            return new Girder(properties);
        };

        /**
         * Encodes the specified Girder message. Does not implicitly {@link Types.Girder.verify|verify} messages.
         * @function encode
         * @memberof Types.Girder
         * @static
         * @param {Types.IGirder} message Girder message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Girder.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.uuid != null && Object.hasOwnProperty.call(message, "uuid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.uuid);
            if (message.length != null && Object.hasOwnProperty.call(message, "length"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.length);
            if (message.borders != null && message.borders.length)
                for (let i = 0; i < message.borders.length; ++i)
                    $root.Types.TreadGirBorder.encode(message.borders[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Girder message, length delimited. Does not implicitly {@link Types.Girder.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Types.Girder
         * @static
         * @param {Types.IGirder} message Girder message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Girder.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Girder message from the specified reader or buffer.
         * @function decode
         * @memberof Types.Girder
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Types.Girder} Girder
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Girder.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Types.Girder();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.uuid = reader.string();
                    break;
                case 2:
                    message.length = reader.float();
                    break;
                case 3:
                    if (!(message.borders && message.borders.length))
                        message.borders = [];
                    message.borders.push($root.Types.TreadGirBorder.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Girder message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Types.Girder
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Types.Girder} Girder
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Girder.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Girder message.
         * @function verify
         * @memberof Types.Girder
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Girder.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.uuid != null && message.hasOwnProperty("uuid"))
                if (!$util.isString(message.uuid))
                    return "uuid: string expected";
            if (message.length != null && message.hasOwnProperty("length"))
                if (typeof message.length !== "number")
                    return "length: number expected";
            if (message.borders != null && message.hasOwnProperty("borders")) {
                if (!Array.isArray(message.borders))
                    return "borders: array expected";
                for (let i = 0; i < message.borders.length; ++i) {
                    let error = $root.Types.TreadGirBorder.verify(message.borders[i]);
                    if (error)
                        return "borders." + error;
                }
            }
            return null;
        };

        /**
         * Creates a Girder message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Types.Girder
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Types.Girder} Girder
         */
        Girder.fromObject = function fromObject(object) {
            if (object instanceof $root.Types.Girder)
                return object;
            let message = new $root.Types.Girder();
            if (object.uuid != null)
                message.uuid = String(object.uuid);
            if (object.length != null)
                message.length = Number(object.length);
            if (object.borders) {
                if (!Array.isArray(object.borders))
                    throw TypeError(".Types.Girder.borders: array expected");
                message.borders = [];
                for (let i = 0; i < object.borders.length; ++i) {
                    if (typeof object.borders[i] !== "object")
                        throw TypeError(".Types.Girder.borders: object expected");
                    message.borders[i] = $root.Types.TreadGirBorder.fromObject(object.borders[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a Girder message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Types.Girder
         * @static
         * @param {Types.Girder} message Girder
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Girder.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.borders = [];
            if (options.defaults) {
                object.uuid = "";
                object.length = 0;
            }
            if (message.uuid != null && message.hasOwnProperty("uuid"))
                object.uuid = message.uuid;
            if (message.length != null && message.hasOwnProperty("length"))
                object.length = options.json && !isFinite(message.length) ? String(message.length) : message.length;
            if (message.borders && message.borders.length) {
                object.borders = [];
                for (let j = 0; j < message.borders.length; ++j)
                    object.borders[j] = $root.Types.TreadGirBorder.toObject(message.borders[j], options);
            }
            return object;
        };

        /**
         * Converts this Girder to JSON.
         * @function toJSON
         * @memberof Types.Girder
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Girder.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Girder;
    })();

    Types.TreadGirBorder = (function() {

        /**
         * Properties of a TreadGirBorder.
         * @memberof Types
         * @interface ITreadGirBorder
         * @property {Array.<Types.IEdge>|null} [inEdges] TreadGirBorder inEdges
         * @property {Array.<Types.IEdge>|null} [outEdges] TreadGirBorder outEdges
         * @property {Array.<Types.IEdge>|null} [inTopEdges] TreadGirBorder inTopEdges
         * @property {Array.<Types.IEdge>|null} [outTopEdges] TreadGirBorder outTopEdges
         * @property {Types.IVector3|null} [dir] TreadGirBorder dir
         */

        /**
         * Constructs a new TreadGirBorder.
         * @memberof Types
         * @classdesc Represents a TreadGirBorder.
         * @implements ITreadGirBorder
         * @constructor
         * @param {Types.ITreadGirBorder=} [properties] Properties to set
         */
        function TreadGirBorder(properties) {
            this.inEdges = [];
            this.outEdges = [];
            this.inTopEdges = [];
            this.outTopEdges = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TreadGirBorder inEdges.
         * @member {Array.<Types.IEdge>} inEdges
         * @memberof Types.TreadGirBorder
         * @instance
         */
        TreadGirBorder.prototype.inEdges = $util.emptyArray;

        /**
         * TreadGirBorder outEdges.
         * @member {Array.<Types.IEdge>} outEdges
         * @memberof Types.TreadGirBorder
         * @instance
         */
        TreadGirBorder.prototype.outEdges = $util.emptyArray;

        /**
         * TreadGirBorder inTopEdges.
         * @member {Array.<Types.IEdge>} inTopEdges
         * @memberof Types.TreadGirBorder
         * @instance
         */
        TreadGirBorder.prototype.inTopEdges = $util.emptyArray;

        /**
         * TreadGirBorder outTopEdges.
         * @member {Array.<Types.IEdge>} outTopEdges
         * @memberof Types.TreadGirBorder
         * @instance
         */
        TreadGirBorder.prototype.outTopEdges = $util.emptyArray;

        /**
         * TreadGirBorder dir.
         * @member {Types.IVector3|null|undefined} dir
         * @memberof Types.TreadGirBorder
         * @instance
         */
        TreadGirBorder.prototype.dir = null;

        /**
         * Creates a new TreadGirBorder instance using the specified properties.
         * @function create
         * @memberof Types.TreadGirBorder
         * @static
         * @param {Types.ITreadGirBorder=} [properties] Properties to set
         * @returns {Types.TreadGirBorder} TreadGirBorder instance
         */
        TreadGirBorder.create = function create(properties) {
            return new TreadGirBorder(properties);
        };

        /**
         * Encodes the specified TreadGirBorder message. Does not implicitly {@link Types.TreadGirBorder.verify|verify} messages.
         * @function encode
         * @memberof Types.TreadGirBorder
         * @static
         * @param {Types.ITreadGirBorder} message TreadGirBorder message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TreadGirBorder.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.inEdges != null && message.inEdges.length)
                for (let i = 0; i < message.inEdges.length; ++i)
                    $root.Types.Edge.encode(message.inEdges[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.outEdges != null && message.outEdges.length)
                for (let i = 0; i < message.outEdges.length; ++i)
                    $root.Types.Edge.encode(message.outEdges[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.inTopEdges != null && message.inTopEdges.length)
                for (let i = 0; i < message.inTopEdges.length; ++i)
                    $root.Types.Edge.encode(message.inTopEdges[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.outTopEdges != null && message.outTopEdges.length)
                for (let i = 0; i < message.outTopEdges.length; ++i)
                    $root.Types.Edge.encode(message.outTopEdges[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.dir != null && Object.hasOwnProperty.call(message, "dir"))
                $root.Types.Vector3.encode(message.dir, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified TreadGirBorder message, length delimited. Does not implicitly {@link Types.TreadGirBorder.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Types.TreadGirBorder
         * @static
         * @param {Types.ITreadGirBorder} message TreadGirBorder message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TreadGirBorder.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TreadGirBorder message from the specified reader or buffer.
         * @function decode
         * @memberof Types.TreadGirBorder
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Types.TreadGirBorder} TreadGirBorder
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TreadGirBorder.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Types.TreadGirBorder();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.inEdges && message.inEdges.length))
                        message.inEdges = [];
                    message.inEdges.push($root.Types.Edge.decode(reader, reader.uint32()));
                    break;
                case 2:
                    if (!(message.outEdges && message.outEdges.length))
                        message.outEdges = [];
                    message.outEdges.push($root.Types.Edge.decode(reader, reader.uint32()));
                    break;
                case 3:
                    if (!(message.inTopEdges && message.inTopEdges.length))
                        message.inTopEdges = [];
                    message.inTopEdges.push($root.Types.Edge.decode(reader, reader.uint32()));
                    break;
                case 4:
                    if (!(message.outTopEdges && message.outTopEdges.length))
                        message.outTopEdges = [];
                    message.outTopEdges.push($root.Types.Edge.decode(reader, reader.uint32()));
                    break;
                case 5:
                    message.dir = $root.Types.Vector3.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TreadGirBorder message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Types.TreadGirBorder
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Types.TreadGirBorder} TreadGirBorder
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TreadGirBorder.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TreadGirBorder message.
         * @function verify
         * @memberof Types.TreadGirBorder
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TreadGirBorder.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.inEdges != null && message.hasOwnProperty("inEdges")) {
                if (!Array.isArray(message.inEdges))
                    return "inEdges: array expected";
                for (let i = 0; i < message.inEdges.length; ++i) {
                    let error = $root.Types.Edge.verify(message.inEdges[i]);
                    if (error)
                        return "inEdges." + error;
                }
            }
            if (message.outEdges != null && message.hasOwnProperty("outEdges")) {
                if (!Array.isArray(message.outEdges))
                    return "outEdges: array expected";
                for (let i = 0; i < message.outEdges.length; ++i) {
                    let error = $root.Types.Edge.verify(message.outEdges[i]);
                    if (error)
                        return "outEdges." + error;
                }
            }
            if (message.inTopEdges != null && message.hasOwnProperty("inTopEdges")) {
                if (!Array.isArray(message.inTopEdges))
                    return "inTopEdges: array expected";
                for (let i = 0; i < message.inTopEdges.length; ++i) {
                    let error = $root.Types.Edge.verify(message.inTopEdges[i]);
                    if (error)
                        return "inTopEdges." + error;
                }
            }
            if (message.outTopEdges != null && message.hasOwnProperty("outTopEdges")) {
                if (!Array.isArray(message.outTopEdges))
                    return "outTopEdges: array expected";
                for (let i = 0; i < message.outTopEdges.length; ++i) {
                    let error = $root.Types.Edge.verify(message.outTopEdges[i]);
                    if (error)
                        return "outTopEdges." + error;
                }
            }
            if (message.dir != null && message.hasOwnProperty("dir")) {
                let error = $root.Types.Vector3.verify(message.dir);
                if (error)
                    return "dir." + error;
            }
            return null;
        };

        /**
         * Creates a TreadGirBorder message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Types.TreadGirBorder
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Types.TreadGirBorder} TreadGirBorder
         */
        TreadGirBorder.fromObject = function fromObject(object) {
            if (object instanceof $root.Types.TreadGirBorder)
                return object;
            let message = new $root.Types.TreadGirBorder();
            if (object.inEdges) {
                if (!Array.isArray(object.inEdges))
                    throw TypeError(".Types.TreadGirBorder.inEdges: array expected");
                message.inEdges = [];
                for (let i = 0; i < object.inEdges.length; ++i) {
                    if (typeof object.inEdges[i] !== "object")
                        throw TypeError(".Types.TreadGirBorder.inEdges: object expected");
                    message.inEdges[i] = $root.Types.Edge.fromObject(object.inEdges[i]);
                }
            }
            if (object.outEdges) {
                if (!Array.isArray(object.outEdges))
                    throw TypeError(".Types.TreadGirBorder.outEdges: array expected");
                message.outEdges = [];
                for (let i = 0; i < object.outEdges.length; ++i) {
                    if (typeof object.outEdges[i] !== "object")
                        throw TypeError(".Types.TreadGirBorder.outEdges: object expected");
                    message.outEdges[i] = $root.Types.Edge.fromObject(object.outEdges[i]);
                }
            }
            if (object.inTopEdges) {
                if (!Array.isArray(object.inTopEdges))
                    throw TypeError(".Types.TreadGirBorder.inTopEdges: array expected");
                message.inTopEdges = [];
                for (let i = 0; i < object.inTopEdges.length; ++i) {
                    if (typeof object.inTopEdges[i] !== "object")
                        throw TypeError(".Types.TreadGirBorder.inTopEdges: object expected");
                    message.inTopEdges[i] = $root.Types.Edge.fromObject(object.inTopEdges[i]);
                }
            }
            if (object.outTopEdges) {
                if (!Array.isArray(object.outTopEdges))
                    throw TypeError(".Types.TreadGirBorder.outTopEdges: array expected");
                message.outTopEdges = [];
                for (let i = 0; i < object.outTopEdges.length; ++i) {
                    if (typeof object.outTopEdges[i] !== "object")
                        throw TypeError(".Types.TreadGirBorder.outTopEdges: object expected");
                    message.outTopEdges[i] = $root.Types.Edge.fromObject(object.outTopEdges[i]);
                }
            }
            if (object.dir != null) {
                if (typeof object.dir !== "object")
                    throw TypeError(".Types.TreadGirBorder.dir: object expected");
                message.dir = $root.Types.Vector3.fromObject(object.dir);
            }
            return message;
        };

        /**
         * Creates a plain object from a TreadGirBorder message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Types.TreadGirBorder
         * @static
         * @param {Types.TreadGirBorder} message TreadGirBorder
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TreadGirBorder.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.inEdges = [];
                object.outEdges = [];
                object.inTopEdges = [];
                object.outTopEdges = [];
            }
            if (options.defaults)
                object.dir = null;
            if (message.inEdges && message.inEdges.length) {
                object.inEdges = [];
                for (let j = 0; j < message.inEdges.length; ++j)
                    object.inEdges[j] = $root.Types.Edge.toObject(message.inEdges[j], options);
            }
            if (message.outEdges && message.outEdges.length) {
                object.outEdges = [];
                for (let j = 0; j < message.outEdges.length; ++j)
                    object.outEdges[j] = $root.Types.Edge.toObject(message.outEdges[j], options);
            }
            if (message.inTopEdges && message.inTopEdges.length) {
                object.inTopEdges = [];
                for (let j = 0; j < message.inTopEdges.length; ++j)
                    object.inTopEdges[j] = $root.Types.Edge.toObject(message.inTopEdges[j], options);
            }
            if (message.outTopEdges && message.outTopEdges.length) {
                object.outTopEdges = [];
                for (let j = 0; j < message.outTopEdges.length; ++j)
                    object.outTopEdges[j] = $root.Types.Edge.toObject(message.outTopEdges[j], options);
            }
            if (message.dir != null && message.hasOwnProperty("dir"))
                object.dir = $root.Types.Vector3.toObject(message.dir, options);
            return object;
        };

        /**
         * Converts this TreadGirBorder to JSON.
         * @function toJSON
         * @memberof Types.TreadGirBorder
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TreadGirBorder.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TreadGirBorder;
    })();

    Types.GirderParameters = (function() {

        /**
         * Properties of a GirderParameters.
         * @memberof Types
         * @interface IGirderParameters
         * @property {number|null} [height] GirderParameters height
         * @property {number|null} [depth] GirderParameters depth
         * @property {Types.GirderType|null} [type] GirderParameters type
         * @property {Types.IMaterial|null} [material] GirderParameters material
         * @property {number|null} [fOffsetStep] GirderParameters fOffsetStep
         * @property {number|null} [bSuppotHeight] GirderParameters bSuppotHeight
         * @property {number|null} [aboveHeight] GirderParameters aboveHeight
         */

        /**
         * Constructs a new GirderParameters.
         * @memberof Types
         * @classdesc Represents a GirderParameters.
         * @implements IGirderParameters
         * @constructor
         * @param {Types.IGirderParameters=} [properties] Properties to set
         */
        function GirderParameters(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GirderParameters height.
         * @member {number} height
         * @memberof Types.GirderParameters
         * @instance
         */
        GirderParameters.prototype.height = 0;

        /**
         * GirderParameters depth.
         * @member {number} depth
         * @memberof Types.GirderParameters
         * @instance
         */
        GirderParameters.prototype.depth = 0;

        /**
         * GirderParameters type.
         * @member {Types.GirderType} type
         * @memberof Types.GirderParameters
         * @instance
         */
        GirderParameters.prototype.type = 0;

        /**
         * GirderParameters material.
         * @member {Types.IMaterial|null|undefined} material
         * @memberof Types.GirderParameters
         * @instance
         */
        GirderParameters.prototype.material = null;

        /**
         * GirderParameters fOffsetStep.
         * @member {number} fOffsetStep
         * @memberof Types.GirderParameters
         * @instance
         */
        GirderParameters.prototype.fOffsetStep = 0;

        /**
         * GirderParameters bSuppotHeight.
         * @member {number} bSuppotHeight
         * @memberof Types.GirderParameters
         * @instance
         */
        GirderParameters.prototype.bSuppotHeight = 0;

        /**
         * GirderParameters aboveHeight.
         * @member {number} aboveHeight
         * @memberof Types.GirderParameters
         * @instance
         */
        GirderParameters.prototype.aboveHeight = 0;

        /**
         * Creates a new GirderParameters instance using the specified properties.
         * @function create
         * @memberof Types.GirderParameters
         * @static
         * @param {Types.IGirderParameters=} [properties] Properties to set
         * @returns {Types.GirderParameters} GirderParameters instance
         */
        GirderParameters.create = function create(properties) {
            return new GirderParameters(properties);
        };

        /**
         * Encodes the specified GirderParameters message. Does not implicitly {@link Types.GirderParameters.verify|verify} messages.
         * @function encode
         * @memberof Types.GirderParameters
         * @static
         * @param {Types.IGirderParameters} message GirderParameters message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GirderParameters.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.height != null && Object.hasOwnProperty.call(message, "height"))
                writer.uint32(/* id 1, wireType 5 =*/13).float(message.height);
            if (message.depth != null && Object.hasOwnProperty.call(message, "depth"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.depth);
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.type);
            if (message.material != null && Object.hasOwnProperty.call(message, "material"))
                $root.Types.Material.encode(message.material, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.fOffsetStep != null && Object.hasOwnProperty.call(message, "fOffsetStep"))
                writer.uint32(/* id 5, wireType 5 =*/45).float(message.fOffsetStep);
            if (message.bSuppotHeight != null && Object.hasOwnProperty.call(message, "bSuppotHeight"))
                writer.uint32(/* id 6, wireType 5 =*/53).float(message.bSuppotHeight);
            if (message.aboveHeight != null && Object.hasOwnProperty.call(message, "aboveHeight"))
                writer.uint32(/* id 7, wireType 5 =*/61).float(message.aboveHeight);
            return writer;
        };

        /**
         * Encodes the specified GirderParameters message, length delimited. Does not implicitly {@link Types.GirderParameters.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Types.GirderParameters
         * @static
         * @param {Types.IGirderParameters} message GirderParameters message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GirderParameters.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GirderParameters message from the specified reader or buffer.
         * @function decode
         * @memberof Types.GirderParameters
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Types.GirderParameters} GirderParameters
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GirderParameters.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Types.GirderParameters();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.height = reader.float();
                    break;
                case 2:
                    message.depth = reader.float();
                    break;
                case 3:
                    message.type = reader.int32();
                    break;
                case 4:
                    message.material = $root.Types.Material.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.fOffsetStep = reader.float();
                    break;
                case 6:
                    message.bSuppotHeight = reader.float();
                    break;
                case 7:
                    message.aboveHeight = reader.float();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GirderParameters message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Types.GirderParameters
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Types.GirderParameters} GirderParameters
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GirderParameters.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GirderParameters message.
         * @function verify
         * @memberof Types.GirderParameters
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GirderParameters.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.height != null && message.hasOwnProperty("height"))
                if (typeof message.height !== "number")
                    return "height: number expected";
            if (message.depth != null && message.hasOwnProperty("depth"))
                if (typeof message.depth !== "number")
                    return "depth: number expected";
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            if (message.material != null && message.hasOwnProperty("material")) {
                let error = $root.Types.Material.verify(message.material);
                if (error)
                    return "material." + error;
            }
            if (message.fOffsetStep != null && message.hasOwnProperty("fOffsetStep"))
                if (typeof message.fOffsetStep !== "number")
                    return "fOffsetStep: number expected";
            if (message.bSuppotHeight != null && message.hasOwnProperty("bSuppotHeight"))
                if (typeof message.bSuppotHeight !== "number")
                    return "bSuppotHeight: number expected";
            if (message.aboveHeight != null && message.hasOwnProperty("aboveHeight"))
                if (typeof message.aboveHeight !== "number")
                    return "aboveHeight: number expected";
            return null;
        };

        /**
         * Creates a GirderParameters message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Types.GirderParameters
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Types.GirderParameters} GirderParameters
         */
        GirderParameters.fromObject = function fromObject(object) {
            if (object instanceof $root.Types.GirderParameters)
                return object;
            let message = new $root.Types.GirderParameters();
            if (object.height != null)
                message.height = Number(object.height);
            if (object.depth != null)
                message.depth = Number(object.depth);
            switch (object.type) {
            case "gph":
            case 0:
                message.type = 0;
                break;
            case "gslab":
            case 1:
                message.type = 1;
                break;
            case "gsaw":
            case 2:
                message.type = 2;
                break;
            }
            if (object.material != null) {
                if (typeof object.material !== "object")
                    throw TypeError(".Types.GirderParameters.material: object expected");
                message.material = $root.Types.Material.fromObject(object.material);
            }
            if (object.fOffsetStep != null)
                message.fOffsetStep = Number(object.fOffsetStep);
            if (object.bSuppotHeight != null)
                message.bSuppotHeight = Number(object.bSuppotHeight);
            if (object.aboveHeight != null)
                message.aboveHeight = Number(object.aboveHeight);
            return message;
        };

        /**
         * Creates a plain object from a GirderParameters message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Types.GirderParameters
         * @static
         * @param {Types.GirderParameters} message GirderParameters
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GirderParameters.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.height = 0;
                object.depth = 0;
                object.type = options.enums === String ? "gph" : 0;
                object.material = null;
                object.fOffsetStep = 0;
                object.bSuppotHeight = 0;
                object.aboveHeight = 0;
            }
            if (message.height != null && message.hasOwnProperty("height"))
                object.height = options.json && !isFinite(message.height) ? String(message.height) : message.height;
            if (message.depth != null && message.hasOwnProperty("depth"))
                object.depth = options.json && !isFinite(message.depth) ? String(message.depth) : message.depth;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.Types.GirderType[message.type] : message.type;
            if (message.material != null && message.hasOwnProperty("material"))
                object.material = $root.Types.Material.toObject(message.material, options);
            if (message.fOffsetStep != null && message.hasOwnProperty("fOffsetStep"))
                object.fOffsetStep = options.json && !isFinite(message.fOffsetStep) ? String(message.fOffsetStep) : message.fOffsetStep;
            if (message.bSuppotHeight != null && message.hasOwnProperty("bSuppotHeight"))
                object.bSuppotHeight = options.json && !isFinite(message.bSuppotHeight) ? String(message.bSuppotHeight) : message.bSuppotHeight;
            if (message.aboveHeight != null && message.hasOwnProperty("aboveHeight"))
                object.aboveHeight = options.json && !isFinite(message.aboveHeight) ? String(message.aboveHeight) : message.aboveHeight;
            return object;
        };

        /**
         * Converts this GirderParameters to JSON.
         * @function toJSON
         * @memberof Types.GirderParameters
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GirderParameters.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GirderParameters;
    })();

    return Types;
})();

export { $root as default };
