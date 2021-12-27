import * as $protobuf from "protobufjs";
/** Namespace Types. */
export namespace Types {

    /** EdgeType enum. */
    enum EdgeType {
        eph = 0,
        estraight = 1,
        earc = 2,
        ebeszer = 3
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
        sstright = 1,
        sl_type = 2,
        s_small_u_type = 3,
        s_big_u_type = 4,
        s_arc_type = 5
    }

    /** Side enum. */
    enum Side {
        si_ph = 0,
        si_left = 1,
        si_right = 2
    }

    /** LandingCutType enum. */
    enum LandingCutType {
        lct_ph = 0,
        lct_first = 1,
        lct_second = 2,
        lct_third = 3,
        lct_fourth = 4,
        lct_fifth = 5
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

    /** BigColumnPosType enum. */
    enum BigColumnPosType {
        bcp_ph = 0,
        bcp_floor = 1,
        bcp_first = 2,
        bcp_second = 3
    }

    /** BigColumnType enum. */
    enum BigColumnType {
        bc_ph = 0,
        bc_common = 1,
        bc_support = 2,
        bc_start = 3
    }

    /** ArrangeRule enum. */
    enum ArrangeRule {
        arph = 0,
        arrFour = 1,
        arrThree = 2,
        arrTwo = 3
    }

    /** GirderType enum. */
    enum GirderType {
        gph = 0,
        gslab = 1,
        gsaw = 2
    }

    /** TreadType enum. */
    enum TreadType {
        tph = 0,
        trect = 1,
        tStart = 2,
        tSpec = 3,
        tCor = 4,
        tArc = 5
    }

    /** StartTreadType enum. */
    enum StartTreadType {
        stph = 0,
        st_el = 1,
        st_el_2 = 2,
        st_rr = 3,
        st_rr_2 = 4
    }

    /** StartTreadShapeType enum. */
    enum StartTreadShapeType {
        stsph = 0,
        sts_no = 1,
        sts_left = 2,
        sts_right = 3
    }

    /** StairExitType enum. */
    enum StairExitType {
        seph = 0,
        se_riser = 1,
        se_hangingBoard = 2,
        se_none = 3
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

        /** Edge startAngle */
        startAngle?: (number|null);

        /** Edge endAngle */
        endAngle?: (number|null);

        /** Edge isClockwise */
        isClockwise?: (boolean|null);

        /** Edge controlPos */
        controlPos?: (Types.IVector3|null);
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

        /** Edge startAngle. */
        public startAngle: number;

        /** Edge endAngle. */
        public endAngle: number;

        /** Edge isClockwise. */
        public isClockwise: boolean;

        /** Edge controlPos. */
        public controlPos?: (Types.IVector3|null);

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

        /** Outline isClose */
        isClose?: (boolean|null);

        /** Outline isClock */
        isClock?: (boolean|null);
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

        /** Outline isClose. */
        public isClose: boolean;

        /** Outline isClock. */
        public isClock: boolean;

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

    /** Properties of a Border. */
    interface IBorder {

        /** Border out */
        out?: (Types.ISideEdges[]|null);

        /** Border in */
        "in"?: (Types.ISideEdges[]|null);

        /** Border front */
        front?: (Types.ISideEdges[]|null);

        /** Border back */
        back?: (Types.ISideEdges[]|null);
    }

    /** Represents a Border. */
    class Border implements IBorder {

        /**
         * Constructs a new Border.
         * @param [properties] Properties to set
         */
        constructor(properties?: Types.IBorder);

        /** Border out. */
        public out: Types.ISideEdges[];

        /** Border in. */
        public in: Types.ISideEdges[];

        /** Border front. */
        public front: Types.ISideEdges[];

        /** Border back. */
        public back: Types.ISideEdges[];

        /**
         * Creates a new Border instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Border instance
         */
        public static create(properties?: Types.IBorder): Types.Border;

        /**
         * Encodes the specified Border message. Does not implicitly {@link Types.Border.verify|verify} messages.
         * @param message Border message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Types.IBorder, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Border message, length delimited. Does not implicitly {@link Types.Border.verify|verify} messages.
         * @param message Border message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Types.IBorder, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Border message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Border
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Types.Border;

        /**
         * Decodes a Border message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Border
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Types.Border;

        /**
         * Verifies a Border message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Border message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Border
         */
        public static fromObject(object: { [k: string]: any }): Types.Border;

        /**
         * Creates a plain object from a Border message. Also converts values to other types if specified.
         * @param message Border
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Types.Border, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Border to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SideEdges. */
    interface ISideEdges {

        /** SideEdges edges */
        edges?: (Types.IEdge[]|null);

        /** SideEdges totalEdge */
        totalEdge?: (Types.IEdge|null);

        /** SideEdges girders */
        girders?: (Types.IGirder[]|null);
    }

    /** Represents a SideEdges. */
    class SideEdges implements ISideEdges {

        /**
         * Constructs a new SideEdges.
         * @param [properties] Properties to set
         */
        constructor(properties?: Types.ISideEdges);

        /** SideEdges edges. */
        public edges: Types.IEdge[];

        /** SideEdges totalEdge. */
        public totalEdge?: (Types.IEdge|null);

        /** SideEdges girders. */
        public girders: Types.IGirder[];

        /**
         * Creates a new SideEdges instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SideEdges instance
         */
        public static create(properties?: Types.ISideEdges): Types.SideEdges;

