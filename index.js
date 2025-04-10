const questions = [
  {
    question: "2+2",
    answer: 4,
    options: [1, 2, 3, 4],
  },
  {
    question: "2+2+2",
    answer: 6,
    options: [2, 4, 6, 8],
  },
  {
    question: "2+2+2-2",
    answer: 4,
    options: [4, 6, 0, 2],
  },
  {
    question: "What is the capital of China?",
    answer: "Beijing",
    options: ["New Delhi", "Beijing", "Kathmandu", "Islamabad"],
  },
  {
    question: "Which of the following is NOT a neighbour of India?",
    answer: "Australia",
    options: ["Pakistan", "China", "Australia", "Bhutan"],
  },
];
let randomorder = [];
let temp = [];
for (let i = 0; i < questions.length; i++) {
  randomorder.push(getrandomvalue());
}
function getrandomvalue() {
  let randomvalue = Math.floor(Math.random() * questions.length);
  if (temp.includes(randomvalue)) return getrandomvalue();
  else {
    temp.push(randomvalue);
    return randomvalue;
  }
}

let objlength;
let score = 0;
let questionnumber = 0;
console.log();

console.log(randomorder[questionnumber]);
// console.log(questionnumber)
let timer = 5;
let useranswer;
let localarr =
JSON.parse(localStorage.getItem("localarr")) !== null
? JSON.parse(localStorage.getItem("localarr"))
: [];
let obj = {};
const startquiz = document.querySelector("#startquiz");
let screen1 = document.querySelector(".screen1");
let screen2 = document.querySelector(".screen2");
let screen3 = document.querySelector(".screen3");
let questionpara = document.querySelector(".headpara");
let option = document.querySelectorAll(".option");
let options = document.querySelectorAll(".options button");
let time = document.querySelector(".time");
let scores = document.querySelector(".screen3 p span");
let input = document.querySelector("#inputsearch");
let nextquestion = document.querySelector("#nextquestion");

// console.log(option);

startquiz.addEventListener("click", (e) => {
  e.preventDefault();

  if (input.value != "") {
    // console.log(input.value)
    obj = {
      name: input.value,
      date: new Date().toLocaleString(),
      score:0,
    };
    objlength = Object.keys(obj).length;

    localarr.push(obj);
    localStorage.setItem("localarr", JSON.stringify(localarr));
    screen1.classList.add("hide");
    screen2.classList.remove("hide");

    showquestionnumber();

    let interval = setInterval(() => {
      if (timer == 0) {
        if (questionnumber >= questions.length - 1) {
          clearInterval(interval);
          screen3.classList.remove("hide");
          screen2.classList.add("hide");

          // questionnumber;
          randomorder[questionnumber];
          // setTimeout(() => {
          //   // screen3.classList.add("hide");
          //   // screen1.classList.remove("hide");

          //   // console.log(randomorder[questionnumber])

          //   input.value = " ";
          //   score = 0;
          //   timer = 5;
          // }, 500);
        } else {
          timer = 5;

          time.innerHTML = timer;
          ++questionnumber;
          randomorder[questionnumber];
          showquestionnumber();
          RemoveBackColor();
        }
      } else {
        time.innerHTML = timer--;
      }
    }, 1000);
  } else {
    startquiz.style.disabled = "";
  }
});

for (let i = 0; i < option.length; i++) {
  console.log(randomorder[questionnumber]);
  option[i].addEventListener("click", (e) => {
    //
    useranswer = e.target.innerHTML;

    //  useranswer.style.backgroundColor="bluevoilet"
    // console.log(typeof useranswer)
    option[i].style.disabled = "true";

    if (typeof questions[randomorder[questionnumber]].answer === "number") {
      useranswer = Number(useranswer);
    }
    if (questions[randomorder[questionnumber]].answer === useranswer) {
      // console.log("answer sahi h");
      score++;

      obj.score = score;
      localStorage.setItem("localarr", JSON.stringify(localarr));
      scores.innerHTML = score;
    }

    if (questions[randomorder[questionnumber]].answer === useranswer) {
      option[i].classList.add("green");
    } else {
      option[i].classList.add("red");
    }
  });
}

function RemoveBackColor() {
  for(let i=0;i<option.length;i++){

    option[i].classList.remove("green");
    option[i].classList.remove("red");
  }
}
function showquestionnumber() {
  // for(let i=0;i<randomorder.length;i++){
  //     console.log(randomorder[i])
  //     questionnumber=randomorder[i]
  // }
  questionpara.innerHTML = questions[randomorder[questionnumber]].question;
  for (let i = 0; i < questions.length - 1; i++) {
    // console.log(questions[questionnumber].options[i])
    option[i].innerHTML = questions[randomorder[questionnumber]].options[i];
  }
}
nextquestion.addEventListener("click", () => {
  if (questionnumber >= questions.length - 1) {
    screen3.classList.remove("hide");
    screen2.classList.add("hide");
  }
  RemoveBackColor()
  timer = 5;
  time.innerHTML = timer;
  questionnumber++;

  showquestionnumber();
});

let leaderboard = document.querySelector("#leaderboard");
let maindivboard = document.querySelector(".lead");
maindivboard.innerHTML = "";

leaderboard.addEventListener("click", () => {
  maindivboard.innerHTML = "";
  screen1.classList.add("hide");
  screen2.classList.add("hide");
  document.querySelector(".screen3").style.display="none"
  if (input.value != "") {
   
    maindivboard.style.display = "block";
    // screen1.style.display = "none";
    let getData = JSON.parse(localStorage.getItem("localarr"));
    getData.sort(function (a, b) {
      return b.score - a.score;
    });
    let table = document.createElement("table");
    table.classList.add("table");
    let maindiv = document.querySelector(".lead");
    let thead = document.createElement("thead");
    thead.classList.add("thead");
    let tr = document.createElement("tr");
    // tr.classList.add("tr")
    let th1 = document.createElement("th");
    let th2 = document.createElement("th");
    let th3 = document.createElement("th");
    th1.classList.add("th");
    th2.classList.add("th");
    th3.classList.add("th");

    th1.innerHTML = "Name";
    th2.innerHTML = "Date";
    th3.innerHTML = "Score";
    tr.append(th1, th2, th3);
    thead.append(tr);
    table.append(thead);

    let td1;
    let td2;
    let td3;

    for (let i = 0; i < getData.length; i++) {
      let tbody = document.createElement("tbody");
      tbody.classList.add("tbody");
      let tr = document.createElement("tr");
      for (j = 0; j <= i; j++) {
        td1 = document.createElement("td");
        td2 = document.createElement("td");
        td3 = document.createElement("td");

        td1.innerHTML = getData[i].name;
        td2.innerHTML = getData[i].date;
        td3.innerHTML = getData[i].score;
      }
      td1.classList.add("td");
      td2.classList.add("td");
      td3.classList.add("td");

      tr.append(td1, td2, td3);
      tbody.append(tr);
      table.append(tbody);
    }

    maindiv.append(table);
  } else {
    alert("plzz enter the text");
    screen1.classList.remove("hide")
  }
});
let logo = document.querySelector("#logo");
logo.addEventListener("click", () => {
  screen1.classList.remove("hide");
  screen2.classList.add("hide");
  screen3.classList.add("hide");
  maindivboard.classList.add("hide");
  input.value = "";
});

// random()
// let randomquestions=[]
// function random(){

//   for(let i=0;i<questions.length;i++){
//      let a=Math.floor(Math.random()*questions.length)
//      if(!randomquestions.includes(a)){
//       randomquestions.push(a)
//      }
//     else{
//       continue;
//     }

//   }
//    console.log(randomquestions)

// }
