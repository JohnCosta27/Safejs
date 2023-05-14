import "./style.css";

const text = document.getElementById("input") as HTMLTextAreaElement;
const execute = document.getElementById("execute") as HTMLButtonElement;

// Load Web Workers
import Worker from "./worker.ts?worker";
const worker = new Worker();
console.log(worker);

function blockThread(n: number): Promise<void> {
  return new Promise((resolve) => {
    const time = new Date().getTime() + n;

    while (new Date().getTime() < time) {}

    resolve();
  });
}

/*
blockThread(2000).then(() => {
  console.log("unblock");
});
*/

execute.onclick = () => {
  console.log(text.value);
};