        /**
         * Encodes the specified SideEdges message. Does not implicitly {@link Types.SideEdges.verify|verify} messages.
         * @param message SideEdges message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Types.ISideEdges, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SideEdges message, length delimited. Does not implicitly {@link Types.SideEdges.verify|verify} messages.
         * @param message SideEdges message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Types.ISideEdges, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SideEdges message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SideEdges
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Types.SideEdges;

        /**
         * Decodes a SideEdges message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SideEdges
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Types.SideEdges;

        /**
         * Verifies a SideEdges message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SideEdges message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SideEdges
         */
        public static fromObject(object: { [k: string]: any }): Types.SideEdges;

        /**
         * Creates a plain object from a SideEdges message. Also converts values to other types if specified.
         * @param message SideEdges
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Types.SideEdges, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SideEdges to JSON.
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

        /** Material path */
        path?: (string|null);
    }

    /** Represents a Material. */
    class Material implements IMaterial {

        /**
         * Constructs a new Material.
         * @param [properties] Properties to set
         */
        constructor(properties?: Types.IMaterial);

        /** Material path. */
        public path: string;

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

        /** Stair stepParameters */
        stepParameters?: (Types.IStepParameters|null);

        /** Stair bigColParameters */
        bigColParameters?: (Types.IBigColParameters|null);

        /** Stair smallColParameters */
        smallColParameters?: (Types.ISmallColParameters|null);

        /** Stair handrailParameters */
        handrailParameters?: (Types.IHandrailParameters|null);

        /** Stair girderParameters */
        girderParameters?: (Types.IGirderParameters|null);

        /** Stair flights */
        flights?: (Types.IFlight[]|null);

        /** Stair landings */
        landings?: (Types.ILanding[]|null);

        /** Stair bigColumns */
        bigColumns?: (Types.IBigColumn[]|null);

        /** Stair smallColumns */
        smallColumns?: (Types.ISmallColumn[]|null);

        /** Stair handrails */
        handrails?: (Types.IHandrail[]|null);

        /** Stair girders */
        girders?: (Types.IGirder[]|null);

        /** Stair hangingBoard */
        hangingBoard?: (Types.IHangingBoard|null);

        /** Stair stepHeight */
        stepHeight?: (number|null);

        /** Stair position */
        position?: (Types.IVector3|null);

        /** Stair floadSide */
        floadSide?: (Types.Side|null);

        /** Stair exitType */
        exitType?: (Types.StairExitType|null);

        /** Stair inSide */
        inSide?: (Types.IStairSide|null);

        /** Stair outSide */
        outSide?: (Types.IStairSide|null);
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

        /** Stair stepParameters. */
        public stepParameters?: (Types.IStepParameters|null);

        /** Stair bigColParameters. */
        public bigColParameters?: (Types.IBigColParameters|null);

        /** Stair smallColParameters. */
        public smallColParameters?: (Types.ISmallColParameters|null);

        /** Stair handrailParameters. */
        public handrailParameters?: (Types.IHandrailParameters|null);

        /** Stair girderParameters. */
        public girderParameters?: (Types.IGirderParameters|null);

        /** Stair flights. */
        public flights: Types.IFlight[];

        /** Stair landings. */
        public landings: Types.ILanding[];

        /** Stair bigColumns. */
        public bigColumns: Types.IBigColumn[];

        /** Stair smallColumns. */
        public smallColumns: Types.ISmallColumn[];

        /** Stair handrails. */
        public handrails: Types.IHandrail[];

        /** Stair girders. */
        public girders: Types.IGirder[];

        /** Stair hangingBoard. */
        public hangingBoard?: (Types.IHangingBoard|null);

        /** Stair stepHeight. */
        public stepHeight: number;

        /** Stair position. */
        public position?: (Types.IVector3|null);

        /** Stair floadSide. */
        public floadSide: Types.Side;

        /** Stair exitType. */
        public exitType: Types.StairExitType;

        /** Stair inSide. */
        public inSide?: (Types.IStairSide|null);

        /** Stair outSide. */
        public outSide?: (Types.IStairSide|null);

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

    /** Properties of a StairSide. */
    interface IStairSide {

        /** StairSide sideName */
        sideName?: (string|null);

        /** StairSide handrailExit */
        handrailExit?: (boolean|null);

        /** StairSide startBigColExit */
        startBigColExit?: (boolean|null);
    }

    /** Represents a StairSide. */
    class StairSide implements IStairSide {

        /**
         * Constructs a new StairSide.
         * @param [properties] Properties to set
         */
        constructor(properties?: Types.IStairSide);

        /** StairSide sideName. */
        public sideName: string;

        /** StairSide handrailExit. */
        public handrailExit: boolean;

        /** StairSide startBigColExit. */
        public startBigColExit: boolean;

        /**
         * Creates a new StairSide instance using the specified properties.
         * @param [properties] Properties to set
         * @returns StairSide instance
         */
        public static create(properties?: Types.IStairSide): Types.StairSide;

        /**
         * Encodes the specified StairSide message. Does not implicitly {@link Types.StairSide.verify|verify} messages.
         * @param message StairSide message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Types.IStairSide, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified StairSide message, length delimited. Does not implicitly {@link Types.StairSide.verify|verify} messages.
         * @param message StairSide message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Types.IStairSide, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a StairSide message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns StairSide
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Types.StairSide;

        /**
         * Decodes a StairSide message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns StairSide
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Types.StairSide;

        /**
         * Verifies a StairSide message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a StairSide message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns StairSide
         */
        public static fromObject(object: { [k: string]: any }): Types.StairSide;

