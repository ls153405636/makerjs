import * as $protobuf from "protobufjs";
/** Namespace Types. */
export namespace Types {

    /** EdgeType enum. */
    enum EdgeType {
        eph = 0,
        estraight = 1,
        earc = 2
    }

    /** WallType enum. */
    enum WallType {
        wph = 0,
        wfirst = 1,
        wsecond = 2,
        wboth = 3,
        wnone = 4
    }

    /** AgainstWallType enum. */
    enum AgainstWallType {
        aw_ph = 0,
        aw_no = 1,
        aw_left = 2,
        aw_right = 3
    }

    /** StairType enum. */
    enum StairType {
        sph = 0,
        sstright = 1
    }

    /** StepNumRule enum. */
    enum StepNumRule {
        snr_ph = 0,
        snr_n = 1,
        snr_n_add_1 = 2
    }

    /** NossingType enum. */
    enum NossingType {
        nph = 0,
        nno = 1,
        ncommon = 2,
        nluxury = 3
    }

    /** ComponentType enum. */
    enum ComponentType {
        cph = 0,
        cdoor = 1,
        cwindow = 2,
        cdoor_hole = 3,
        cbeam = 4,
        cpillar = 5
    }

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

    /** Properties of an Outline. */
    interface IOutline {

        /** Outline edges */
        edges?: (Types.IEdge[]|null);
    }

    /** Represents an Outline. */
    class Outline implements IOutline {

        /**
         * Constructs a new Outline.
         * @param [properties] Properties to set
         */
        constructor(properties?: Types.IOutline);

        /** Outline edges. */
        public edges: Types.IEdge[];

        /**
         * Creates a new Outline instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Outline instance
         */
        public static create(properties?: Types.IOutline): Types.Outline;

        /**
         * Encodes the specified Outline message. Does not implicitly {@link Types.Outline.verify|verify} messages.
         * @param message Outline message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Types.IOutline, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Outline message, length delimited. Does not implicitly {@link Types.Outline.verify|verify} messages.
         * @param message Outline message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Types.IOutline, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Outline message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Outline
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Types.Outline;

        /**
         * Decodes an Outline message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Outline
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Types.Outline;

        /**
         * Verifies an Outline message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Outline message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Outline
         */
        public static fromObject(object: { [k: string]: any }): Types.Outline;

        /**
         * Creates a plain object from an Outline message. Also converts values to other types if specified.
         * @param message Outline
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Types.Outline, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Outline to JSON.
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

        /** Wall components */
        components?: (Types.IComponent[]|null);

        /** Wall holeEdge */
        holeEdge?: (Types.IEdge|null);

        /** Wall normal */
        normal?: (Types.IVector3|null);
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

        /** Wall components. */
        public components: Types.IComponent[];

        /** Wall holeEdge. */
        public holeEdge?: (Types.IEdge|null);

        /** Wall normal. */
        public normal?: (Types.IVector3|null);

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

    /** Properties of a Component. */
    interface IComponent {

        /** Component uuid */
        uuid?: (string|null);

        /** Component type */
        type?: (Types.ComponentType|null);

        /** Component width */
        width?: (number|null);

        /** Component height */
        height?: (number|null);

        /** Component depth */
        depth?: (number|null);

        /** Component offGround */
        offGround?: (number|null);

        /** Component disToStart */
        disToStart?: (number|null);

        /** Component interval */
        interval?: (number|null);

        /** Component position */
        position?: (Types.IVector3|null);

        /** Component rotation */
        rotation?: (Types.IVector3|null);
    }

    /** Represents a Component. */
    class Component implements IComponent {

        /**
         * Constructs a new Component.
         * @param [properties] Properties to set
         */
        constructor(properties?: Types.IComponent);

        /** Component uuid. */
        public uuid: string;

        /** Component type. */
        public type: Types.ComponentType;

        /** Component width. */
        public width: number;

        /** Component height. */
        public height: number;

