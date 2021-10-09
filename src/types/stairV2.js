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
            if (message.x != null && message.hasOwnProperty("x"))
                writer.uint32(/* id 1, wireType 5 =*/13).float(message.x);
            if (message.y != null && message.hasOwnProperty("y"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.y);
            if (message.z != null && message.hasOwnProperty("z"))
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

    /**
     * EdgeType enum.
     * @name Types.EdgeType
     * @enum {string}
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
            if (message.p1 != null && message.hasOwnProperty("p1"))
                $root.Types.Vector3.encode(message.p1, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.p2 != null && message.hasOwnProperty("p2"))
                $root.Types.Vector3.encode(message.p2, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.type != null && message.hasOwnProperty("type"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.type);
            if (message.radius != null && message.hasOwnProperty("radius"))
                writer.uint32(/* id 4, wireType 5 =*/37).float(message.radius);
            if (message.position != null && message.hasOwnProperty("position"))
                $root.Types.Vector3.encode(message.position, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.start_angle != null && message.hasOwnProperty("start_angle"))
                writer.uint32(/* id 6, wireType 5 =*/53).float(message.start_angle);
            if (message.end_angle != null && message.hasOwnProperty("end_angle"))
                writer.uint32(/* id 7, wireType 5 =*/61).float(message.end_angle);
            if (message.is_clockwise != null && message.hasOwnProperty("is_clockwise"))
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
            if (message.uuid != null && message.hasOwnProperty("uuid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.uuid);
            if (message.hole != null && message.hasOwnProperty("hole"))
                $root.Types.Hole.encode(message.hole, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.walls != null && message.walls.length)
                for (let i = 0; i < message.walls.length; ++i)
                    $root.Types.Wall.encode(message.walls[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.stair != null && message.hasOwnProperty("stair"))
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

    Types.Stair = (function() {

        /**
         * Properties of a Stair.
         * @memberof Types
         * @interface IStair
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
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

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
            return new $root.Types.Stair();
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
        Stair.toObject = function toObject() {
            return {};
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

    Types.Hole = (function() {

        /**
         * Properties of a Hole.
         * @memberof Types
         * @interface IHole
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
            if (message.edges != null && message.edges.length)
                for (let i = 0; i < message.edges.length; ++i)
                    $root.Types.Edge.encode(message.edges[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.floorHeight != null && message.hasOwnProperty("floorHeight"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.floorHeight);
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
                    if (!(message.edges && message.edges.length))
                        message.edges = [];
                    message.edges.push($root.Types.Edge.decode(reader, reader.uint32()));
                    break;
                case 2:
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
            if (options.defaults)
                object.floorHeight = 0;
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

    /**
     * WallType enum.
     * @name Types.WallType
     * @enum {string}
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

    Types.Wall = (function() {

        /**
         * Properties of a Wall.
         * @memberof Types
         * @interface IWall
         * @property {Types.IVector3|null} [p1] Wall p1
         * @property {Types.IVector3|null} [p2] Wall p2
         * @property {Types.WallType|null} [type] Wall type
         * @property {number|null} [startExtend] Wall startExtend
         * @property {number|null} [endExtend] Wall endExtend
         * @property {number|null} [depth] Wall depth
         * @property {number|null} [height] Wall height
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
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Wall p1.
         * @member {Types.IVector3|null|undefined} p1
         * @memberof Types.Wall
         * @instance
         */
        Wall.prototype.p1 = null;

        /**
         * Wall p2.
         * @member {Types.IVector3|null|undefined} p2
         * @memberof Types.Wall
         * @instance
         */
        Wall.prototype.p2 = null;

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
            if (message.p1 != null && message.hasOwnProperty("p1"))
                $root.Types.Vector3.encode(message.p1, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.p2 != null && message.hasOwnProperty("p2"))
                $root.Types.Vector3.encode(message.p2, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.type != null && message.hasOwnProperty("type"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.type);
            if (message.startExtend != null && message.hasOwnProperty("startExtend"))
                writer.uint32(/* id 4, wireType 5 =*/37).float(message.startExtend);
            if (message.endExtend != null && message.hasOwnProperty("endExtend"))
                writer.uint32(/* id 5, wireType 5 =*/45).float(message.endExtend);
            if (message.depth != null && message.hasOwnProperty("depth"))
                writer.uint32(/* id 6, wireType 5 =*/53).float(message.depth);
            if (message.height != null && message.hasOwnProperty("height"))
                writer.uint32(/* id 7, wireType 5 =*/61).float(message.height);
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
                    message.p1 = $root.Types.Vector3.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.p2 = $root.Types.Vector3.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.type = reader.int32();
                    break;
                case 4:
                    message.startExtend = reader.float();
                    break;
                case 5:
                    message.endExtend = reader.float();
                    break;
                case 6:
                    message.depth = reader.float();
                    break;
                case 7:
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
            if (object.p1 != null) {
                if (typeof object.p1 !== "object")
                    throw TypeError(".Types.Wall.p1: object expected");
                message.p1 = $root.Types.Vector3.fromObject(object.p1);
            }
            if (object.p2 != null) {
                if (typeof object.p2 !== "object")
                    throw TypeError(".Types.Wall.p2: object expected");
                message.p2 = $root.Types.Vector3.fromObject(object.p2);
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
            if (options.defaults) {
                object.p1 = null;
                object.p2 = null;
                object.type = options.enums === String ? "wph" : 0;
                object.startExtend = 0;
                object.endExtend = 0;
                object.depth = 0;
                object.height = 0;
            }
            if (message.p1 != null && message.hasOwnProperty("p1"))
                object.p1 = $root.Types.Vector3.toObject(message.p1, options);
            if (message.p2 != null && message.hasOwnProperty("p2"))
                object.p2 = $root.Types.Vector3.toObject(message.p2, options);
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

    return Types;
})();

export { $root as default };