        /**
         * Creates a plain object from a StairSide message. Also converts values to other types if specified.
         * @param message StairSide
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Types.StairSide, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this StairSide to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a HangingBoard. */
    interface IHangingBoard {

        /** HangingBoard uuid */
        uuid?: (string|null);

        /** HangingBoard depth */
        depth?: (number|null);

        /** HangingBoard width */
        width?: (number|null);

        /** HangingBoard height */
        height?: (number|null);

        /** HangingBoard position */
        position?: (Types.IVector3|null);

        /** HangingBoard widthVec */
        widthVec?: (Types.IVector3|null);

        /** HangingBoard depthVec */
        depthVec?: (Types.IVector3|null);
    }

    /** Represents a HangingBoard. */
    class HangingBoard implements IHangingBoard {

        /**
         * Constructs a new HangingBoard.
         * @param [properties] Properties to set
         */
        constructor(properties?: Types.IHangingBoard);

        /** HangingBoard uuid. */
        public uuid: string;

        /** HangingBoard depth. */
        public depth: number;

        /** HangingBoard width. */
        public width: number;

        /** HangingBoard height. */
        public height: number;

        /** HangingBoard position. */
        public position?: (Types.IVector3|null);

        /** HangingBoard widthVec. */
        public widthVec?: (Types.IVector3|null);

        /** HangingBoard depthVec. */
        public depthVec?: (Types.IVector3|null);

        /**
         * Creates a new HangingBoard instance using the specified properties.
         * @param [properties] Properties to set
         * @returns HangingBoard instance
         */
        public static create(properties?: Types.IHangingBoard): Types.HangingBoard;

        /**
         * Encodes the specified HangingBoard message. Does not implicitly {@link Types.HangingBoard.verify|verify} messages.
         * @param message HangingBoard message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Types.IHangingBoard, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified HangingBoard message, length delimited. Does not implicitly {@link Types.HangingBoard.verify|verify} messages.
         * @param message HangingBoard message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Types.IHangingBoard, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a HangingBoard message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns HangingBoard
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Types.HangingBoard;

        /**
         * Decodes a HangingBoard message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns HangingBoard
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Types.HangingBoard;

        /**
         * Verifies a HangingBoard message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a HangingBoard message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns HangingBoard
         */
        public static fromObject(object: { [k: string]: any }): Types.HangingBoard;

        /**
         * Creates a plain object from a HangingBoard message. Also converts values to other types if specified.
         * @param message HangingBoard
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Types.HangingBoard, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this HangingBoard to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Flight. */
    interface IFlight {

        /** Flight uuid */
        uuid?: (string|null);

        /** Flight stepHeight */
        stepHeight?: (number|null);

        /** Flight stepParameters */
        stepParameters?: (Types.IStepParameters|null);

        /** Flight length */
        length?: (number|null);

        /** Flight treads */
        treads?: (Types.ITread[]|null);

        /** Flight risers */
        risers?: (Types.IRiser[]|null);

        /** Flight inSide */
        inSide?: (Types.IStairSide|null);

        /** Flight outSide */
        outSide?: (Types.IStairSide|null);
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

        /** Flight stepHeight. */
        public stepHeight: number;

        /** Flight stepParameters. */
        public stepParameters?: (Types.IStepParameters|null);

        /** Flight length. */
        public length: number;

        /** Flight treads. */
        public treads: Types.ITread[];

        /** Flight risers. */
        public risers: Types.IRiser[];

        /** Flight inSide. */
        public inSide?: (Types.IStairSide|null);

        /** Flight outSide. */
        public outSide?: (Types.IStairSide|null);

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

        /** Tread border */
        border?: (Types.ITreadBorder|null);

        /** Tread index */
        index?: (number|null);

        /** Tread isLast */
        isLast?: (boolean|null);

        /** Tread stepLength */
        stepLength?: (number|null);

        /** Tread stepWidth */
        stepWidth?: (number|null);

        /** Tread stepHeight */
        stepHeight?: (number|null);

        /** Tread inheritL */
        inheritL?: (boolean|null);

        /** Tread inheritH */
        inheritH?: (boolean|null);

        /** Tread inheritW */
        inheritW?: (boolean|null);

        /** Tread type */
        type?: (Types.TreadType|null);
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

        /** Tread border. */
        public border?: (Types.ITreadBorder|null);

        /** Tread index. */
        public index: number;

        /** Tread isLast. */
        public isLast: boolean;

        /** Tread stepLength. */
        public stepLength: number;

        /** Tread stepWidth. */
        public stepWidth: number;

        /** Tread stepHeight. */
        public stepHeight: number;

        /** Tread inheritL. */
        public inheritL: boolean;

        /** Tread inheritH. */
        public inheritH: boolean;

        /** Tread inheritW. */
        public inheritW: boolean;

        /** Tread type. */
        public type: Types.TreadType;

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

    /** Properties of a TreadBorder. */
    interface ITreadBorder {

        /** TreadBorder stepOutline */
        stepOutline?: (Types.IOutline|null);

        /** TreadBorder treadOutline */
        treadOutline?: (Types.IOutline|null);

        /** TreadBorder inIndex */
        inIndex?: (number[]|null);

        /** TreadBorder outIndex */
        outIndex?: (number[]|null);

