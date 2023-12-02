const canvas = document.querySelector('canvas');
const body = document.querySelector('body');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth


var theColor = '';
var lineW = 5;
let prevX = null;
let prevY = null;
let draw = false;

body.style.backgroundColor = '#FFFFFFF';
var theInput = document.getElementById('favcolor');

theInput.addEventListener('input', function(){
    theColor = theInput.value;
    body.style.backgroundColor = theColor;
}, false);

const ctx = canvas.getContext('2d');
ctx.lineWidth = lineW;

document.getElementById('ageInputId').oninput = function(){
    draw = null;
    lineW = document.getElementById('ageInputId').value;
    document.getElementById('ageOutputId').innerHTML = lineW;
    ctx.lineWidth = lineW
}

let clrs = document.querySelectorAll('.clr');
clrs = Array.from(clrs);
clrs.forEach(clr => {
    clr.addEventListener('click', () => {
        ctx.strokeStyle = clr.dataset.clr;
    })
})

let clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click', () => {
    ctx.clearRect(0,0, canvas.width, canvas.height)
    clearBtn.classList.add('active');
    setTimeout(() => {
        clearBtn.classList.remove('active');
    }, 120);
});

let saveBtn = document.querySelector('.save');
saveBtn.addEventListener('click', () => {
    let data = canvas.toDataURL('image/png');
    let a = document.createElement('a')
    a.href = data;
    a.download = 'sketch.png'
    a.click();
    saveBtn.classList.add('active');
    setTimeout(() => {
        saveBtn.classList.remove('active');
    }, 120);
})

window.addEventListener('mousedown', (e) => draw = true);
window.addEventListener('mouseup', (e) => draw = false);

window.addEventListener('mousemove', (e) => {
    if(prevX == null || prevY == null || !draw) {
        prevX = e.clientX;
        prevY = e.clientY;
        return
    }

    let currentX = e.clientX;
    let currentY = e.clientY
    
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currentX, currentY);
    ctx.stroke()

    prevX = currentX;
    prevY = currentY;
})

const cKey = (letter) => {
    if(letter.key == 'c') {
        ctx.clearRect(0,0, canvas.width, canvas.height);
        return;
    }
    if(letter.key == 's') {
        let data = canvas.toDataURL('image/png');
        let a = document.createElement('a')
        a.href = data;
        a.download = 'sketch.png'
        a.click();
    }
}

document.addEventListener('keydown', cKey);