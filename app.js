const btn = document.querySelector("button");
btn.addEventListener("click", createContainer);
let counter = 0;
const range = document.createRange();
let messageCheck = false;

// functions

function createContainer() {
  const gallery = document.querySelector(".gallery");
  // create container html
  const htmlString = `
    <div class="container ">
        <div class="box gradient item${counter}">gradient${counter}</div>
    </div>
    `;
  // converting container to node

  const container = range.createContextualFragment(htmlString);
  gallery.insertBefore(container, gallery.childNodes[0]);

  // generate gradient
  const gradient = randomGradient();
  // selecting container to inject gradient style
  const item = document.querySelector(`.item${counter}`);
  item.setAttribute("style", `background: ${gradient}`);
  item.addEventListener("click", copyGradient);
  counter++;
}

function randomColor() {
  const color = [];
  // determine 3 tones
  for (let i = 0; i < 3; i++) {
    color.push(Math.floor(Math.random() * 256));
  }
  // determine opacity
  color.push(parseFloat(Math.random() * (1 - 0.55) + 0.55).toFixed(2));
  // return color
  return `rgba(${color[0]},${color[1]},${color[2]},${color[3]})`;
}

function randomGradient() {
  const gradient = [];
  for (let i = 0; i < 2; i++) {
    gradient.push(randomColor());
  }
  return `linear-gradient(to right, ${gradient[0]}, ${gradient[1]})`;
}

function createMessage(event) {
  if (!messageCheck) {
    messageCheck = true;
    let message = `<div class="message">Gradient Copied!</div>`;
    const container = range.createContextualFragment(message);
    const parent = event.srcElement.parentElement;
    parent.append(container);
    setTimeout(function() {
      const copyMessage = document.querySelector(".message");
      parent.removeChild(copyMessage);
      messageCheck = false;
    }, 1000);
  }
}

function removeMessage(event) {
  const parent = event.srcElement.parentElement;
  parent.removeChild(parent.firstChild);
}

function copyText(event) {
  const gradient = event.srcElement.style.backgroundImage;
  const body = document.querySelector("body");
  let textArea = document.createElement("textarea");
  body.appendChild(textArea);

  textArea = document.querySelector("textArea");
  textArea.value += gradient;

  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
}

function copyGradient(event) {
  copyText(event);
  createMessage(event);
}