        /** TreadBorder frontIndex */
        frontIndex?: (number[]|null);

        /** TreadBorder backIndex */
        backIndex?: (number[]|null);
    }

    /** Represents a TreadBorder. */
    class TreadBorder implements ITreadBorder {

        /**
         * Constructs a new TreadBorder.
         * @param [properties] Properties to set
         */
        constructor(properties?: Types.ITreadBorder);

        /** TreadBorder stepOutline. */
        public stepOutline?: (Types.IOutline|null);

        /** TreadBorder treadOutline. */
        public treadOutline?: (Types.IOutline|null);

        /** TreadBorder inIndex. */
        public inIndex: number[];

        /** TreadBorder outIndex. */
        public outIndex: number[];

        /** TreadBorder frontIndex. */
        public frontIndex: number[];

        /** TreadBorder backIndex. */
        public backIndex: number[];

        /**
         * Creates a new TreadBorder instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TreadBorder instance
         */
        public static create(properties?: Types.ITreadBorder): Types.TreadBorder;

        /**
         * Encodes the specified TreadBorder message. Does not implicitly {@link Types.TreadBorder.verify|verify} messages.
         * @param message TreadBorder message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Types.ITreadBorder, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TreadBorder message, length delimited. Does not implicitly {@link Types.TreadBorder.verify|verify} messages.
         * @param message TreadBorder message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Types.ITreadBorder, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TreadBorder message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TreadBorder
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Types.TreadBorder;

        /**
         * Decodes a TreadBorder message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TreadBorder
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Types.TreadBorder;

        /**
         * Verifies a TreadBorder message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TreadBorder message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TreadBorder
         */
        public static fromObject(object: { [k: string]: any }): Types.TreadBorder;

        /**
         * Creates a plain object from a TreadBorder message. Also converts values to other types if specified.
         * @param message TreadBorder
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Types.TreadBorder, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TreadBorder to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a StepParameters. */
    interface IStepParameters {

        /** StepParameters stepLength */
        stepLength?: (number|null);

        /** StepParameters stepWidth */
        stepWidth?: (number|null);

        /** StepParameters stepNumRule */
        stepNumRule?: (Types.StepNumRule|null);

        /** StepParameters stepNum */
        stepNum?: (number|null);
    }

    /** Represents a StepParameters. */
    class StepParameters implements IStepParameters {

        /**
         * Constructs a new StepParameters.
         * @param [properties] Properties to set
         */
        constructor(properties?: Types.IStepParameters);

        /** StepParameters stepLength. */
        public stepLength: number;

        /** StepParameters stepWidth. */
        public stepWidth: number;

        /** StepParameters stepNumRule. */
        public stepNumRule: Types.StepNumRule;

        /** StepParameters stepNum. */
        public stepNum: number;

        /**
         * Creates a new StepParameters instance using the specified properties.
         * @param [properties] Properties to set
         * @returns StepParameters instance
         */
        public static create(properties?: Types.IStepParameters): Types.StepParameters;

        /**
         * Encodes the specified StepParameters message. Does not implicitly {@link Types.StepParameters.verify|verify} messages.
         * @param message StepParameters message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Types.IStepParameters, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified StepParameters message, length delimited. Does not implicitly {@link Types.StepParameters.verify|verify} messages.
         * @param message StepParameters message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Types.IStepParameters, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a StepParameters message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns StepParameters
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Types.StepParameters;

        /**
         * Decodes a StepParameters message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns StepParameters
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Types.StepParameters;

        /**
         * Verifies a StepParameters message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a StepParameters message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns StepParameters
         */
        public static fromObject(object: { [k: string]: any }): Types.StepParameters;

        /**
         * Creates a plain object from a StepParameters message. Also converts values to other types if specified.
         * @param message StepParameters
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Types.StepParameters, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this StepParameters to JSON.
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

        /** TreadParameters sideNossing */
        sideNossing?: (number|null);
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

        /** TreadParameters sideNossing. */
        public sideNossing: number;

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

    /** Properties of a Landing. */
    interface ILanding {

        /** Landing uuid */
        uuid?: (string|null);

        /** Landing type */
        type?: (Types.LandingCutType|null);

        /** Landing treads */
        treads?: (Types.ITread[]|null);

        /** Landing risers */
        risers?: (Types.IRiser[]|null);

        /** Landing oppoBigCol */
        oppoBigCol?: (Types.IBigColumn|null);

        /** Landing corBigCol */
        corBigCol?: (Types.IBigColumn|null);
    }

    /** Represents a Landing. */
    class Landing implements ILanding {

        /**
         * Constructs a new Landing.
         * @param [properties] Properties to set
         */
        constructor(properties?: Types.ILanding);

        /** Landing uuid. */
        public uuid: string;

        /** Landing type. */
        public type: Types.LandingCutType;

        /** Landing treads. */
        public treads: Types.ITread[];

        /** Landing risers. */
        public risers: Types.IRiser[];

        /** Landing oppoBigCol. */
        public oppoBigCol?: (Types.IBigColumn|null);

        /** Landing corBigCol. */
        public corBigCol?: (Types.IBigColumn|null);

        /**
         * Creates a new Landing instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Landing instance
         */
        public static create(properties?: Types.ILanding): Types.Landing;

