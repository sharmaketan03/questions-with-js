const arr = [
  {
    question: "2+2",
    a: 4,
    option: [2, 4, 6, 8],
  },
  {
    question: "2+2+2",
    a: 6,
    option: [10, 12, 6, 1],
  },
  {
    question: "2+2+2*2",
    a: 8,
    option: [2, 4, 6, 8],
  },
];
let arrindexnumber = 0;
let timer = 5;
let useranswer = 0;
let score = 0;

//IF LS HAS SOME DATA, INITIALIZE storage WITH THAT, IF NOT, THEN INITIALIZE storage AS BLANK ARRAY
let storage =
  localStorage.getItem("storage") !== null
    ? JSON.parse(localStorage.getItem("storage"))
    : [];

let obj1 = {};
let value;
const input = document.querySelector("input");
const startbutton = document.querySelector("#startquiz");
const screen1 = document.querySelector(".screen1");
const screen2 = document.querySelector(".screen2");
const screen3 = document.querySelector(".screen3");
const questionpara = document.querySelector(".headpara");
const options = document.querySelectorAll(".option");
let timechange = document.querySelector(".time");
let mainscore = document.querySelector(".screen3 p span");
let parentdiv = document.querySelector(".wrapper");
let nextquestion=document.querySelector("#nextquestion")
console.log(nextquestion)
// console.log(mainscore);

startbutton.addEventListener("click", (e) => {
  e.preventDefault();
  // console.log(typeof input.value)
  if (input.value != "") {
    value = input.value;
    // console.log(value)

    screen1.classList.add("hide");
    screen2.classList.remove("hide");

    //PUTTING NAME, DATE, SCORE=0 IN LOCALSTORAGE
    obj1 = {
      Name: value,
      Date: new Date(),
      score: 0,
    };

    storage.push(obj1);
    localStorage.setItem("storage", JSON.stringify(storage));
    console.log(storage);

    showquestionwithanser();

    interval = setInterval(() => {
      if (timer === 0) {
        if (arrindexnumber >= arr.length-1) {
          clearInterval(interval);
          obj1.score=score
          screen2.classList.add("hide");
          screen3.classList.remove("hide");
          
          mainscore.innerText = score;
          arrindexnumber = 0;
          timer=5
          setTimeout(() => {
            screen1.classList.remove("hide");
            screen3.classList.add("hide");


            score=0
           
          }, 5000);
         
        } else {
          console.log("hello")
          timer = 5;
          arrindexnumber++;
          timechange.innerHTML = timer;
          showquestionwithanser();
        }
      } else {
        // console.log(timer)
        timechange.innerHTML = timer--;
      }

      // localstorage.setItem()
    }, 1000);
  } else {
    startbutton.disabled = "";
    // input.addEventListener("click",()=>{
    //      startbutton.disabled="false"
    // })
  }
});

function showquestionwithanser() {
  console.log(arr[arrindexnumber].question)
  questionpara.innerText = arr[arrindexnumber].question

  for (let i = 0; i < options.length; i++) {
    options[i].innerText = arr[arrindexnumber].option[i];
  }
}

for (let i = 0; i < options.length; i++) {
  options[i].addEventListener("click", (e) => {
    // console.log(e.target.innerHTML);
    useranswer = e.target.innerText;

    if (parseInt(useranswer) === arr[arrindexnumber].a) {
      score++;
      // console.log(mainscore);
    }
  });
}

function prscore(score) {
  // console.log()
  let arr = JSON.parse(localStorage.getItem("storage"));
  arr[arr.length - 1].score = score;
  console.log(arr);
  localStorage.setItem("storage", JSON.stringify(arr));
}


nextquestion.addEventListener("click",()=>{
  timer = 5;
  arrindexnumber++;
  timechange.innerHTML = timer;
  showquestionwithanser();
})
// input.value=""
// screen3.innerHTML=""
