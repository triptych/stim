/** STIM JS v 0.04 8*/

// globals
let modal = null;
let stim = null;
let choicemodal = null;
let editchoicemodal = null;
let reordermodal = null;
let texteditmodal = null;

console.log("scripts.js loaded ")
import events from './mod/events.js';
import app from './mod/app.js';
import crud from './mod/crud.js';
import settings from './mod/settings.js';

$(() => {
  app.init();
  crud.init();
  settings.init();

  stim = new app.App();
  console.log('stim: ', stim)
  modal = new app.ModalDialog();
  reordermodal = new app.ReorderDialog();
  choicemodal = new app.ChoiceDialog();
  texteditmodal = new app.TextEditModalDialog();
  editchoicemodal = new app.EditChoiceDialog();
  console.log('modal:', modal);

  $('#storyNode').append(stim.node);
  $('#modals').append(modal.node);
  $('#modals').append(choicemodal.node);
  $('#modals').append(reordermodal.node);
  $('#modals').append(texteditmodal.node);
  $('#modals').append(editchoicemodal.node);  events.init();

})






//event listeners

function showModal() {
  console.log('showModal called')
  modal.onShow()
}

window.addEventListener('modal-show', showModal, false);


function showTextEditModal(evt){
  console.log("script_js showTextEditModal Called");
  console.log("evt.detail:", evt.detail);
  texteditmodal.setData(evt.detail.idx);
  texteditmodal.onShow();
}

window.addEventListener('texteditmodal-show', showTextEditModal, true);

function showChoiceEditModal(evt){
  console.log("script_js showChoiceEditModal called");
  editchoicemodal.setData(evt.detail.idx);
  editchoicemodal.onShow();
}

window.addEventListener("choiceeditmodal-show", showChoiceEditModal, true);

function showChoiceModal() {
  console.log("showChoiceModal called");
  choicemodal.onShow()
}

window.addEventListener('choicemodal-show', showChoiceModal, false);
function hideModal() {
  console.log('hideModal called');
  modal.onHide()
}

window.addEventListener('modal-hide', hideModal, false);

function saveModal() {
  console.log("saveModal called");
  modal.saveChanges();
}

window.addEventListener('modal-hide', saveModal, false);

window.addEventListener('export-game', (evt) => {
  console.log('export-game evt:', evt);
  console.log('evt.detail', evt.detail);
  evt.detail(app.cards.serialize())

}, true);

window.addEventListener('save-game', (evt)=> {
  console.log('save-game evt:', evt);
  console.log('evt.detail', evt.detail);
  evt.detail.cb(evt.detail.title, app.cards.serialize());
})


window.addEventListener("set-game-from-json", (evt) => {
  console.log('set-game-from-json');
  console.log('evt.detail', evt.detail);
  app.populateCardStore(app.cards, evt.detail);
}, true);

document.querySelector("#debugmodalclose").addEventListener("click", () => {
  document.querySelector("#debugmodal").classList.remove("is-active")
})
// debug

document.querySelector('#debug-showstate').addEventListener('click', () => {
  let output = app.cards.serialize();
  console.log("output: ", output)
  let debugmodal = document.querySelector("#debugmodal");

  debugmodal.getElementsByClassName("box")[0].innerHTML = "<textarea rows=10>" + JSON.stringify(output) + "</textarea>";
  debugmodal.classList.add("is-active");

});


document.querySelector('#debug-refresh').addEventListener('click', () => {
  stim.onRefreshAppBound();
})

window.addEventListener('get-game-title', (evt) => {
  console.log('script_js get-game-title');
  settings.getGameTitle(evt.detail)
})

window.addEventListener('set-game-title', (evt) => {
  //settings.gameSettings.title = evt.detail
  console.log("script_js set-game-title")
  settings.setGameTitle(evt.detail);
}, true);

document.querySelector("#about-stim").addEventListener("click", () => {
  window.location.href = "https://github.com/triptych/stim/blob/master/README.md"
});

document.querySelector("#reload").addEventListener('click', (evt) => {
  window.location.reload(true);
});

document.querySelector("#reorder").addEventListener('click', (evt)=> {
  console.log("reorder clicked");
  // document.querySelector("#reorder-modal").classList.add("is-active");
  reordermodal.onShow();
})