        /**
         * Encodes the specified Landing message. Does not implicitly {@link Types.Landing.verify|verify} messages.
         * @param message Landing message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Types.ILanding, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Landing message, length delimited. Does not implicitly {@link Types.Landing.verify|verify} messages.
         * @param message Landing message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Types.ILanding, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Landing message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Landing
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Types.Landing;

        /**
         * Decodes a Landing message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Landing
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Types.Landing;

        /**
         * Verifies a Landing message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Landing message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Landing
         */
        public static fromObject(object: { [k: string]: any }): Types.Landing;

        /**
         * Creates a plain object from a Landing message. Also converts values to other types if specified.
         * @param message Landing
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Types.Landing, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Landing to JSON.
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

        /** RiserParameters riserExist */
        riserExist?: (boolean|null);

        /** RiserParameters depth */
        depth?: (number|null);

        /** RiserParameters doubleFaceMaterial */
        doubleFaceMaterial?: (boolean|null);

        /** RiserParameters material */
        material?: (Types.IMaterial|null);
    }

    /** Represents a RiserParameters. */
    class RiserParameters implements IRiserParameters {

        /**
         * Constructs a new RiserParameters.
         * @param [properties] Properties to set
         */
        constructor(properties?: Types.IRiserParameters);

        /** RiserParameters riserExist. */
        public riserExist: boolean;

        /** RiserParameters depth. */
        public depth: number;

        /** RiserParameters doubleFaceMaterial. */
        public doubleFaceMaterial: boolean;

        /** RiserParameters material. */
        public material?: (Types.IMaterial|null);

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

    /** Properties of an ObjData. */
    interface IObjData {

        /** ObjData modelPath */
        modelPath?: (string|null);

        /** ObjData imgPath */
        imgPath?: (string|null);

        /** ObjData maxPath */
        maxPath?: (string|null);
    }

    /** Represents an ObjData. */
    class ObjData implements IObjData {

        /**
         * Constructs a new ObjData.
         * @param [properties] Properties to set
         */
        constructor(properties?: Types.IObjData);

        /** ObjData modelPath. */
        public modelPath: string;

        /** ObjData imgPath. */
        public imgPath: string;

        /** ObjData maxPath. */
        public maxPath: string;

        /**
         * Creates a new ObjData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ObjData instance
         */
        public static create(properties?: Types.IObjData): Types.ObjData;

        /**
         * Encodes the specified ObjData message. Does not implicitly {@link Types.ObjData.verify|verify} messages.
         * @param message ObjData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Types.IObjData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ObjData message, length delimited. Does not implicitly {@link Types.ObjData.verify|verify} messages.
         * @param message ObjData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Types.IObjData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ObjData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ObjData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Types.ObjData;

        /**
         * Decodes an ObjData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ObjData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Types.ObjData;

        /**
         * Verifies an ObjData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ObjData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ObjData
         */
        public static fromObject(object: { [k: string]: any }): Types.ObjData;

        /**
         * Creates a plain object from an ObjData message. Also converts values to other types if specified.
         * @param message ObjData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Types.ObjData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ObjData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SmallColumn. */
    interface ISmallColumn {

        /** SmallColumn uuid */
        uuid?: (string|null);

        /** SmallColumn size */
        size?: (Types.IVector3|null);

        /** SmallColumn position */
        position?: (Types.IVector3|null);

        /** SmallColumn rotation */
        rotation?: (Types.IVector3|null);
    }

    /** Represents a SmallColumn. */
    class SmallColumn implements ISmallColumn {

        /**
         * Constructs a new SmallColumn.
         * @param [properties] Properties to set
         */
        constructor(properties?: Types.ISmallColumn);

        /** SmallColumn uuid. */
        public uuid: string;

        /** SmallColumn size. */
        public size?: (Types.IVector3|null);

        /** SmallColumn position. */
        public position?: (Types.IVector3|null);

        /** SmallColumn rotation. */
        public rotation?: (Types.IVector3|null);

        /**
         * Creates a new SmallColumn instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SmallColumn instance
         */
        public static create(properties?: Types.ISmallColumn): Types.SmallColumn;

        /**
         * Encodes the specified SmallColumn message. Does not implicitly {@link Types.SmallColumn.verify|verify} messages.
         * @param message SmallColumn message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Types.ISmallColumn, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SmallColumn message, length delimited. Does not implicitly {@link Types.SmallColumn.verify|verify} messages.
         * @param message SmallColumn message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Types.ISmallColumn, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SmallColumn message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SmallColumn
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Types.SmallColumn;

        /**
         * Decodes a SmallColumn message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SmallColumn
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Types.SmallColumn;

        /**
         * Verifies a SmallColumn message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SmallColumn message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SmallColumn
         */
        public static fromObject(object: { [k: string]: any }): Types.SmallColumn;

        /**
         * Creates a plain object from a SmallColumn message. Also converts values to other types if specified.
         * @param message SmallColumn
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Types.SmallColumn, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SmallColumn to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SmallColParameters. */
    interface ISmallColParameters {

        /** SmallColParameters source */
        source?: (Types.IObjData|null);

        /** SmallColParameters arrangeRule */
        arrangeRule?: (Types.ArrangeRule|null);

        /** SmallColParameters material */
        material?: (Types.IMaterial|null);

        /** SmallColParameters specification */
        specification?: (string|null);
    }

    /** Represents a SmallColParameters. */
    class SmallColParameters implements ISmallColParameters {

        /**
         * Constructs a new SmallColParameters.
         * @param [properties] Properties to set
         */
        constructor(properties?: Types.ISmallColParameters);

