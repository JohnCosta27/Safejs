import "./style.css";

const text = document.getElementById("input") as HTMLTextAreaElement;
const out = document.getElementById("output") as HTMLDivElement;
const execute = document.getElementById("execute") as HTMLButtonElement;

const chan = new MessageChannel();
chan.port1.onmessage = (msg) => {
  console.log(msg);
  out.innerText = msg.data;
};

// Load Web Workers
import Worker from "./worker.ts?worker";
const worker = new Worker();
worker.postMessage("", [chan.port2]);

/*
worker.postMessage("1 + 1");
worker.postMessage(`
  function blockThread(n) {
    return new Promise((r) => {

      const time = new Date().getTime() + n;
      while (new Date().getTime() < time) {}

      r();
    })
  }
  blockThread(2000);

  100 + 200
`);
*/

execute.onclick = () => {
  worker.postMessage(text.value);
};

window.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && e.shiftKey) {
    worker.postMessage(text.value);
  }
});
