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
     */
    Types.EdgeType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "eph"] = 0;
        values[valuesById[1] = "estraight"] = 1;
        values[valuesById[2] = "earc"] = 2;
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
     */
    Types.StairType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "sph"] = 0;
        values[valuesById[1] = "sstright"] = 1;
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
         * @property {number|null} [start_angle] Edge start_angle
         * @property {number|null} [end_angle] Edge end_angle
         * @property {boolean|null} [is_clockwise] Edge is_clockwise
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
         * Edge start_angle.
         * @member {number} start_angle
         * @memberof Types.Edge
         * @instance
         */
        Edge.prototype.start_angle = 0;

        /**
         * Edge end_angle.
         * @member {number} end_angle
         * @memberof Types.Edge
         * @instance
         */
        Edge.prototype.end_angle = 0;

        /**
         * Edge is_clockwise.
         * @member {boolean} is_clockwise
         * @memberof Types.Edge
         * @instance
         */
        Edge.prototype.is_clockwise = false;

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
            if (message.start_angle != null && Object.hasOwnProperty.call(message, "start_angle"))
                writer.uint32(/* id 6, wireType 5 =*/53).float(message.start_angle);
            if (message.end_angle != null && Object.hasOwnProperty.call(message, "end_angle"))
                writer.uint32(/* id 7, wireType 5 =*/61).float(message.end_angle);
            if (message.is_clockwise != null && Object.hasOwnProperty.call(message, "is_clockwise"))
                writer.uint32(/* id 8, wireType 0 =*/64).bool(message.is_clockwise);
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
                    message.start_angle = reader.float();
                    break;
                case 7:
                    message.end_angle = reader.float();
                    break;
                case 8:
                    message.is_clockwise = reader.bool();
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
            if (message.start_angle != null && message.hasOwnProperty("start_angle"))
                if (typeof message.start_angle !== "number")
                    return "start_angle: number expected";
            if (message.end_angle != null && message.hasOwnProperty("end_angle"))
                if (typeof message.end_angle !== "number")
                    return "end_angle: number expected";
            if (message.is_clockwise != null && message.hasOwnProperty("is_clockwise"))
                if (typeof message.is_clockwise !== "boolean")
                    return "is_clockwise: boolean expected";
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
            }
            if (object.radius != null)
                message.radius = Number(object.radius);
            if (object.position != null) {
                if (typeof object.position !== "object")
                    throw TypeError(".Types.Edge.position: object expected");
                message.position = $root.Types.Vector3.fromObject(object.position);
            }
            if (object.start_angle != null)
                message.start_angle = Number(object.start_angle);
            if (object.end_angle != null)
                message.end_angle = Number(object.end_angle);
            if (object.is_clockwise != null)
                message.is_clockwise = Boolean(object.is_clockwise);
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
                object.start_angle = 0;
                object.end_angle = 0;
                object.is_clockwise = false;
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
            if (message.start_angle != null && message.hasOwnProperty("start_angle"))
                object.start_angle = options.json && !isFinite(message.start_angle) ? String(message.start_angle) : message.start_angle;
            if (message.end_angle != null && message.hasOwnProperty("end_angle"))
                object.end_angle = options.json && !isFinite(message.end_angle) ? String(message.end_angle) : message.end_angle;
            if (message.is_clockwise != null && message.hasOwnProperty("is_clockwise"))
                object.is_clockwise = message.is_clockwise;
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
            if (message.edges && message.edges.length) {
                object.edges = [];
                for (let j = 0; j < message.edges.length; ++j)
                    object.edges[j] = $root.Types.Edge.toObject(message.edges[j], options);
            }
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
         * @property {Array.<Types.IFlight>|null} [flights] Stair flights
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
         * Stair flights.
         * @member {Array.<Types.IFlight>} flights
         * @memberof Types.Stair
         * @instance
         */
        Stair.prototype.flights = $util.emptyArray;

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
            if (message.flights != null && message.flights.length)
                for (let i = 0; i < message.flights.length; ++i)
                    $root.Types.Flight.encode(message.flights[i], writer.uint32(/* id 15, wireType 2 =*/122).fork()).ldelim();
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
                case 15:
                    if (!(message.flights && message.flights.length))
                        message.flights = [];
                    message.flights.push($root.Types.Flight.decode(reader, reader.uint32()));
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
            if (message.flights != null && message.hasOwnProperty("flights")) {
                if (!Array.isArray(message.flights))
                    return "flights: array expected";
                for (let i = 0; i < message.flights.length; ++i) {
                    let error = $root.Types.Flight.verify(message.flights[i]);
                    if (error)
                        return "flights." + error;
                }
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
            if (options.arrays || options.defaults)
                object.flights = [];
            if (options.defaults) {
                object.uuid = "";
                object.startBeamDepth = 0;
                object.exitBeamDepth = 0;
                object.type = options.enums === String ? "sph" : 0;
                object.againstWallType = options.enums === String ? "aw_ph" : 0;
                object.treadParameters = null;
                object.riserParameters = null;
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
            if (message.flights && message.flights.length) {
                object.flights = [];
                for (let j = 0; j < message.flights.length; ++j)
                    object.flights[j] = $root.Types.Flight.toObject(message.flights[j], options);
            }
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

    Types.Flight = (function() {

        /**
         * Properties of a Flight.
         * @memberof Types
         * @interface IFlight
         * @property {string|null} [uuid] Flight uuid
         * @property {number|null} [stepLength] Flight stepLength
         * @property {number|null} [stepWidth] Flight stepWidth
         * @property {number|null} [stepHeight] Flight stepHeight
         * @property {Types.StepNumRule|null} [stepNumRule] Flight stepNumRule
         * @property {number|null} [stepNum] Flight stepNum
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
         * Flight stepLength.
         * @member {number} stepLength
         * @memberof Types.Flight
         * @instance
         */
        Flight.prototype.stepLength = 0;

        /**
         * Flight stepWidth.
         * @member {number} stepWidth
         * @memberof Types.Flight
         * @instance
         */
        Flight.prototype.stepWidth = 0;

        /**
         * Flight stepHeight.
         * @member {number} stepHeight
         * @memberof Types.Flight
         * @instance
         */
        Flight.prototype.stepHeight = 0;

        /**
         * Flight stepNumRule.
         * @member {Types.StepNumRule} stepNumRule
         * @memberof Types.Flight
         * @instance
         */
        Flight.prototype.stepNumRule = 0;

        /**
         * Flight stepNum.
         * @member {number} stepNum
         * @memberof Types.Flight
         * @instance
         */
        Flight.prototype.stepNum = 0;

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
            if (message.stepLength != null && Object.hasOwnProperty.call(message, "stepLength"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.stepLength);
            if (message.stepWidth != null && Object.hasOwnProperty.call(message, "stepWidth"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.stepWidth);
            if (message.stepHeight != null && Object.hasOwnProperty.call(message, "stepHeight"))
                writer.uint32(/* id 4, wireType 5 =*/37).float(message.stepHeight);
            if (message.stepNumRule != null && Object.hasOwnProperty.call(message, "stepNumRule"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.stepNumRule);
            if (message.stepNum != null && Object.hasOwnProperty.call(message, "stepNum"))
                writer.uint32(/* id 6, wireType 5 =*/53).float(message.stepNum);
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
                case 2:
                    message.stepLength = reader.float();
                    break;
                case 3:
                    message.stepWidth = reader.float();
                    break;
                case 4:
                    message.stepHeight = reader.float();
                    break;
                case 5:
                    message.stepNumRule = reader.int32();
                    break;
                case 6:
                    message.stepNum = reader.float();
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
            if (message.stepLength != null && message.hasOwnProperty("stepLength"))
                if (typeof message.stepLength !== "number")
                    return "stepLength: number expected";
            if (message.stepWidth != null && message.hasOwnProperty("stepWidth"))
                if (typeof message.stepWidth !== "number")
                    return "stepWidth: number expected";
            if (message.stepHeight != null && message.hasOwnProperty("stepHeight"))
                if (typeof message.stepHeight !== "number")
                    return "stepHeight: number expected";
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
            if (object.stepLength != null)
                message.stepLength = Number(object.stepLength);
            if (object.stepWidth != null)
                message.stepWidth = Number(object.stepWidth);
            if (object.stepHeight != null)
                message.stepHeight = Number(object.stepHeight);
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
                object.stepLength = 0;
                object.stepWidth = 0;
                object.stepHeight = 0;
                object.stepNumRule = options.enums === String ? "snr_ph" : 0;
                object.stepNum = 0;
            }
            if (message.uuid != null && message.hasOwnProperty("uuid"))
                object.uuid = message.uuid;
            if (message.stepLength != null && message.hasOwnProperty("stepLength"))
                object.stepLength = options.json && !isFinite(message.stepLength) ? String(message.stepLength) : message.stepLength;
            if (message.stepWidth != null && message.hasOwnProperty("stepWidth"))
                object.stepWidth = options.json && !isFinite(message.stepWidth) ? String(message.stepWidth) : message.stepWidth;
            if (message.stepHeight != null && message.hasOwnProperty("stepHeight"))
                object.stepHeight = options.json && !isFinite(message.stepHeight) ? String(message.stepHeight) : message.stepHeight;
            if (message.stepNumRule != null && message.hasOwnProperty("stepNumRule"))
                object.stepNumRule = options.enums === String ? $root.Types.StepNumRule[message.stepNumRule] : message.stepNumRule;
            if (message.stepNum != null && message.hasOwnProperty("stepNum"))
                object.stepNum = options.json && !isFinite(message.stepNum) ? String(message.stepNum) : message.stepNum;
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
         * @property {Types.IOutline|null} [stepOutline] Tread stepOutline
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
         * Tread stepOutline.
         * @member {Types.IOutline|null|undefined} stepOutline
         * @memberof Types.Tread
         * @instance
         */
        Tread.prototype.stepOutline = null;

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
            if (message.stepOutline != null && Object.hasOwnProperty.call(message, "stepOutline"))
                $root.Types.Outline.encode(message.stepOutline, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
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
                    message.stepOutline = $root.Types.Outline.decode(reader, reader.uint32());
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
            if (message.stepOutline != null && message.hasOwnProperty("stepOutline")) {
                let error = $root.Types.Outline.verify(message.stepOutline);
                if (error)
                    return "stepOutline." + error;
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
            if (object.stepOutline != null) {
                if (typeof object.stepOutline !== "object")
                    throw TypeError(".Types.Tread.stepOutline: object expected");
                message.stepOutline = $root.Types.Outline.fromObject(object.stepOutline);
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
                object.stepOutline = null;
            }
            if (message.uuid != null && message.hasOwnProperty("uuid"))
                object.uuid = message.uuid;
            if (message.stepOutline != null && message.hasOwnProperty("stepOutline"))
                object.stepOutline = $root.Types.Outline.toObject(message.stepOutline, options);
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
            return new $root.Types.RiserParameters();
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
        RiserParameters.toObject = function toObject() {
            return {};
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

    return Types;
})();

export { $root as default };