        /** SmallColParameters source. */
        public source?: (Types.IObjData|null);

        /** SmallColParameters arrangeRule. */
        public arrangeRule: Types.ArrangeRule;

        /** SmallColParameters material. */
        public material?: (Types.IMaterial|null);

        /** SmallColParameters specification. */
        public specification: string;

        /**
         * Creates a new SmallColParameters instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SmallColParameters instance
         */
        public static create(properties?: Types.ISmallColParameters): Types.SmallColParameters;

        /**
         * Encodes the specified SmallColParameters message. Does not implicitly {@link Types.SmallColParameters.verify|verify} messages.
         * @param message SmallColParameters message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Types.ISmallColParameters, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SmallColParameters message, length delimited. Does not implicitly {@link Types.SmallColParameters.verify|verify} messages.
         * @param message SmallColParameters message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Types.ISmallColParameters, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SmallColParameters message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SmallColParameters
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Types.SmallColParameters;

        /**
         * Decodes a SmallColParameters message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SmallColParameters
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Types.SmallColParameters;

        /**
         * Verifies a SmallColParameters message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SmallColParameters message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SmallColParameters
         */
        public static fromObject(object: { [k: string]: any }): Types.SmallColParameters;

        /**
         * Creates a plain object from a SmallColParameters message. Also converts values to other types if specified.
         * @param message SmallColParameters
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Types.SmallColParameters, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SmallColParameters to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BigColumn. */
    interface IBigColumn {

        /** BigColumn uuid */
        uuid?: (string|null);

        /** BigColumn position */
        position?: (Types.IVector3|null);

        /** BigColumn size */
        size?: (Types.IVector3|null);

        /** BigColumn rotation */
        rotation?: (Types.IVector3|null);

        /** BigColumn paras */
        paras?: (Types.IBigColParameters|null);

        /** BigColumn type */
        type?: (Types.BigColumnType|null);
    }

    /** Represents a BigColumn. */
    class BigColumn implements IBigColumn {

        /**
         * Constructs a new BigColumn.
         * @param [properties] Properties to set
         */
        constructor(properties?: Types.IBigColumn);

        /** BigColumn uuid. */
        public uuid: string;

        /** BigColumn position. */
        public position?: (Types.IVector3|null);

        /** BigColumn size. */
        public size?: (Types.IVector3|null);

        /** BigColumn rotation. */
        public rotation?: (Types.IVector3|null);

        /** BigColumn paras. */
        public paras?: (Types.IBigColParameters|null);

        /** BigColumn type. */
        public type: Types.BigColumnType;

        /**
         * Creates a new BigColumn instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BigColumn instance
         */
        public static create(properties?: Types.IBigColumn): Types.BigColumn;

        /**
         * Encodes the specified BigColumn message. Does not implicitly {@link Types.BigColumn.verify|verify} messages.
         * @param message BigColumn message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Types.IBigColumn, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BigColumn message, length delimited. Does not implicitly {@link Types.BigColumn.verify|verify} messages.
         * @param message BigColumn message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Types.IBigColumn, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BigColumn message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BigColumn
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Types.BigColumn;

        /**
         * Decodes a BigColumn message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BigColumn
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Types.BigColumn;

        /**
         * Verifies a BigColumn message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BigColumn message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BigColumn
         */
        public static fromObject(object: { [k: string]: any }): Types.BigColumn;

        /**
         * Creates a plain object from a BigColumn message. Also converts values to other types if specified.
         * @param message BigColumn
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Types.BigColumn, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BigColumn to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BigColParameters. */
    interface IBigColParameters {

        /** BigColParameters source */
        source?: (Types.IObjData|null);

        /** BigColParameters posType */
        posType?: (Types.BigColumnPosType|null);

        /** BigColParameters material */
        material?: (Types.IMaterial|null);

        /** BigColParameters specification */
        specification?: (string|null);
    }

    /** Represents a BigColParameters. */
    class BigColParameters implements IBigColParameters {

        /**
         * Constructs a new BigColParameters.
         * @param [properties] Properties to set
         */
        constructor(properties?: Types.IBigColParameters);

        /** BigColParameters source. */
        public source?: (Types.IObjData|null);

        /** BigColParameters posType. */
        public posType: Types.BigColumnPosType;

        /** BigColParameters material. */
        public material?: (Types.IMaterial|null);

        /** BigColParameters specification. */
        public specification: string;

        /**
         * Creates a new BigColParameters instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BigColParameters instance
         */
        public static create(properties?: Types.IBigColParameters): Types.BigColParameters;

        /**
         * Encodes the specified BigColParameters message. Does not implicitly {@link Types.BigColParameters.verify|verify} messages.
         * @param message BigColParameters message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Types.IBigColParameters, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BigColParameters message, length delimited. Does not implicitly {@link Types.BigColParameters.verify|verify} messages.
         * @param message BigColParameters message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Types.IBigColParameters, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BigColParameters message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BigColParameters
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Types.BigColParameters;

        /**
         * Decodes a BigColParameters message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BigColParameters
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Types.BigColParameters;

        /**
         * Verifies a BigColParameters message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BigColParameters message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BigColParameters
         */
        public static fromObject(object: { [k: string]: any }): Types.BigColParameters;

        /**
         * Creates a plain object from a BigColParameters message. Also converts values to other types if specified.
         * @param message BigColParameters
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Types.BigColParameters, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BigColParameters to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DxfData. */
    interface IDxfData {

