/** Core STIM Runtime **/

console.log(" core STIM runtime");

let gameTitle = "Test Game";
let app = null;


for (const exportedName in Torus) {
  // console.log("torus:", exportedName)
  window[exportedName] = Torus[exportedName];
}


window.addEventListener('load', (evt) => {
  init();
});

let init = () => {
  console.log("init called");
  setUpWorld();
}

let setUpWorld = () => {
  let tempArr = []
  // stim comes from stim.js -- the data
  for (let el of stim) {
    //console.log("setUpWorld -> el:", el);
    tempArr[tempArr.length] = new Part(el.id, { type: el.type, content: el.content })
    if (el.type == "choice") {
      break; //stop after hitting first choice
    }
  }

  parts.reset(tempArr)

  app = new App();
  document.querySelector("#game").appendChild(app.node);


}


class Part extends Record { }

class PartStore extends StoreOf(Part) { }

const parts = new PartStore([
  // new Part(1, { type: "foo", content: {} }),
  // new Part(2, {type: "bar", content: {}})
]);


class TextPiece extends Component {
  init(content) {
    this.content = content;

  }

  compose(data) {
    // console.log("Textpiece compose data:",data);
    return jdom`
      <div class="ModTextPiece">
        ${this.content.value}
      </div>
    `;
  }
}


// class ChoicePiece extends Component {
//   init(content){
//     this.content = content;
//   }

//   compose(data){
//     console.log("Choicepiece compose data:", data);
//     console.log("Choicepiece content:", this.content);
//     return jdom`
//     <div class="ModChoicePiece">
//       [choice]
//     </div>
//     `
//   }
// }

// class OptionPiece extends Component {

// }

class PartView extends Component {
  init(source, removeCallback) {
    console.log("PartView init source:", source);
    this.type = source.data.type;
    this.piece = null;
    this.content = source.data.content;
    this.bind(source, data => this.render(data));
  }

  compose(data) {
    console.log("data:", data)
    switch (this.type) {
      case 'text':
        console.log("** set up text ")
        this.piece = new TextPiece(this.content); // replace with textView

        break;
      case 'choice':
        console.log("** set up choice ", this.content.choices);
        let choices = new ChoiceStore([]);
        this.content.choices.forEach((val, idx, arr) => {
          choices.add(new ChoiceRecord(idx, { label: val.label, linkto: val.target }));
        });
        this.piece = new ChoiceList(choices)
        //this.piece = new ChoicePiece(this.content); // replace with choiceView
        break;
      default:
        break;
    }

    // this.piece.node

    return jdom`
    <div class="piece" >
      ${this.piece.node}
    </div>
  `;
  }

}

class PartList extends ListOf(PartView) {

  compose() {
    //console.log("PartList nodes:", this.nodes);

    return jdom`
    <ul style="padding:0">${this.nodes}</ul>`;
  }
}

class App extends Component {
  init() {
    //console.log("parts", parts)
    this.list = new PartList(parts)
    //console.log("this.list", this.list)
  }

  compose() {
    return jdom`
      <div class="app">
        ${this.list.node}
      </div>
    `;
  }
}


// classes

class TextPanel extends Component {
  init(title, content) {
    this.title = title;
    this.content = content;
    this.idx = content.idx;

    this.render = this.render.bind(this);
  }

  compose() {
    return jdom`
    <div class="textpanel" id="${this.title}"
      data-idx="${this.idx}"
    >
      <p>${this.content}</p>
    </div>
    `;
  }
}

// for the choices
class ChoiceRecord extends Record { }

class ChoiceStore extends StoreOf(ChoiceRecord) { }

class ChoiceItem extends Component {
  init(source, removeCallback) {
    //this.label = label;
    //this.linkto = linkto;
    //console.log("ChoiceItem label", this.label)
    //this.removeCallback = removeCallback;
    this.boundOnChoiceClick = this.onChoiceClick.bind(this);
    this.bind(source, data => this.render(data));
    this.newPieceId = "";
    
  }

  onChoiceClick(evt) {
    // @thesephist
    // this code never runs!
    console.log("onChoiceClick clicked! evt:", evt.target);
    //alert('the event binding worked');
    let newPieceId = evt.target.dataset.link;
    console.log("newPieceId", newPieceId)
    revealNewPiece(newPieceId);
  }


  compose(data) {
    console.log("ChoiceItem : data", data)
    return jdom`
      <li>
        <a href="javascript:" 
        onclick="${this.boundOnChoiceClick}" class="choice" 
        data-link="${data.linkto}" > 
        ${data.label}</a>
      </li>
    `;
  }
}

class ChoiceList extends ListOf(ChoiceItem) {
  compose() {
    console.log("Choicelist this ---- ", this)
    return jdom`
      <ul class="choicelist" data-idx="">
        ${this.nodes}
      </ul>
    `;
  }
}


//var app2 = new App();

let revealNewPiece = (id) => {
  console.log("revealNewPiece id:", id);
  // get piece from js 
  // let newEl = stim.find((el)=>{
  //   if(el.content.label == id){
  //     return true;
  //   }
  // });
  let newElIdx = stim.findIndex((el)=> {
    if(el.content.label == id){
      return true;
    }
  })
  console.log("newEl:", newElIdx);
  // parts.add(new Part(newEl.id, { type: newEl.type, content: newEl.content }) );
  // for(let i = newElIdx; i++; i<stim.length){
  //  if(stim[i])
  //}
  let i = newElIdx;
  while(stim[i].type !="choice" && i < stim.length){
    parts.add(new Part(stim[i].id, {type: stim[i].type, content: stim[i].content}));
    i++;
  }
  if(i<stim.length){
    parts.add(new Part(stim[i].id, {type: stim[i].type, content: stim[i].content}));
  }

}

function htmlToElement(html) {
  var template = document.createElement('template');
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}

function htmlToElements(html) {
  var template = document.createElement('template');
  template.innerHTML = html;
  return template.content.childNodes;
}