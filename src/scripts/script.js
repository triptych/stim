let modal = null;
let stim = null;
console.log("scripts.js loaded ")
import events from './mod/events.js';
import app from './mod/app.js';
import crud from './mod/crud.js';

$(() => {
  // // console.log("I'm ready! Promotion!");
  // // console.log(window.Torus);
  test();
  app.init();
  crud.init();

  stim = new app.App();
  console.log('stim: ', stim)
  modal = new app.ModalDialog();
  console.log('modal:',modal);

  $('#storyNode').append(stim.node);
  $('#modals').append(modal.node);
events.init();

})

let test = () => {
   console.log("test");
}




//event listeners

function showModal(){
  console.log('showModal called')
  modal.onShow()
}

window.addEventListener('modal-show', showModal,false);

function hideModal(){
  console.log('hideModal called');
  modal.onHide()
}

window.addEventListener('modal-hide', hideModal,false);

function saveModal(){
  console.log("saveModal called");
  modal.saveChanges();
}

window.addEventListener('modal-hide', saveModal,false);


document.querySelector("#debugmodalclose").addEventListener("click", () => {
  document.querySelector("#debugmodal").classList.remove("is-active")
})
// debug

document.querySelector('#debug-showstate').addEventListener('click', ()=>{
  let output = app.cards.serialize();
  console.log("output: ", output)
  let debugmodal = document.querySelector("#debugmodal");

  debugmodal.getElementsByClassName("box")[0].innerHTML = "<textarea rows=10>"+JSON.stringify(output)+"</textarea>";
  debugmodal.classList.add("is-active");

})
