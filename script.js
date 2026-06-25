// =========================
// MATRIX RAIN + NEON FLASH
// =========================

const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars =
"01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&*";

const fontSize = 16;

let columns =
Math.floor(
canvas.width / fontSize
);

let drops = [];

for(let i=0;i<columns;i++){
    drops[i]=1;
}

// =========================
// VISHAL INTELLIGENT FLASH
// =========================

let flashVisible = false;
let flashX = -2500;

setInterval(()=>{

    flashVisible = true;
    flashX = -2500;

},4000);

// =========================
// DRAW MATRIX
// =========================

function drawMatrix(){

    ctx.fillStyle =
    "rgba(5,1,15,0.08)";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.fillStyle =
    "#c084fc";

    ctx.font =
    fontSize +
    "px monospace";

    for(
        let i=0;
        i<drops.length;
        i++
    ){

        const text =
        chars[
        Math.floor(
        Math.random() *
        chars.length
        )];

        ctx.fillText(
            text,
            i * fontSize,
            drops[i] * fontSize
        );

        if(
        drops[i] *
        fontSize >
        canvas.height &&
        Math.random() >
        0.975
        ){
            drops[i]=0;
        }

        drops[i]++;
    }

    // =====================
    // PURPLE NEON FLASH
    // =====================

    if(flashVisible){

        ctx.save();

        ctx.globalAlpha = 0.50;

        ctx.font =
        "bold 90px Orbitron";

        ctx.fillStyle =
        "#d946ef";

        ctx.shadowColor =
        "#d946ef";

        ctx.shadowBlur = 40;

        ctx.fillText(
            "VISHAL INTELLIGENT",
            flashX,
            canvas.height/2
        );

        ctx.restore();

        flashX += 12;

        if(
        flashX >
        canvas.width + 1200
        ){
            flashVisible = false;
        }

    }

}

setInterval(
drawMatrix,
35
);

window.addEventListener(
"resize",
()=>{

    canvas.width =
    window.innerWidth;

    canvas.height =
    window.innerHeight;

    columns =
    Math.floor(
    canvas.width /
    fontSize
    );

    drops=[];

    for(
    let i=0;
    i<columns;
    i++
    ){
        drops[i]=1;
    }

});

// =========================
// CALCULATOR
// =========================

const screen =
document.getElementById(
"screen"
);

const modal =
document.getElementById(
"paymentModal"
);

const premiumBox =
document.getElementById(
"premiumBox"
);

const remainingText =
document.getElementById(
"remainingText"
);

const progressBar =
document.getElementById(
"progressBar"
);

const finalResult =
document.getElementById(
"finalResult"
);

let pendingResult = "";

// =========================
// PREMIUM STORAGE
// =========================

function getPremiumCount(){

    return Number(
    localStorage.getItem(
    "premiumCount"
    )) || 0;

}

function setPremiumCount(
value
){

    localStorage.setItem(
    "premiumCount",
    value
    );

}

function updatePremiumUI(){

    let count =
    getPremiumCount();

    if(count > 0){

        premiumBox
        .classList
        .remove(
        "hidden"
        );

        remainingText
        .innerText =
        count +
        " Calculations Left";

        progressBar
        .style.width =
        (count / 5) * 100
        + "%";

    }else{

        premiumBox
        .classList
        .add(
        "hidden"
        );

    }

}

updatePremiumUI();
// =========================
// SCREEN FUNCTIONS
// =========================

function append(value){

    if(screen.value === "0"){
        screen.value = value;
    }else{
        screen.value += value;
    }

}

function clearScreen(){

    screen.value = "0";

}

function deleteLast(){

    screen.value =
    screen.value.slice(0,-1);

    if(screen.value === ""){
        screen.value = "0";
    }

}

// =========================
// CALCULATE
// =========================

function calculate(){

    try{

        const result =
        eval(screen.value);

        pendingResult =
        result;

        let count =
        getPremiumCount();

        // Premium Active

        if(count > 0){

            screen.value =
            result;

            count--;

            setPremiumCount(
            count
            );

            updatePremiumUI();

            return;

        }

        // Show Payment Modal

        showModal();

    }catch{

        screen.value =
        "Error";

    }

}

// =========================
// MODAL
// =========================

function showModal(){

    modal.classList.add(
    "show"
    );

    showStep(1);

}

function closeModal(){

    modal.classList.remove(
    "show"
    );

}

function showStep(step){

    document
    .querySelectorAll(
    "#step1,#step2,#step3,#step4"
    )
    .forEach(el=>{

        el.classList.add(
        "hidden"
        );

    });

    document
    .getElementById(
    "step"+step
    )
    .classList.remove(
    "hidden"
    );

}

// =========================
// PAY NOW
// =========================

document
.getElementById("payBtn")
.addEventListener(
"click",
()=>{

    showStep(2);

    setTimeout(()=>{

        document
        .getElementById(
        "paymentFail"
        )
        .classList.remove(
        "hidden"
        );

    },2500);

});

// =========================
// BACK BUTTON
// =========================

document
.getElementById("backBtn")
.addEventListener(
"click",
()=>{

    document
    .getElementById(
    "paymentFail"
    )
    .classList.add(
    "hidden"
    );

    showStep(1);

});

// =========================
// OTHERWISE BUTTON
// =========================

document
.getElementById("otherBtn")
.addEventListener(
"click",
()=>{

    showStep(3);

});

// =========================
// SECRET VERIFY
// =========================

document
.getElementById("verifyBtn")
.addEventListener(
"click",
()=>{

    const input =
    document
    .getElementById(
    "secretInput"
    )
    .value
    .trim()
    .toLowerCase();

    // Case insensitive

    if(
    input ===
    "vishal intelligent"
    ){

        // Unlock 5 Calculations

        setPremiumCount(5);

        updatePremiumUI();

        showStep(4);

        finalResult.innerText =
        pendingResult;

    }
    else{

        document
        .getElementById(
        "errorText"
        )
        .classList.remove(
        "hidden"
        );

        setTimeout(()=>{

            document
            .getElementById(
            "errorText"
            )
            .classList.add(
            "hidden"
            );

        },2000);

    }

});

// =========================
// CONTINUE
// =========================

document
.getElementById(
"continueBtn"
)
.addEventListener(
"click",
()=>{

    screen.value =
    pendingResult;

    closeModal();

});

// =========================
// ENTER KEY ON SECRET INPUT
// =========================

document
.getElementById(
"secretInput"
)
.addEventListener(
"keypress",
(e)=>{

    if(
    e.key === "Enter"
    ){

        document
        .getElementById(
        "verifyBtn"
        )
        .click();

    }

});

// =========================
// KEYBOARD SUPPORT
// =========================

document.addEventListener(
"keydown",
(e)=>{

    const key =
    e.key;

    if(

        (key >= "0" &&
        key <= "9")

        ||

        [
        "+",
        "-",
        "*",
        "/",
        "%",
        "."
        ]
        .includes(key)

    ){

        if(
        screen.value === "0"
        ){
            screen.value = key;
        }
        else{
            screen.value += key;
        }

    }

    if(
    key === "Enter"
    ){
        calculate();
    }

    if(
    key === "Backspace"
    ){
        deleteLast();
    }

    if(
    key === "Escape"
    ){
        clearScreen();
    }

});