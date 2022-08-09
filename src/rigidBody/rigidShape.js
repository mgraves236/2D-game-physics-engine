/**
 * Abstract class that represents a rigid body
 * @class RigidShape
 */
export class RigidShape {
    /**
     * Constructor of RigidShape class,
     * create an object with the center of mass defined by a vector
     * @param {Vector} massCenter point at which center of mass is located
     */
    constructor(massCenter) {
        this.massCenter = massCenter;
        this.angle = 0;
        _engine.Core.mAllObjects.push(this); /* TODO push in constructors of other classes*/

    }
}