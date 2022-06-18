const canvas = $('#canvas')[0];
const canvasContainer = $('#canvas-container');

//particles controller
const particlesQuantity = $('#particles-quantity-slider');
const particlesSpeed = $('#particles-speed-slider');

//vector controller
const vectorsCheckbox = $('#vector-checkbox');
const vectorsRadio1 = $('#random-radio');
const vectorsRadio2 = $('#mouse-radio');
const vectorsSlider = $('#vectors-slider');

//shadow controller
const particlesShadowCheckbox = $('#particles-shadow-checkbox');
const particlesShadowSlider = $('#particles-shadow-slider');
const vectorsShadowCheckbox = $('#vectors-shadow-checkbox');
const vectorsShadowSlider = $('#vectors-shadow-slider');

//rotation controller
const rotationCheckbox = $('#rotation-checkbox');
const rotationSpeedSlider = $('#rotation-speed-slider');
const rotationRadio1 = $('#clockwise-radio');
const rotationRadio2 = $('#anti-clockwise-radio');

let canvasWidth = canvasContainer.width();
let canvasHeight = canvasContainer.height();
canvas.width = canvasWidth;
canvas.height = canvasHeight;

let ctx = canvas.getContext("2d");

//window resize listener
export const restart = (handler) => {

    $(window).resize(function () {
        ctx = canvas.getContext("2d");
        canvasWidth = canvasContainer.width();
        canvasHeight = canvasContainer.height();
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        handler();
    });
}

export const defaultValues = (handler) => {
    const particlesAmount = particlesQuantity.val();
    const particlesVelocity = particlesSpeed.val();
    const vectorRandomness = vectorsSlider.val();
    const particlesShadowBlur = particlesShadowSlider.val();
    const vectorsShadowBlur = vectorsShadowSlider.val();
    const rotationSpeed = rotationSpeedSlider.val();
    handler({
        particlesAmount, particlesVelocity, vectorRandomness, particlesShadowBlur, vectorsShadowBlur, rotationSpeed
    });
}

//canvas listeners
export const canvasMouseDown = (handler) => $(canvas).mousedown(handler);
export const canvasMouseUp = (handler) => $(canvas).mouseup(handler);
export const canvasMouseMove = (handler) => $(canvas).mousemove(handler);

//PARTICLES QUANTITY SLIDER
export const particlesQtySlider = (handler) => particlesQuantity.on('input', handler);
//PARTICLES SPEED SLIDER
export const particlesSpeedSlider = (handler) => particlesSpeed.on('input', handler);

//SHOW VECTOR CHECKBOX
export const vectorsCheckHandler = (handler) => vectorsCheckbox.on('change', (e) => {
    if (e.target.checked) {
        $('#vector-radios-container').removeClass('disable')
        $('#vector-slider-container').removeClass('disable')
    } else {
        $('#vector-radios-container').addClass('disable');
        $('#vector-slider-container').addClass('disable')
    }
    handler();
});

//VECTOR SLIDER
const vectorSliderLabel = $('#vectors-slider-label');
//VECTORS TYPE RADIOS
export const randomRadio = (handler) => vectorsRadio1.on('change', () => {
    vectorSliderLabel.text("Amount")
    $('#rotation-container').removeClass('disable')
    handler();
})
export const mouseRadio = (handler) => vectorsRadio2.on('change', () => {
    vectorSliderLabel.text("Radius")
    $('#rotation-container').addClass('disable')
    handler();
});

//VECTOR SLIDER
export const vectorsAmount = (handler) => vectorsSlider.on('input', (e) => {
    if (vectorSliderLabel.text() === "Amount") handler(e.target.value, 'randomness'); else handler(e.target.value, 'mousemove');
});

//PARTICLES SHADOW CHECKBOX
export const particlesShadow = (handler) => particlesShadowCheckbox.on('change', (e) => {
    if (e.target.checked) $('#particles-shadow-container').removeClass('disable'); else $('#particles-shadow-container').addClass('disable')
    handler();
});
//PARTICLES SHADOW SLIDER
export const particlesShadowAmount = (handler) => particlesShadowSlider.on('input', handler);

//VECTOR SHADOW CHECKBOX
export const vectorsShadow = (handler) => vectorsShadowCheckbox.on('change', (e) => {
    if (e.target.checked) $('#vectors-shadow-container').removeClass('disable'); else $('#vectors-shadow-container').addClass('disable')
    handler()
});

//VECTOR SHADOW SLIDER
export const vectorsShadowAmount = (handler) => vectorsShadowSlider.on('input', handler);

//ROTATION CHECKBOX
export const rotationCheckHandler = (handler) => rotationCheckbox.on('change', (e) => {
    if (e.target.checked) {
        $('#rotation-slider-container').removeClass('disable');
        $('#rotation-radios-container').removeClass('disable');
        $('#mouse-radio-container').addClass('disable');
    } else {
        $('#rotation-slider-container').addClass('disable');
        $('#rotation-radios-container').addClass('disable');
        $('#mouse-radio-container').removeClass('disable');
    }
    handler()
});

//ROTATION SPEED SLIDER
export const rotationSpeedHandler = (handler) => rotationSpeedSlider.on('input', handler);

//ROTATION RADIOS
export const clockwiseRadio = (handler) => rotationRadio1.on('change', handler)
export const antiClockwiseRadio = (handler) => rotationRadio2.on('change', handler)

export default ctx;
export {ctx, canvasWidth, canvasHeight};