        /** DxfData specification */
        specification?: (string|null);
    }

    /** Represents a DxfData. */
    class DxfData implements IDxfData {

        /**
         * Constructs a new DxfData.
         * @param [properties] Properties to set
         */
        constructor(properties?: Types.IDxfData);

        /** DxfData specification. */
        public specification: string;

        /**
         * Creates a new DxfData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DxfData instance
         */
        public static create(properties?: Types.IDxfData): Types.DxfData;

        /**
         * Encodes the specified DxfData message. Does not implicitly {@link Types.DxfData.verify|verify} messages.
         * @param message DxfData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Types.IDxfData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DxfData message, length delimited. Does not implicitly {@link Types.DxfData.verify|verify} messages.
         * @param message DxfData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Types.IDxfData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DxfData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DxfData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Types.DxfData;

        /**
         * Decodes a DxfData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DxfData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Types.DxfData;

        /**
         * Verifies a DxfData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DxfData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DxfData
         */
        public static fromObject(object: { [k: string]: any }): Types.DxfData;

        /**
         * Creates a plain object from a DxfData message. Also converts values to other types if specified.
         * @param message DxfData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Types.DxfData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DxfData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Handrail. */
    interface IHandrail {

        /** Handrail uuid */
        uuid?: (string|null);

        /** Handrail route */
        route?: (Types.IOutline|null);

        /** Handrail width */
        width?: (number|null);
    }

    /** Represents a Handrail. */
    class Handrail implements IHandrail {

        /**
         * Constructs a new Handrail.
         * @param [properties] Properties to set
         */
        constructor(properties?: Types.IHandrail);

        /** Handrail uuid. */
        public uuid: string;

        /** Handrail route. */
        public route?: (Types.IOutline|null);

        /** Handrail width. */
        public width: number;

        /**
         * Creates a new Handrail instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Handrail instance
         */
        public static create(properties?: Types.IHandrail): Types.Handrail;

        /**
         * Encodes the specified Handrail message. Does not implicitly {@link Types.Handrail.verify|verify} messages.
         * @param message Handrail message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Types.IHandrail, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Handrail message, length delimited. Does not implicitly {@link Types.Handrail.verify|verify} messages.
         * @param message Handrail message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Types.IHandrail, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Handrail message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Handrail
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Types.Handrail;

        /**
         * Decodes a Handrail message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Handrail
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Types.Handrail;

        /**
         * Verifies a Handrail message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Handrail message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Handrail
         */
        public static fromObject(object: { [k: string]: any }): Types.Handrail;

        /**
         * Creates a plain object from a Handrail message. Also converts values to other types if specified.
         * @param message Handrail
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Types.Handrail, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Handrail to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a HandrailParameters. */
    interface IHandrailParameters {

        /** HandrailParameters height */
        height?: (number|null);

        /** HandrailParameters source */
        source?: (Types.IDxfData|null);

        /** HandrailParameters material */
        material?: (Types.IMaterial|null);
    }

    /** Represents a HandrailParameters. */
    class HandrailParameters implements IHandrailParameters {

        /**
         * Constructs a new HandrailParameters.
         * @param [properties] Properties to set
         */
        constructor(properties?: Types.IHandrailParameters);

        /** HandrailParameters height. */
        public height: number;

        /** HandrailParameters source. */
        public source?: (Types.IDxfData|null);

        /** HandrailParameters material. */
        public material?: (Types.IMaterial|null);

        /**
         * Creates a new HandrailParameters instance using the specified properties.
         * @param [properties] Properties to set
         * @returns HandrailParameters instance
         */
        public static create(properties?: Types.IHandrailParameters): Types.HandrailParameters;

        /**
         * Encodes the specified HandrailParameters message. Does not implicitly {@link Types.HandrailParameters.verify|verify} messages.
         * @param message HandrailParameters message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Types.IHandrailParameters, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified HandrailParameters message, length delimited. Does not implicitly {@link Types.HandrailParameters.verify|verify} messages.
         * @param message HandrailParameters message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Types.IHandrailParameters, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a HandrailParameters message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns HandrailParameters
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Types.HandrailParameters;

        /**
         * Decodes a HandrailParameters message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns HandrailParameters
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Types.HandrailParameters;

        /**
         * Verifies a HandrailParameters message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a HandrailParameters message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns HandrailParameters
         */
        public static fromObject(object: { [k: string]: any }): Types.HandrailParameters;

        /**
         * Creates a plain object from a HandrailParameters message. Also converts values to other types if specified.
         * @param message HandrailParameters
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Types.HandrailParameters, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this HandrailParameters to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Girder. */
    interface IGirder {

        /** Girder uuid */
        uuid?: (string|null);

        /** Girder length */
        length?: (number|null);

        /** Girder borders */
        borders?: (Types.ITreadGirBorder[]|null);
    }

    /** Represents a Girder. */
    class Girder implements IGirder {

        /**
         * Constructs a new Girder.
         * @param [properties] Properties to set
         */
        constructor(properties?: Types.IGirder);

        /** Girder uuid. */
        public uuid: string;

        /** Girder length. */
        public length: number;

        /** Girder borders. */
        public borders: Types.ITreadGirBorder[];

        /**
         * Creates a new Girder instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Girder instance
         */
        public static create(properties?: Types.IGirder): Types.Girder;

