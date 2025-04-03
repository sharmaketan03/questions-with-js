const arr = [
  {
    question: "2+2",
    a: "4",
    option: ["2", "4", "6", "8"],
  },
  {
    question: "2+2+2",
    a: "6",
    option: ["10", "12", "13", "1"],
  },
  {
    question: "2+2+2*2",
    a: "8",
    option: ["2", "4", "6", "8"],
  },
];
let question = document.createElement("h2");

let quiz = document.querySelector("#start");
let divmain = document.querySelector(".value");

quiz.addEventListener("click", () => {
  quiz.style.display = "none";
  divmain.style .display="block"
  let i = 0;
  let interval = setInterval(() => {
    if (i < arr.length) {
      Insertvalues(i);

      ++i;
    } else {
      clearInterval(interval);
    }
  }, 2000);
  function Insertvalues(i) {
    divmain.innerHTML = " ";
  
    divmain.append(question);
    question.innerHTML = arr[i].question;
    arr[i].option.forEach(function (value, index) {
      let button = document.createElement("button");
        button.innerHTML = value;
        button.classList.add("btn")
        divmain.append(button);
       indexing(i)
       console.log(i)
    });
    
  }
  function indexing(i){

      //  button.addEventListener("click",()=>{
      //       // console.log(i)
      //  })
  }
});
