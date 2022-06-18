import modelState from "./model.js";
import * as Model from "./model.js";
import ctx, * as View from "./view.js";

const init = () => {
    Model.resetCircleArray()
}
View.restart(init);
View.defaultValues((val) => Model.setDefaultValues(val))

//particles amount controller
View.particlesQtySlider(e => Model.setParticlesAmount(+e.target.value));
//particles speed controller
View.particlesSpeedSlider(e => Model.setParticlesVelocity(+e.target.value));

//Vector check box controller
View.vectorsCheckHandler(() => Model.setShowVectors(!modelState.showVectors));
//vector radios controller
View.randomRadio(() => {
    Model.setVectorRandomness(modelState.vectorMouseRadius)
    Model.setVectorMouseRadius(0)
});
View.mouseRadio(() => {
    Model.setVectorMouseRadius(modelState.vectorRandomness)
    Model.setVectorRandomness(0)
});
//vector slider controller
View.vectorsAmount((val, type) => {
    if (type === 'randomness') {
        Model.setVectorRandomness(val)
        Model.setVectorMouseRadius(0)
    } else {
        Model.setVectorRandomness(0)
        Model.setVectorMouseRadius(val)
    }
})

//shadow checkbox controllers
View.particlesShadow(() => Model.setShowParticlesShadow(!modelState.showParticlesShadow))
View.vectorsShadow(() => Model.setShowVectorsShadow(!modelState.showVectorsShadow))

//shadow slider controllers
View.particlesShadowAmount(e => Model.setParticlesShadowBlur(+e.target.value));
View.vectorsShadowAmount(e => Model.setVectorsShadowBlur(+e.target.value));

//rotation controller
View.rotationCheckHandler(() => Model.setRotate(!modelState.rotate));
View.rotationSpeedHandler(e => Model.setRotationSpeed(+e.target.value));
View.clockwiseRadio(() => Model.setRotationDirection(1));
View.antiClockwiseRadio(() => Model.setRotationDirection(-1));

const createCircles = () => {
    let x, y;
    if (modelState.rotate) {
        x = Math.random() * View.canvasWidth - View.canvasWidth / 2;
        y = Math.random() * View.canvasWidth - View.canvasWidth / 2;
    } else {
        x = Math.random() * View.canvasWidth;
        y = Math.random() * View.canvasHeight;
    }

    const dx = Math.random() * 2 - 1;
    const dy = Math.random() * 2 - 1;
    const color = modelState.colors[Math.floor(Math.random() * modelState.colors.length)];
    modelState.circlesArray.push(new Model.Circle(x, y, 10, color, dx, dy));
}

const createVectors = (circle, j) => {
    ctx.beginPath();
    ctx.moveTo(circle.x, circle.y);
    ctx.lineTo(modelState.circlesArray[j].x, modelState.circlesArray[j].y);
    ctx.strokeStyle = modelState.circlesArray[j].color;
    ctx.stroke();
    ctx.closePath();
}

View.canvasMouseDown((e) => {
    Model.setMouseClicked(true)
    modelState.mouseEvent.x = e.offsetX;
    modelState.mouseEvent.y = e.offsetY;
});
View.canvasMouseUp(() => Model.setMouseClicked(false));
View.canvasMouseMove((e) => {
    modelState.mouseEvent.x = e.offsetX
    modelState.mouseEvent.y = e.offsetY
})


const animate = () => {
    ctx.clearRect(0, 0, View.canvasWidth, View.canvasHeight);

    if (modelState.rotate) {
        ctx.save();
        ctx.translate(View.canvasWidth / 2, View.canvasHeight / 2);
        ctx.rotate(Math.PI / 180 * modelState.rotationAngle);
    }
    requestAnimationFrame(animate);
    Model.state.circlesArray.forEach((circle, index) => {
        circle.update(ctx, View.canvasWidth, View.canvasHeight, modelState.particlesAmount, modelState.particlesVelocity);

        ctx.shadowColor = 'white';
        ctx.shadowBlur = modelState.showVectorsShadow ? modelState.vectorsShadowBlur * 0.1 : 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        if (modelState.showVectors) {
            for (let j = 0; j < modelState.circlesArray.length; j++) {
                const cx = modelState.circlesArray[j].x - circle.x;
                const cy = modelState.circlesArray[j].y - circle.y;
                const distance = Math.sqrt(cx * cx + cy * cy);

                const mx = modelState.mouseEvent.x - circle.x;
                const my = modelState.mouseEvent.y - circle.y;
                const distanceMouse = Math.sqrt(mx * mx + my * my);

                if (distance < modelState.vectorRandomness) createVectors(circle, j);
                if (distance < 100 && distanceMouse < modelState.vectorMouseRadius * 4) createVectors(circle, j);
            }
        }

        if (circle.radius <= 1) modelState.circlesArray.splice(index, 1)
        ctx.shadowColor = 'white';
        ctx.shadowBlur = modelState.showParticlesShadow ? modelState.particlesShadowBlur : 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
    });

    createCircles()
    Model.setRotationAngle((modelState.rotationAngle + .005 * modelState.rotationSpeed * modelState.rotationDirection) % 360)

    if (modelState.rotate) ctx.restore();

}

animate()