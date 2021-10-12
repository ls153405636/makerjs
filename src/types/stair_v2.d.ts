import * as $protobuf from "protobufjs";
/** Namespace Types. */
export namespace Types {

    /** Properties of a Vector3. */
    interface IVector3 {

        /** Vector3 x */
        x?: (number|null);

        /** Vector3 y */
        y?: (number|null);

        /** Vector3 z */
        z?: (number|null);
    }

    /** Represents a Vector3. */
    class Vector3 implements IVector3 {

        /**
         * Constructs a new Vector3.
         * @param [properties] Properties to set
         */
        constructor(properties?: Types.IVector3);

        /** Vector3 x. */
        public x: number;

        /** Vector3 y. */
        public y: number;

        /** Vector3 z. */
        public z: number;

        /**
         * Creates a new Vector3 instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Vector3 instance
         */
        public static create(properties?: Types.IVector3): Types.Vector3;

        /**
         * Encodes the specified Vector3 message. Does not implicitly {@link Types.Vector3.verify|verify} messages.
         * @param message Vector3 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Types.IVector3, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Vector3 message, length delimited. Does not implicitly {@link Types.Vector3.verify|verify} messages.
         * @param message Vector3 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Types.IVector3, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Vector3 message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Vector3
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Types.Vector3;

        /**
         * Decodes a Vector3 message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Vector3
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Types.Vector3;

        /**
         * Verifies a Vector3 message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Vector3 message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Vector3
         */
        public static fromObject(object: { [k: string]: any }): Types.Vector3;

        /**
         * Creates a plain object from a Vector3 message. Also converts values to other types if specified.
         * @param message Vector3
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Types.Vector3, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Vector3 to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** EdgeType enum. */
    enum EdgeType {
        eph = 0,
        estraight = 1,
        earc = 2
    }

    /** Properties of an Edge. */
    interface IEdge {

        /** Edge p1 */
        p1?: (Types.IVector3|null);

        /** Edge p2 */
        p2?: (Types.IVector3|null);

        /** Edge type */
        type?: (Types.EdgeType|null);

        /** Edge radius */
        radius?: (number|null);

        /** Edge position */
        position?: (Types.IVector3|null);

        /** Edge start_angle */
        start_angle?: (number|null);

        /** Edge end_angle */
        end_angle?: (number|null);

        /** Edge is_clockwise */
        is_clockwise?: (boolean|null);
    }

    /** Represents an Edge. */
    class Edge implements IEdge {

        /**
         * Constructs a new Edge.
         * @param [properties] Properties to set
         */
        constructor(properties?: Types.IEdge);

        /** Edge p1. */
        public p1?: (Types.IVector3|null);

        /** Edge p2. */
        public p2?: (Types.IVector3|null);

        /** Edge type. */
        public type: Types.EdgeType;

        /** Edge radius. */
        public radius: number;

        /** Edge position. */
        public position?: (Types.IVector3|null);

        /** Edge start_angle. */
        public start_angle: number;

        /** Edge end_angle. */
        public end_angle: number;

        /** Edge is_clockwise. */
        public is_clockwise: boolean;

        /**
         * Creates a new Edge instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Edge instance
         */
        public static create(properties?: Types.IEdge): Types.Edge;

        /**
         * Encodes the specified Edge message. Does not implicitly {@link Types.Edge.verify|verify} messages.
         * @param message Edge message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Types.IEdge, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Edge message, length delimited. Does not implicitly {@link Types.Edge.verify|verify} messages.
         * @param message Edge message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Types.IEdge, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Edge message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Edge
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Types.Edge;

        /**
         * Decodes an Edge message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Edge
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Types.Edge;

        /**
         * Verifies an Edge message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Edge message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Edge
         */
        public static fromObject(object: { [k: string]: any }): Types.Edge;

        /**
         * Creates a plain object from an Edge message. Also converts values to other types if specified.
         * @param message Edge
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Types.Edge, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Edge to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Project. */
    interface IProject {

        /** Project uuid */
        uuid?: (string|null);

        /** Project hole */
        hole?: (Types.IHole|null);

        /** Project walls */
        walls?: (Types.IWall[]|null);

        /** Project stair */
        stair?: (Types.IStair|null);
    }

    /** Represents a Project. */
    class Project implements IProject {

        /**
         * Constructs a new Project.
         * @param [properties] Properties to set
         */
        constructor(properties?: Types.IProject);

        /** Project uuid. */
        public uuid: string;

        /** Project hole. */
        public hole?: (Types.IHole|null);

        /** Project walls. */
        public walls: Types.IWall[];

        /** Project stair. */
        public stair?: (Types.IStair|null);

        /**
         * Creates a new Project instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Project instance
         */
        public static create(properties?: Types.IProject): Types.Project;

        /**
         * Encodes the specified Project message. Does not implicitly {@link Types.Project.verify|verify} messages.
         * @param message Project message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Types.IProject, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Project message, length delimited. Does not implicitly {@link Types.Project.verify|verify} messages.
         * @param message Project message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Types.IProject, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Project message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Project
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Types.Project;

        /**
         * Decodes a Project message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Project
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Types.Project;

        /**
         * Verifies a Project message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Project message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Project
         */
        public static fromObject(object: { [k: string]: any }): Types.Project;

