/** create read update delete actions in STIM */



var init = () => {
  console.log('crud init called ');
  bindEvents();
}

// new game

let newGame = () => {
  console.log("crud_js newGame called");
  let gameTitle = window.prompt("Please input game name:", "untitled");

  var setTitleFromJson = new CustomEvent("set-game-title", {
    detail: gameTitle
  })
  window.dispatchEvent(setTitleFromJson);

  var setGameFromJsonEvt = new CustomEvent("set-game-from-json", {
    detail: "[]"
  });
  window.dispatchEvent(setGameFromJsonEvt);

}

// save game 

let saveGame = () => {
  console.log("crud_js saveGame called")
  let getGameTitleEvt = new CustomEvent("get-game-title", {
    detail: (title) => {
      saveGameWithTitle(title)
    }
  });
  window.dispatchEvent(getGameTitleEvt)
}

let saveGameWithTitle = (title) => {
  console.log("crud_js saveGameWithTitle title:", title);

  let getGameDataEvt = new CustomEvent("save-game", {
    detail: {
      title: title,
      cb: saveGameWithTitleAndData
    }
  });
  window.dispatchEvent(getGameDataEvt);

}

let saveGameWithTitleAndData = (title, data) =>{
  console.log("crud_js saveGameWithTitleAndData ", {title, data});

  localStorage.setItem(title,JSON.stringify(data));
}


// load game 
let loadGame = (gameName) => {
  let game = localStorage.getItem(gameName);
  let gameTitle = gameName;
  
  var setTitleFromJson = new CustomEvent("set-game-title", {
    detail: gameTitle
  })
  window.dispatchEvent(setTitleFromJson);

 var setGameFromJsonEvt = new CustomEvent("set-game-from-json", {
            detail: game
          });
          window.dispatchEvent(setGameFromJsonEvt);



}


// game export / import

let exportGame = (obj) => {
  console.log("export called w obj:", obj);
  var zip = new JSZip();
  var gameTitle = document.querySelector("#story-settings").dataset.title;
  // let idxHTML = document.getElementById("runtimeHTML").content.cloneNode("true");
  // let idxHTML = document.importNode(document.getElementById("runtimeHTML").content, true);


  // var promise = new Promise(function (resolve, reject) {
  //     fetch('scripts/mod/runtime.js', function (error, response, body) {
  //         if (error) {
  //           console.log("error:", error)
  //             reject(error);
  //         } else {
  //           console.log("--- resolve body", body)
  //           resolve(body);
  //         }
  //     });
  // });

  // fetch('scripts/mod/runtime.js', function (error, response, body) {
  //     console.log("ggggg body :", body)
  // });
  var scriptText = "";
  var req = new Request("scripts/mod/runtime.js")
  fetch(req).then(response => {
    return response.text()
  }).then(text => {
    console.log("###", text);
  })

  console.log("idxHTML", idxHTML)

  zip.folder('stim')
    .file('index.html', idxHTML)
    .file('stim.js', 'var stim=' + JSON.stringify(obj))
    .file('core.js', fetch(req).then(response => {
      return response.text()
    }));

  zip.generateAsync({ type: "base64" }).then(function (base64) {
    var theLink = document.createElement("a");
    theLink.setAttribute("id", "theDLLink");
    theLink.setAttribute("href", "data:application/zip;base64," + base64);
    theLink.classList.add("dl-link");
    theLink.classList.add("hidden");
    theLink.setAttribute("download", gameTitle + ".zip");
    theLink.appendChild(document.createTextNode("Click Here To Download"));
    //document.getElementsByTagName("body")[0].appendChild(theLink);
    document.querySelector("#dlbutton").innerHTML = "";
    document.getElementById('dlbutton').appendChild(theLink);
    theLink.click();
  }, function (err) {
    //jQuery("#data_uri").text(err);
    console.error("error", err);
  });

}

let importgame = (file) => {
  console.log("import called in jszip,  file:", file);
  console.log("file name", file.name);

  let gameTitle = file.name.split(".zip")[0];
  var setTitleFromJson = new CustomEvent("set-game-title", {
    detail: gameTitle
  })
  window.dispatchEvent(setTitleFromJson);


  JSZip.loadAsync(file).then(function (zip) {
    zip.forEach(function (relativePath, zipEntry) {
      console.log("zipEntry.name", zipEntry.name);
      if (zipEntry.name.includes("stim.js")) {
        zip.file(zipEntry.name).async("string").then(function (str) {
          console.log("str:", str);
          var jsonString = str.split('var stim=')[1];
          console.log("jsonString:", jsonString);
          //ibrpg.world = JSON.parse(jsonString);
          //ibrpg.cy.json(ibrpg.world.cy);
          //ibrpg.displayWorld();
          //return jsonString;
          //set-game-from-json
          var setGameFromJsonEvt = new CustomEvent("set-game-from-json", {
            detail: jsonString
          });
          window.dispatchEvent(setGameFromJsonEvt);
        });

      }
    }
    );
  });
};




let newSTIM = () => {
  console.log("crud newSTIM called");

  newGame();
}

let saveSTIM = () => {
  console.log("crud saveSTIM called");

  saveGame();
}

let loadSTIM = () => {
  console.log("crud loadSTIM");
  loadGame(prompt("load game name:","untitled"));
}

let exportHTML = () => {
  console.log("crud exportHTML");
  // exportGame({ name: 'stim' });

  let evt_export_HTML = new CustomEvent("export-game", {
    detail: exportGame
  });
  window.dispatchEvent(evt_export_HTML);



}

let importHTML = () => {
  console.log('crud importHTML');
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


document.getElementById("file").addEventListener("change", function (evt) {
  console.log("change evt:", evt)
  var files = evt.target.files;
  for (var i = 0; i < files.length; i++) {
    console.log("file:", files[i]);
    // ibrpg.importWorld(files[i]);
    importgame(files[i]);

  }
});


/** templates  */

let idxHTML = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>STIM: Runtime demo</title>
    <script src="https://unpkg.com/torus-dom/dist/index.min.js">

	</script>
    <link href="style.css" rel="stylesheet" type="text/css" />
  </head>
  <body>
    <div id="game"></div>
    <script src="core.js" type="module"></script>
    <script src="stim.js"></script>
  </body>
</html>
`;



export default {
  init
}