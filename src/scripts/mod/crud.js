/** create read update delete actions in STIM */

var init = () => {
  console.log('crud init called ');
  bindEvents();
}


let newSTIM = () => {
  console.log("crud newSTIM called");
}

let saveSTIM = () => {
  console.log("crud saveSTIM called");
}

let loadSTIM = () => {
  console.log("crud loadSTIM");
}

let exportHTML = () => {
  console.log("crud exportHTML");
}

let bindEvents = () => {
  document.querySelector("#newstim").addEventListener("click", () => {
    newSTIM();
  });

  document.querySelector("#savestim").addEventListener("click", () => {
    saveSTIM();
  });

  document.querySelector("#loadstim").addEventListener("click", () => {
    loadSTIM();
  });

    document.querySelector("#exportHTML").addEventListener("click", () => {
    exportHTML();
  });
}


export default {
  init
}