        /**
         * Creates a plain object from a Project message. Also converts values to other types if specified.
         * @param message Project
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Types.Project, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Project to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Stair. */
    interface IStair {
    }

    /** Represents a Stair. */
    class Stair implements IStair {

        /**
         * Constructs a new Stair.
         * @param [properties] Properties to set
         */
        constructor(properties?: Types.IStair);

        /**
         * Creates a new Stair instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Stair instance
         */
        public static create(properties?: Types.IStair): Types.Stair;

        /**
         * Encodes the specified Stair message. Does not implicitly {@link Types.Stair.verify|verify} messages.
         * @param message Stair message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Types.IStair, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Stair message, length delimited. Does not implicitly {@link Types.Stair.verify|verify} messages.
         * @param message Stair message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Types.IStair, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Stair message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Stair
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Types.Stair;

        /**
         * Decodes a Stair message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Stair
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Types.Stair;

        /**
         * Verifies a Stair message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Stair message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Stair
         */
        public static fromObject(object: { [k: string]: any }): Types.Stair;

        /**
         * Creates a plain object from a Stair message. Also converts values to other types if specified.
         * @param message Stair
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Types.Stair, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Stair to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Hole. */
    interface IHole {

        /** Hole uuid */
        uuid?: (string|null);

        /** Hole edges */
        edges?: (Types.IEdge[]|null);

        /** Hole floorHeight */
        floorHeight?: (number|null);
    }

    /** Represents a Hole. */
    class Hole implements IHole {

        /**
         * Constructs a new Hole.
         * @param [properties] Properties to set
         */
        constructor(properties?: Types.IHole);

        /** Hole uuid. */
        public uuid: string;

        /** Hole edges. */
        public edges: Types.IEdge[];

        /** Hole floorHeight. */
        public floorHeight: number;

        /**
         * Creates a new Hole instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Hole instance
         */
        public static create(properties?: Types.IHole): Types.Hole;

        /**
         * Encodes the specified Hole message. Does not implicitly {@link Types.Hole.verify|verify} messages.
         * @param message Hole message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Types.IHole, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Hole message, length delimited. Does not implicitly {@link Types.Hole.verify|verify} messages.
         * @param message Hole message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Types.IHole, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Hole message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Hole
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Types.Hole;

        /**
         * Decodes a Hole message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Hole
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Types.Hole;

        /**
         * Verifies a Hole message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Hole message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Hole
         */
        public static fromObject(object: { [k: string]: any }): Types.Hole;

        /**
         * Creates a plain object from a Hole message. Also converts values to other types if specified.
         * @param message Hole
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Types.Hole, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Hole to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** WallType enum. */
    enum WallType {
        wph = 0,
        wfirst = 1,
        wsecond = 2,
        wboth = 3,
        wnone = 4
    }

    /** Properties of a Wall. */
    interface IWall {

        /** Wall uuid */
        uuid?: (string|null);

        /** Wall edge */
        edge?: (Types.IEdge|null);

        /** Wall outEdge */
        outEdge?: (Types.IEdge|null);

        /** Wall type */
        type?: (Types.WallType|null);

        /** Wall startExtend */
        startExtend?: (number|null);

        /** Wall endExtend */
        endExtend?: (number|null);

        /** Wall depth */
        depth?: (number|null);

        /** Wall height */
        height?: (number|null);
    }

    /** Represents a Wall. */
    class Wall implements IWall {

        /**
         * Constructs a new Wall.
         * @param [properties] Properties to set
         */
        constructor(properties?: Types.IWall);

        /** Wall uuid. */
        public uuid: string;

        /** Wall edge. */
        public edge?: (Types.IEdge|null);

        /** Wall outEdge. */
        public outEdge?: (Types.IEdge|null);

        /** Wall type. */
        public type: Types.WallType;

        /** Wall startExtend. */
        public startExtend: number;

        /** Wall endExtend. */
        public endExtend: number;

        /** Wall depth. */
        public depth: number;

        /** Wall height. */
        public height: number;

        /**
         * Creates a new Wall instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Wall instance
         */
        public static create(properties?: Types.IWall): Types.Wall;

        /**
         * Encodes the specified Wall message. Does not implicitly {@link Types.Wall.verify|verify} messages.
         * @param message Wall message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Types.IWall, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Wall message, length delimited. Does not implicitly {@link Types.Wall.verify|verify} messages.
         * @param message Wall message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Types.IWall, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Wall message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Wall
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Types.Wall;

        /**
         * Decodes a Wall message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Wall
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Types.Wall;

        /**
         * Verifies a Wall message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Wall message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Wall
         */
        public static fromObject(object: { [k: string]: any }): Types.Wall;

        /**
         * Creates a plain object from a Wall message. Also converts values to other types if specified.
         * @param message Wall
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Types.Wall, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Wall to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