        /** Component depth. */
        public depth: number;

        /** Component offGround. */
        public offGround: number;

        /** Component disToStart. */
        public disToStart: number;

        /** Component interval. */
        public interval: number;

        /** Component position. */
        public position?: (Types.IVector3|null);

        /** Component rotation. */
        public rotation?: (Types.IVector3|null);

        /**
         * Creates a new Component instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Component instance
         */
        public static create(properties?: Types.IComponent): Types.Component;

        /**
         * Encodes the specified Component message. Does not implicitly {@link Types.Component.verify|verify} messages.
         * @param message Component message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Types.IComponent, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Component message, length delimited. Does not implicitly {@link Types.Component.verify|verify} messages.
         * @param message Component message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Types.IComponent, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Component message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Component
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Types.Component;

        /**
         * Decodes a Component message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Component
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Types.Component;

        /**
         * Verifies a Component message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Component message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Component
         */
        public static fromObject(object: { [k: string]: any }): Types.Component;

        /**
         * Creates a plain object from a Component message. Also converts values to other types if specified.
         * @param message Component
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Types.Component, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Component to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Material. */
    interface IMaterial {
    }

    /** Represents a Material. */
    class Material implements IMaterial {

        /**
         * Constructs a new Material.
         * @param [properties] Properties to set
         */
        constructor(properties?: Types.IMaterial);

        /**
         * Creates a new Material instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Material instance
         */
        public static create(properties?: Types.IMaterial): Types.Material;

        /**
         * Encodes the specified Material message. Does not implicitly {@link Types.Material.verify|verify} messages.
         * @param message Material message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Types.IMaterial, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Material message, length delimited. Does not implicitly {@link Types.Material.verify|verify} messages.
         * @param message Material message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Types.IMaterial, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Material message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Material
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Types.Material;

        /**
         * Decodes a Material message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Material
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Types.Material;

        /**
         * Verifies a Material message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Material message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Material
         */
        public static fromObject(object: { [k: string]: any }): Types.Material;

        /**
         * Creates a plain object from a Material message. Also converts values to other types if specified.
         * @param message Material
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Types.Material, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Material to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Stair. */
    interface IStair {

        /** Stair uuid */
        uuid?: (string|null);

        /** Stair startBeamDepth */
        startBeamDepth?: (number|null);

        /** Stair exitBeamDepth */
        exitBeamDepth?: (number|null);

        /** Stair type */
        type?: (Types.StairType|null);

        /** Stair againstWallType */
        againstWallType?: (Types.AgainstWallType|null);

        /** Stair treadParameters */
        treadParameters?: (Types.ITreadParameters|null);

        /** Stair riserParameters */
        riserParameters?: (Types.IRiserParameters|null);

        /** Stair flights */
        flights?: (Types.IFlight[]|null);
    }

    /** Represents a Stair. */
    class Stair implements IStair {

        /**
         * Constructs a new Stair.
         * @param [properties] Properties to set
         */
        constructor(properties?: Types.IStair);

        /** Stair uuid. */
        public uuid: string;

        /** Stair startBeamDepth. */
        public startBeamDepth: number;

        /** Stair exitBeamDepth. */
        public exitBeamDepth: number;

        /** Stair type. */
        public type: Types.StairType;

        /** Stair againstWallType. */
        public againstWallType: Types.AgainstWallType;

        /** Stair treadParameters. */
        public treadParameters?: (Types.ITreadParameters|null);

        /** Stair riserParameters. */
        public riserParameters?: (Types.IRiserParameters|null);

        /** Stair flights. */
        public flights: Types.IFlight[];

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

    /** Properties of a Flight. */
    interface IFlight {

        /** Flight uuid */
        uuid?: (string|null);

        /** Flight stepLength */
        stepLength?: (number|null);

        /** Flight stepWidth */
        stepWidth?: (number|null);

        /** Flight stepHeight */
        stepHeight?: (number|null);

