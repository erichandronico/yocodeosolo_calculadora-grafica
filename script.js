const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext('2d');
const equationInput = document.getElementById('equationInput');
const plotEquationButton = document.getElementById('plotEquation');

const width = canvas.width;
const height = canvas.height;
const scaleX = width / 20;
const scaleY = height / 20;

function drawAxes() {
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.strokeStyle = "#000";
    ctx.stroke();
}

function plotFunction(fn) {
    ctx.beginPath();
    ctx.moveTo(0, height / 2 - fn(-10) * scaleY);

    for (let x = -10; x <= 10; x += 0.1) {
        const y = fn(x);
        ctx.lineTo((x + 10) * scaleX, height / 2 - y * scaleY);
    }

    ctx.strokeStyle = "#f00";
    ctx.stroke();
}

function clearCanvas() {
    ctx.clearRect(0, 0, width, height);
}



function parseEquation(equation) {
    return new Function('x', 'return ' + equation.replace(/\^/g, '**'));
}

plotEquationButton.addEventListener('click', () => {
    const equation = equationInput.value.trim();
    if (equation) {
        try {
            const parsedEquation = parseEquation(equation);
            drawGraph(parsedEquation);
        } catch (error) {
            alert('La ecuación ingresada no es válida. Por favor, ingrese una ecuación válida.');
        }
    } else {
        alert('Por favor, ingrese una ecuación.');
    }
});




function drawAxisNumbers() {
    ctx.font = "12px Arial";
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";

    for (let x = -9; x <= 9; x++) {
        ctx.fillText(x, (x + 10) * scaleX - 3, height / 2 + 3);
    }

    ctx.textAlign = "right";
    ctx.textBaseline = "middle";

    for (let y = -9; y <= 9; y++) {
        if (y === 0) continue;
        ctx.fillText(-y, width / 2 - 5, (y + 10) * scaleY);
    }
}

function drawGraph(fn) {
    clearCanvas();
    drawAxes();
    drawAxisNumbers();
    plotFunction(fn);
}

drawGraph();
