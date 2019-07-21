/** event listeners */

var init = () => {
  console.log("events: init called");
  bindEvents();
}

function bindEvents(){
  
// document.getElementsByClassName('modal')[0].classList.add('is-active')
  console.log("bindEvents called");

  document.getElementById('addParagraph').addEventListener("click", function(){
    console.log("addParagraph")
    // xxxOpenModal('testing');
    //modal.onShow();
    var mshow = new Event('modal-show');
    window.dispatchEvent(mshow);
  });

  document.getElementById('modalclose').addEventListener('click', ()=>{
      // document.getElementsByClassName('modal')[0].classList.remove('is-active')
      console.log("event.js close");
      //modal.onHide()
      var mhide = new Event('modal-hide');
      window.dispatchEvent(mhide);
  });

  document.getElementById("modalcancel").addEventListener('click', () => {
      console.log("close");
      //modal.onHide()
      var mhide = new Event('modal-hide');
      window.dispatchEvent(mhide);
  });

  document.getElementById('savechanges').addEventListener('click', ()=> {
    console.log('click');

       var msave = new Event('modal-save');
      window.dispatchEvent(msave);
    //modal.saveChanges();

    // modal.onHide();

       var mhide = new Event('modal-hide');
      window.dispatchEvent(mhide);
  });

// experimental

  document.getElementById("addChoice").addEventListener("click", (evt)=>{
    // document.getElementsByClassName('modal')[1].classList.add('is-active')

  });

// document.getElementById('modal2close').addEventListener('click', ()=>{
//     // document.getElementsByClassName('modal')[1].classList.remove('is-active')
// });

}

export default {
  init,
  bindEvents
}