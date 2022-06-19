export class Circle {
    constructor(x, y, radius, color, dx, dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.dx = dx;
        this.dy = dy;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update(ctx, width, height, quantity,velocity) {
        if (this.x + this.radius > width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += 0.05*velocity * this.dx;
        this.y += 0.05*velocity * this.dy;

        if (this.radius >= 1) this.radius -= 0.1 / quantity
        this.draw(ctx);
    }
}

export const state = {
    circlesArray: [],
    isMouseClicked: false,
    mouseEvent: {
        x: 0, y: 0
    },
    colors: ['#e63946', '#f1faee', '#a8dadc', '#457b9d', '#1d3557'],
    particlesAmount: 3,
    particlesVelocity: 25,
    showVectors: false,
    vectorRandomness: 50,
    vectorMouseRadius: 0,
    showParticlesShadow: false,
    showVectorsShadow: false,
    particlesShadowBlur: 0,
    vectorsShadowBlur: 0,
    rotate: false,
    rotationAngle: 0,
    rotationSpeed: 5,
    rotationDirection: 1,
}

export const setDefaultValues = (val) => {
    state.particlesAmount = +val.particlesAmount;
    state.particlesVelocity = +val.particlesVelocity;
    state.vectorRandomness = +val.vectorRandomness;
    state.particlesShadowBlur = +val.particlesShadowBlur;
    state.vectorsShadowBlur = +val.vectorsShadowBlur;
    state.rotationSpeed = +val.rotationSpeed;
}

export const resetCircleArray = () => state.circlesArray = []
export const setMouseClicked = (bool) => state.isMouseClicked = bool;

export const setParticlesAmount = (amount) => state.particlesAmount = amount;
export const setParticlesVelocity = (amount) => state.particlesVelocity = amount;

export const setShowVectors = (bool) => state.showVectors = bool;
export const setVectorRandomness = (val) => state.vectorRandomness = val;
export const setVectorMouseRadius = (val) => state.vectorMouseRadius = val;

export const setShowParticlesShadow = (bool) => state.showParticlesShadow = bool;
export const setShowVectorsShadow = (bool) => state.showVectorsShadow = bool;
export const setParticlesShadowBlur = (val) => state.particlesShadowBlur = val;
export const setVectorsShadowBlur = (val) => state.vectorsShadowBlur = val;

export const setRotate = (bool) => state.rotate = bool;
export const setRotationAngle = (val) => state.rotationAngle = val;
export const setRotationSpeed = (val) => state.rotationSpeed = val;
export const setRotationDirection = (val) => state.rotationDirection = val;

export default state