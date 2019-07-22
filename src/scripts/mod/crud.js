/** create read update delete actions in STIM */



var init = () => {
  console.log('crud init called ');
  bindEvents();
}




// game export

let exportGame = (obj) => {
  console.log("export called w obj:", obj);
  var zip = new JSZip();

  zip.folder('stim')
    .file('index.html', "<body>test</body>")
    .file('stim.js', 'var stim=' + JSON.stringify(obj))
    .file('core.js', '"corejs"');

  zip.generateAsync({ type: "base64" }).then(function (base64) {
    var theLink = document.createElement("a");
    theLink.setAttribute("id", "theDLLink");
    theLink.setAttribute("href", "data:application/zip;base64," + base64);
    theLink.classList.add("dl-link");
    theLink.classList.add("hidden");
    theLink.setAttribute("download", obj.name + ".zip");
    theLink.appendChild(document.createTextNode("Click Here To Download"));
    //document.getElementsByTagName("body")[0].appendChild(theLink);
    document.getElementById('dlbutton').appendChild(theLink);
    theLink.click();
  }, function (err) {
    //jQuery("#data_uri").text(err);
    console.error("error", err);
  });

}

let importgame = (file) => {
  console.log("import called in jszip,  file:", file);
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
}

let saveSTIM = () => {
  console.log("crud saveSTIM called");
}

let loadSTIM = () => {
  console.log("crud loadSTIM");
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



export default {
  init
}