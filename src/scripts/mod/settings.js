/** STIM game and app settings **/

// todo move this to a torus module

let gameSettings = {
  title: "unnamed"
}

var init = () => {
  console.log("settings init called.");
  updateSettingsTag();
  bindEvents();
}

let bindEvents = () => {
  document.querySelector("#story-settings").addEventListener("click", (evt)=> {
    console.log("story-settings click");

    document.querySelector("#game-title").value = gameSettings.title;

    document.querySelector("#settings-modal").classList.add("is-active");

  });

  document.querySelectorAll("#settings-modal .delete, #settings-modal .btn-cancel").forEach((itm)=>{
    itm.addEventListener("click", ()=> {
      document.querySelector("#settings-modal").classList.remove('is-active');
    })
  });

  document.querySelector("#settings-modal .is-success").addEventListener('click', ()=> {
    console.log("save game settings");

    gameSettings.title = document.querySelector("#game-title").value;
    updateSettingsTag();

    document.querySelector("#settings-modal").classList.remove('is-active');
  });


}

  let updateSettingsTag = () => {
    document.querySelector("#story-settings").dataset.title = gameSettings.title;
  }

  let setGameTitle = (title) => {
    gameSettings.title = title;
    updateSettingsTag();
  }

export default {
  init, gameSettings, setGameTitle
}