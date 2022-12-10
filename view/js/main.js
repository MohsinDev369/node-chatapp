const chatForm = document.getElementById("chat-form");
const chatRapper = document.querySelector(".chat-messages");
const socket = io();

//get username and room from url
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
}); // console.log(username, room);

socket.emit('joinRoom', {username, room})

//msg from server
socket.on("msg", (msg) => {
  // console.log(msg);

  //taking msg and using dom selector magic to show msg
  send_Msg_to_Dom(msg);

  // scroll to bottom  when screen in full
  chatRapper.scrollTop = chatRapper.scrollHeight;
});

//Run when message is send
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = e.target.elements.msg.value;

  //triggering chatMsg event now go and catch it from server index.js line 28
  socket.emit("chatMsg", msg);

  // crear the input field
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

function send_Msg_to_Dom(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  const p = document.createElement("p");
  p.classList.add("meta");
  p.innerText = message.userName;
  p.innerHTML += `<span> ${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement("p");
  para.classList.add("text");
  para.innerText = message.text;
  div.appendChild(para);
  chatRapper.appendChild(div);
}