        /** Flight stepNumRule */
        stepNumRule?: (Types.StepNumRule|null);

        /** Flight stepNum */
        stepNum?: (number|null);

        /** Flight treads */
        treads?: (Types.ITread[]|null);

        /** Flight risers */
        risers?: (Types.IRiser[]|null);
    }

    /** Represents a Flight. */
    class Flight implements IFlight {

        /**
         * Constructs a new Flight.
         * @param [properties] Properties to set
         */
        constructor(properties?: Types.IFlight);

        /** Flight uuid. */
        public uuid: string;

        /** Flight stepLength. */
        public stepLength: number;

        /** Flight stepWidth. */
        public stepWidth: number;

        /** Flight stepHeight. */
        public stepHeight: number;

        /** Flight stepNumRule. */
        public stepNumRule: Types.StepNumRule;

        /** Flight stepNum. */
        public stepNum: number;

        /** Flight treads. */
        public treads: Types.ITread[];

        /** Flight risers. */
        public risers: Types.IRiser[];

        /**
         * Creates a new Flight instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Flight instance
         */
        public static create(properties?: Types.IFlight): Types.Flight;

        /**
         * Encodes the specified Flight message. Does not implicitly {@link Types.Flight.verify|verify} messages.
         * @param message Flight message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Types.IFlight, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Flight message, length delimited. Does not implicitly {@link Types.Flight.verify|verify} messages.
         * @param message Flight message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Types.IFlight, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Flight message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Flight
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Types.Flight;

        /**
         * Decodes a Flight message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Flight
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Types.Flight;

        /**
         * Verifies a Flight message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Flight message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Flight
         */
        public static fromObject(object: { [k: string]: any }): Types.Flight;

        /**
         * Creates a plain object from a Flight message. Also converts values to other types if specified.
         * @param message Flight
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Types.Flight, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Flight to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Tread. */
    interface ITread {

        /** Tread uuid */
        uuid?: (string|null);

        /** Tread stepOutline */
        stepOutline?: (Types.IOutline|null);
    }

    /** Represents a Tread. */
    class Tread implements ITread {

        /**
         * Constructs a new Tread.
         * @param [properties] Properties to set
         */
        constructor(properties?: Types.ITread);

        /** Tread uuid. */
        public uuid: string;

        /** Tread stepOutline. */
        public stepOutline?: (Types.IOutline|null);

        /**
         * Creates a new Tread instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Tread instance
         */
        public static create(properties?: Types.ITread): Types.Tread;

        /**
         * Encodes the specified Tread message. Does not implicitly {@link Types.Tread.verify|verify} messages.
         * @param message Tread message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Types.ITread, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Tread message, length delimited. Does not implicitly {@link Types.Tread.verify|verify} messages.
         * @param message Tread message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Types.ITread, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Tread message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Tread
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Types.Tread;

        /**
         * Decodes a Tread message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Tread
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Types.Tread;

        /**
         * Verifies a Tread message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Tread message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Tread
         */
        public static fromObject(object: { [k: string]: any }): Types.Tread;

        /**
         * Creates a plain object from a Tread message. Also converts values to other types if specified.
         * @param message Tread
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Types.Tread, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Tread to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TreadParameters. */
    interface ITreadParameters {

        /** TreadParameters depth */
        depth?: (number|null);

        /** TreadParameters material */
        material?: (Types.IMaterial|null);

        /** TreadParameters doubleFaceMaterial */
        doubleFaceMaterial?: (boolean|null);

        /** TreadParameters nossingType */
        nossingType?: (Types.NossingType|null);

        /** TreadParameters nossing */
        nossing?: (number|null);
    }

    /** Represents a TreadParameters. */
    class TreadParameters implements ITreadParameters {

        /**
         * Constructs a new TreadParameters.
         * @param [properties] Properties to set
         */
        constructor(properties?: Types.ITreadParameters);

