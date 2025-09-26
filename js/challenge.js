

const counter = document.getElementById("counter");
const minusBtn = document.getElementById("minus");
const plusBtn = document.getElementById("plus");
const heartBtn = document.getElementById("heart");
const pauseBtn = document.getElementById("pause");
const likesList = document.querySelector(".likes");
const commentForm = document.getElementById("comment-form");
const commentList = document.getElementById("list");


let count = 0;
let paused = false;
let timer = setInterval(updateCounter, 1000);


function updateCounter() {
  if (!paused) {
    count++;
    counter.textContent = count;
  }
}


plusBtn.addEventListener("click", () => {
  count++;
  counter.textContent = count;
});
minusBtn.addEventListener("click", () => {
  count--;
  counter.textContent = count;
});


heartBtn.addEventListener("click", () => {
  let existing = document.getElementById(`like-${count}`);
  if (existing) {
    let newTotal = parseInt(existing.dataset.count) + 1;
    existing.dataset.count = newTotal;
    existing.textContent = `${count} has been liked ${newTotal} times`;
  } else {
    let li = document.createElement("li");
    li.id = `like-${count}`;
    li.dataset.count = 1;
    li.textContent = `${count} has been liked 1 time`;
    likesList.appendChild(li);
  }
});


pauseBtn.addEventListener("click", () => {
  paused = !paused;
  if (paused) {
    clearInterval(timer);
    pauseBtn.textContent = "resume";
    plusBtn.disabled = true;
    minusBtn.disabled = true;
    heartBtn.disabled = true;
  } else {
    timer = setInterval(updateCounter, 1000);
    pauseBtn.textContent = "pause";
    plusBtn.disabled = false;
    minusBtn.disabled = false;
    heartBtn.disabled = false;
  }
});


commentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let p = document.createElement("p");
  p.textContent = e.target.querySelector("#comment-input").value;
  commentList.appendChild(p);
  e.target.reset();
});

