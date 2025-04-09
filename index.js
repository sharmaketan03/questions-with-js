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
let objlength;
let score = 0;
let questionnumber = 0;
let timer = 5;
let localarr = JSON.parse(localStorage.getItem("localarr"))?JSON.parse(localStorage.getItem("localarr")):[];
let obj = {};
const startquiz = document.querySelector("#startquiz");
let screen1 = document.querySelector(".screen1");
let screen2 = document.querySelector(".screen2");
let screen3 = document.querySelector(".screen3");
let questionpara = document.querySelector(".headpara");
let option = document.querySelectorAll(".option");
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
      score: 0,
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
          obj.score = score;
          localStorage.setItem("localarr", JSON.stringify(localarr));
          scores.innerHTML = score;

          questionnumber = 0;

          setTimeout(() => {
            screen3.classList.add("hide");
            screen1.classList.remove("hide");

            input.value = " ";
            score = 0;
            timer = 5;
          }, 2000);
        } else {
          timer = 5;
          time.innerHTML = timer;
          questionnumber++;
          showquestionnumber();
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
  option[i].addEventListener("click", (e) => {
    let useranswer = e.target.innerHTML;
    // console.log(typeof useranswer)
    option[i].style.disabled="true"

    if (typeof questions[questionnumber].answer === "number") {
      useranswer = Number(useranswer);
    }
    if (questions[questionnumber].answer === useranswer) {
      4;
      // console.log("answer sahi h");
      score++;
    }
  });
}

function showquestionnumber() {
  maindivboard.innerHTML = "";
  questionpara.innerHTML = questions[questionnumber].question;
  for (let i = 0; i < questions.length - 1; i++) {
    // console.log(questions[questionnumber].options[i])
    option[i].innerHTML = questions[questionnumber].options[i];
  }
}
nextquestion.addEventListener("click", () => {
  timer = 5;
  time.innerHTML = timer;
  questionnumber++;
  showquestionnumber();
});

let leaderboard = document.querySelector("#leaderboard");
let maindivboard = document.querySelector(".lead");


leaderboard.addEventListener("click", () => {

  if(input.value!=""){
    maindivboard.innerHTML=""
    screen1.classList.add("hide");
    screen2.classList.add("hide");
    screen3.classList.add("hide");
    maindivboard.style.display = "block";
    screen1.style.display = "none";
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
   
  }
  else{
    alert("plzz enter the text")
  }
  
});
let logo=document.querySelector("#logo")
logo.addEventListener("click",()=>{
        screen1.classList.remove("hide")
        screen2.classList.add("hide")
        screen3.classList.add("hide")
        input.value=""
})
