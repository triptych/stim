/** core STIM runtime */

console.log("core stim runtime loaded")
// globals
let gameTitle = "Test Game";
let iterations = 0;
let showingPanel = "title";
let app = null;
let testPanel = null;
let testChoice = null;
let choices = null;

let world = [];
// events 

window.addEventListener('load', (evt) => {
  init();
})


// methods

let init = () => {
  console.log("stim init()");
  // trybox();
  //window.setInterval(trybox, 10000);
  setupWorld();
}

let setupWorld = () => {
  stim.forEach((val,idx,arr)=>{
    console.log("value:", val);
    switch(val.type){
      case 'text': 
        world[world.length] = new TextPanel(val.content.label, val.content.value)
        break;
      case 'choice':
        console.log(" setup choice:", val.content.choices);
        let choices = new ChoiceStore([]);
        val.content.choices.forEach((val, idx, arr)=>{
          choices.add(new ChoiceRecord(idx, {label: val.label, linkto: val.target}));
        })
        world[world.length] = new  ChoiceList(choices);
    }
  });

  console.log("world", world)
  world.forEach((val,idx,arr)=>{
    document.querySelector("#game").appendChild(val.node);
  })
}

let testsetupWorld = () => {
  testPanel = new TextPanel("testTitle","testContent");

choices = new ChoiceStore([
  new ChoiceRecord(1, {label: "label 1", linkto: "link 1"}),
  new ChoiceRecord(2, {label: "label 2", linkto: "link 2"})
]);

const app = new App();
  document.querySelector("#game").appendChild(testPanel.node);
  document.querySelector("#game").appendChild(app.node);
}

let trybox = () => {
  if (iterations <= 10) {
    let box = htmlToElement("<div class='fade-in one'>this is a test of the national broadcast system </div>");
    document.querySelector('#game').appendChild(box);
    iterations++;
  }


}


// utilities
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

// app 

for (const exportedName in Torus) {
  console.log("torus:", exportedName)
  window[exportedName] = Torus[exportedName];
}

class TextPanel extends Component {
  init(title, content) {
    this.title = title;
    this.content = content;

    this.render = this.render.bind(this);
  }

  compose(){
    return jdom`<div class="textpanel" id="${this.title}">
      <p>${this.content}</p>
    </div>
    `;
  }
}

class ChoicePanel extends Component {
  init(title, choiceArr) {
    this.title = title;
    this.choiceArr = choiceArr;
    this.list = new ChoiceList()
  }

  compose(){
    return jdom`
      <div class="choicepanel">
        <ul>
          <li>Choice 1</li>
          <li>Choice 2</li>
        </ul>
      </div>
    `;
  }
}

class ChoiceRecord extends Record {}

class ChoiceStore extends StoreOf(ChoiceRecord) {}

class ChoiceItem extends Component {
  init(source, removeCallback){
    //this.label = label;
    //this.linkto = linkto;
    //console.log("ChoiceItem label", this.label)
    this.removeCallback = removeCallback;
    this.bind(source, data => this.render(data));
  }
  compose(data){
    return jdom`
      <li>
        <span class="choice" data-link="${data.linkto}">${data.label}</span>
      </li>
    `;
  }
}

class ChoiceList extends ListOf(ChoiceItem) {
  compose() {
    console.log("Choicelist this", this)
    return jdom`
      <ul class="choicelist">${this.nodes}</ul>
    `;
  }
}


class App extends StyledComponent {
  init(){
    this.list = new ChoiceList(choices);
    console.log("App this.list", this.list);
  }
  compose(){
    return jdom`<div>
      ${this.list.node}
    
    </div>`;

  }
}