        /** TreadParameters depth. */
        public depth: number;

        /** TreadParameters material. */
        public material?: (Types.IMaterial|null);

        /** TreadParameters doubleFaceMaterial. */
        public doubleFaceMaterial: boolean;

        /** TreadParameters nossingType. */
        public nossingType: Types.NossingType;

        /** TreadParameters nossing. */
        public nossing: number;

        /**
         * Creates a new TreadParameters instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TreadParameters instance
         */
        public static create(properties?: Types.ITreadParameters): Types.TreadParameters;

        /**
         * Encodes the specified TreadParameters message. Does not implicitly {@link Types.TreadParameters.verify|verify} messages.
         * @param message TreadParameters message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Types.ITreadParameters, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TreadParameters message, length delimited. Does not implicitly {@link Types.TreadParameters.verify|verify} messages.
         * @param message TreadParameters message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Types.ITreadParameters, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TreadParameters message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TreadParameters
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Types.TreadParameters;

        /**
         * Decodes a TreadParameters message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TreadParameters
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Types.TreadParameters;

        /**
         * Verifies a TreadParameters message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TreadParameters message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TreadParameters
         */
        public static fromObject(object: { [k: string]: any }): Types.TreadParameters;

        /**
         * Creates a plain object from a TreadParameters message. Also converts values to other types if specified.
         * @param message TreadParameters
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Types.TreadParameters, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TreadParameters to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Riser. */
    interface IRiser {

        /** Riser uuid */
        uuid?: (string|null);
    }

    /** Represents a Riser. */
    class Riser implements IRiser {

        /**
         * Constructs a new Riser.
         * @param [properties] Properties to set
         */
        constructor(properties?: Types.IRiser);

        /** Riser uuid. */
        public uuid: string;

        /**
         * Creates a new Riser instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Riser instance
         */
        public static create(properties?: Types.IRiser): Types.Riser;

        /**
         * Encodes the specified Riser message. Does not implicitly {@link Types.Riser.verify|verify} messages.
         * @param message Riser message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Types.IRiser, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Riser message, length delimited. Does not implicitly {@link Types.Riser.verify|verify} messages.
         * @param message Riser message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Types.IRiser, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Riser message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Riser
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Types.Riser;

        /**
         * Decodes a Riser message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Riser
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Types.Riser;

        /**
         * Verifies a Riser message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Riser message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Riser
         */
        public static fromObject(object: { [k: string]: any }): Types.Riser;

        /**
         * Creates a plain object from a Riser message. Also converts values to other types if specified.
         * @param message Riser
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Types.Riser, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Riser to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RiserParameters. */
    interface IRiserParameters {
    }

    /** Represents a RiserParameters. */
    class RiserParameters implements IRiserParameters {

        /**
         * Constructs a new RiserParameters.
         * @param [properties] Properties to set
         */
        constructor(properties?: Types.IRiserParameters);

        /**
         * Creates a new RiserParameters instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RiserParameters instance
         */
        public static create(properties?: Types.IRiserParameters): Types.RiserParameters;

        /**
         * Encodes the specified RiserParameters message. Does not implicitly {@link Types.RiserParameters.verify|verify} messages.
         * @param message RiserParameters message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Types.IRiserParameters, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RiserParameters message, length delimited. Does not implicitly {@link Types.RiserParameters.verify|verify} messages.
         * @param message RiserParameters message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Types.IRiserParameters, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RiserParameters message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RiserParameters
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Types.RiserParameters;

        /**
         * Decodes a RiserParameters message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RiserParameters
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Types.RiserParameters;

        /**
         * Verifies a RiserParameters message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RiserParameters message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RiserParameters
         */
        public static fromObject(object: { [k: string]: any }): Types.RiserParameters;

        /**
         * Creates a plain object from a RiserParameters message. Also converts values to other types if specified.
         * @param message RiserParameters
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Types.RiserParameters, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RiserParameters to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