        /**
         * Encodes the specified Girder message. Does not implicitly {@link Types.Girder.verify|verify} messages.
         * @param message Girder message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Types.IGirder, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Girder message, length delimited. Does not implicitly {@link Types.Girder.verify|verify} messages.
         * @param message Girder message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Types.IGirder, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Girder message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Girder
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Types.Girder;

        /**
         * Decodes a Girder message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Girder
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Types.Girder;

        /**
         * Verifies a Girder message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Girder message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Girder
         */
        public static fromObject(object: { [k: string]: any }): Types.Girder;

        /**
         * Creates a plain object from a Girder message. Also converts values to other types if specified.
         * @param message Girder
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Types.Girder, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Girder to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TreadGirBorder. */
    interface ITreadGirBorder {

        /** TreadGirBorder inEdges */
        inEdges?: (Types.IEdge[]|null);

        /** TreadGirBorder outEdges */
        outEdges?: (Types.IEdge[]|null);

        /** TreadGirBorder inTopEdges */
        inTopEdges?: (Types.IEdge[]|null);

        /** TreadGirBorder outTopEdges */
        outTopEdges?: (Types.IEdge[]|null);

        /** TreadGirBorder dir */
        dir?: (Types.IVector3|null);
    }

    /** Represents a TreadGirBorder. */
    class TreadGirBorder implements ITreadGirBorder {

        /**
         * Constructs a new TreadGirBorder.
         * @param [properties] Properties to set
         */
        constructor(properties?: Types.ITreadGirBorder);

        /** TreadGirBorder inEdges. */
        public inEdges: Types.IEdge[];

        /** TreadGirBorder outEdges. */
        public outEdges: Types.IEdge[];

        /** TreadGirBorder inTopEdges. */
        public inTopEdges: Types.IEdge[];

        /** TreadGirBorder outTopEdges. */
        public outTopEdges: Types.IEdge[];

        /** TreadGirBorder dir. */
        public dir?: (Types.IVector3|null);

        /**
         * Creates a new TreadGirBorder instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TreadGirBorder instance
         */
        public static create(properties?: Types.ITreadGirBorder): Types.TreadGirBorder;

        /**
         * Encodes the specified TreadGirBorder message. Does not implicitly {@link Types.TreadGirBorder.verify|verify} messages.
         * @param message TreadGirBorder message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Types.ITreadGirBorder, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TreadGirBorder message, length delimited. Does not implicitly {@link Types.TreadGirBorder.verify|verify} messages.
         * @param message TreadGirBorder message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Types.ITreadGirBorder, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TreadGirBorder message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TreadGirBorder
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Types.TreadGirBorder;

        /**
         * Decodes a TreadGirBorder message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TreadGirBorder
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Types.TreadGirBorder;

        /**
         * Verifies a TreadGirBorder message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TreadGirBorder message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TreadGirBorder
         */
        public static fromObject(object: { [k: string]: any }): Types.TreadGirBorder;

        /**
         * Creates a plain object from a TreadGirBorder message. Also converts values to other types if specified.
         * @param message TreadGirBorder
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Types.TreadGirBorder, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TreadGirBorder to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GirderParameters. */
    interface IGirderParameters {

        /** GirderParameters height */
        height?: (number|null);

        /** GirderParameters depth */
        depth?: (number|null);

        /** GirderParameters type */
        type?: (Types.GirderType|null);

        /** GirderParameters material */
        material?: (Types.IMaterial|null);

        /** GirderParameters fOffsetStep */
        fOffsetStep?: (number|null);

        /** GirderParameters bSuppotHeight */
        bSuppotHeight?: (number|null);

        /** GirderParameters aboveHeight */
        aboveHeight?: (number|null);
    }

    /** Represents a GirderParameters. */
    class GirderParameters implements IGirderParameters {

        /**
         * Constructs a new GirderParameters.
         * @param [properties] Properties to set
         */
        constructor(properties?: Types.IGirderParameters);

        /** GirderParameters height. */
        public height: number;

        /** GirderParameters depth. */
        public depth: number;

        /** GirderParameters type. */
        public type: Types.GirderType;

        /** GirderParameters material. */
        public material?: (Types.IMaterial|null);

        /** GirderParameters fOffsetStep. */
        public fOffsetStep: number;

        /** GirderParameters bSuppotHeight. */
        public bSuppotHeight: number;

        /** GirderParameters aboveHeight. */
        public aboveHeight: number;

        /**
         * Creates a new GirderParameters instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GirderParameters instance
         */
        public static create(properties?: Types.IGirderParameters): Types.GirderParameters;

        /**
         * Encodes the specified GirderParameters message. Does not implicitly {@link Types.GirderParameters.verify|verify} messages.
         * @param message GirderParameters message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Types.IGirderParameters, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GirderParameters message, length delimited. Does not implicitly {@link Types.GirderParameters.verify|verify} messages.
         * @param message GirderParameters message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Types.IGirderParameters, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GirderParameters message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GirderParameters
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Types.GirderParameters;

        /**
         * Decodes a GirderParameters message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GirderParameters
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Types.GirderParameters;

        /**
         * Verifies a GirderParameters message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GirderParameters message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GirderParameters
         */
        public static fromObject(object: { [k: string]: any }): Types.GirderParameters;

        /**
         * Creates a plain object from a GirderParameters message. Also converts values to other types if specified.
         * @param message GirderParameters
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Types.GirderParameters, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GirderParameters to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
