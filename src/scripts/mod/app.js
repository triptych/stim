
var init = () => {
  console.log("app.js init called");
}

// move to a utility js

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



for (const exportedName in Torus) {
  //console.log("torus:", exportedName)
  window[exportedName] = Torus[exportedName];
}

class Card extends Record { }

class CardStore extends StoreOf(Card) {
  //no need for comparator
}

let populateCardStore = (store, array) => {
  console.log("populateCardStore store:", store)
  console.log("populateCardStore array:", array)
  let tempJson = JSON.parse(array);
  console.log("))))))) tempJson:", tempJson)
  let tempCardArray = [];
  for (var i = 0; i < tempJson.length; i++) {
    tempCardArray[i] = new Card(i,tempJson[i]);
  }
  store.reset(tempCardArray);


}
// const cards = new CardStore([
// new Card(1, {
//   type: 'text',
//   content: {
//     value: 'hello world'
//   }
// }),

// new Card(2, {
//   type: 'choice',
//   content: {
//     choices: [
//       { idx: 1, label: 'first', target: null },
//       { idx: 2, label: 'second', target: null }
//     ]
//   }
// }),

//   new Card(3, {
//     type: 'image',
//     content: {
//       src: "https://via.placeholder.com/150",
//       height: 150,
//       width: 150,
//       alt: "placeholder"
//     }
//   })


// ])

const cards = new CardStore([]);
// console.log("cards", cards)

class CardItem extends StyledComponent {
  init(source, removeCallback) {
    console.log("CardItem init");
    console.log("CardItem: source:", source);
    this.type = source.data.type
    this.card = null;
    this.content = source.data.content;
    this.bind(source, data => this.render(data));
  }

  compose(data) {
    // console.log("in compose, data:", data);
    // return jdom`<div>
    //   [card] ${this.type}
    // </div>
    //  `;
    switch (this.type) {
      case 'text':
        console.log("** this.content", this.content);
        this.card = new TextCard(this.content);
        // return jdom`${this.card.node}`;
        break;
      case 'image':
        this.card = new ImageCard(this.content);
        // return jdom`${this.card.node}`; 
        break;
      case 'choice':
        this.card = new ChoiceCard(this.content);
      // return jdom`${this.card.node}`;   
      default:

    }

    return jdom`<div>
    ${this.card.node}
    <hr>
    </div>
    `;
  }
}

class CardList extends ListOf(CardItem) {

  compose() {
    console.log("Cardlist nodes:", this.nodes);

    return jdom`<ul style="padding:0">${this.nodes}</ul>`;
  }
}

class App extends StyledComponent {
  init() {
    this.list = new CardList(cards)
    this.onRefreshAppBound = this.refreshApp.bind(this); 
  }

  refreshApp(){
    console.log("***refreshApp")
    this.render();
  }

  compose() {
    return jdom`
      <div>
        ${this.list.node}
      </div>
    `;
  }
}


// button actions





// Card stuff - specific types of cards

class TextCard extends Component {
  init(content) {
    // this.bind(content, props => {
    //   this.render(props);
    // })
    console.log("TextCard init [content]", content);
    this.content = content;
    this.content.hidden = false;
    this.onShow = this.onShow.bind(this);
    this.onHide = this.onHide.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.hideDown = "";
    this.hideUp = "is-hidden";
    //this.bind(content, data => this.render(data));
  }

  onDelete(){
    console.log("TextCard delete called");
    console.log("content:", this.content);
    console.log("this:", this);
    cards.remove(cards.find(this.content.idx));
  }

  onShow() {
    console.log("Textcard onShow called")
    this.content.hidden = false;
    this.hideDown = "";
    this.hideUp = "is-hidden"
    this.render();

  }

  onHide() {
    console.log("Textcard onHide called");
    this.content.hidden = true;
    this.hideDown = "is-hidden";
    this.hideUp = "";
    this.render();
  }

  compose(data) {
    console.log("-- TextCard compose data:", data);
    console.log(" -- this.content", this.content);
    return jdom`
    <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                <span class="icon">
                <i class="fas fa-paragraph"></i>
                </span> 
                ${this.content.label}
              </p>
              <a href="javascript:" class="card-header-icon" aria-label="more options"
              onclick=${this.content.hidden ? this.onShow : this.onHide}>
                <span class="icon ${this.hideDown}">
                  <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
                <span class="icon ${this.hideUp}">
                  <i class="fas fa-angle-up" aria-hidden="true"></i>
                </span>
              </a>
            </header>
            <div class="card-content ${this.hideDown}">
              <div class="content ">
              ${this.content.value}
              </div>
            </div>
            <footer class="card-footer">
              <a href="#" class="card-footer-item">Test</a>
              <a href="#" class="card-footer-item">Edit</a>
              <a href="javascript:" class="card-footer-item" onclick="${this.onDelete}">Delete</a>
            </footer>
          </div>
  `;
  }
}


// const textcard = new TextCard({});
// document.body.appendChild(textcard.node);

class ChoiceCard extends Component {

  init(content) {
    // this.bind(content, props => {
    //   this.render(props);
    // })
    console.log("Choicecard init [content]", content);
    this.content = content;
    this.content.hidden = false;
    this.onShow = this.onShow.bind(this);
    this.onHide = this.onHide.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.hideDown = "";
    this.hideUp = "is-hidden";
    //this.bind(content, data => this.render(data));
  }

 onShow() {
    console.log("Textcard onShow called")
    this.content.hidden = false;
    this.hideDown = "";
    this.hideUp = "is-hidden"
    this.render();

  }

  onHide() {
    console.log("Textcard onHide called");
    this.content.hidden = true;
    this.hideDown = "is-hidden";
    this.hideUp = "";
    this.render();
  }

  onDelete(){
    console.log("TextCard delete called");
    console.log("content:", this.content);
    console.log("this:", this);
    cards.remove(cards.find(this.content.idx));
  }

  compose(data) {
    console.log("choicecard compose - data:", data);
    //let strOptions = ``;
    let domSel = document.createElement('select');
    this.content.choices.forEach((itm,idx)=> {
      // strOptions += `<option value="${itm.label}">${itm.label}</option>`
        domSel.appendChild(htmlToElement('<option>'+ itm.label+'</option>'));
      })
    // console.log('strOptions:', strOptions);
    // let domOptions = htmlToElements(strOptions);
    console.log('domSel', domSel);

    return jdom`<div class="card">
            <header class="card-header">
              <p class="card-header-title">
                <span class="icon" >
                <i class="fas fa-list"></i>
                </span> 
                Choice: ${this.content.label}
              </p>
              <a href="javascript:" class="card-header-icon" aria-label="more options" onclick=${this.content.hidden ? this.onShow : this.onHide} >
              <span class="icon ${this.hideDown}">
              <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>
              <span class="icon ${this.hideUp}">
                  <i class="fas fa-angle-up" aria-hidden="true"></i>
                </span>
              </a>
            </header>
            <div class="card-content ${this.hideDown}">
              <div class= "content">
                <p>[tbd]</p>
              </div>
            </div>
            <footer class="card-footer">
              <p class="card-footer-item">
                <a href="#">Add Choice</a>
              </p>
              <p class="card-footer-item">
                ${domSel}
              </p>
              <p class="card-footer-item">
                <a href="javascript:" onclick="${this.onDelete}"> Delete</a>
              </p>
            </footer>
          </div>`;
  }
}

// const choicecard = new ChoiceCard();
// document.body.appendChild(choicecard.node);

class ImageCard extends Component {
  compose() {
    return jdom`<div class="card">
            <header class="card-header">
              <p class="card-header-title">
                <span class="icon">
                <i class="fas fa-images"></i>
                </span> 
                Image
              </p>
              <a href="#" class="card-header-icon" aria-label="more options">
              <span class="icon">
              <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>
              </a>
            </header>

<div class="card-content">
  <div class="content">
    <img src="https://via.placeholder.com/150" />
  </div>
</div>

<footer class="card-footer">
  <a href="#" class="card-footer-item">Test</a>
  <a href="#" class="card-footer-item">Edit</a>
  <a href="#" class="card-footer-item">Delete</a>
  </footer>


          </div> `;
  }
}

// const imgcard = new ImageCard();
// document.body.appendChild(imgcard.node);

// dialog for paragraph card
class ModalDialog extends Component {
  init(source, removeCallback) {
    this.removeCallback = removeCallback;
    this.onShow = this.onShow.bind(this);
    this.onHide = this.onHide.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.hiddenClass = '';
    this.modalTitle = "Add new text block";
  }

  saveChanges() {
    let idx = cards.records.size;

    cards.add(new Card(idx, {
      type: 'text',
      content: {
        idx: idx,
        value: document.getElementById('textarea').value,
        label: document.getElementById('textlabel').value
      }
    }));
    document.getElementById('textarea').value = '';
    document.getElementById('textlabel').value = '';
  }

  onShow() {
    this.hiddenClass = "is-active";
    this.render();
  }

  onHide() {
    this.hiddenClass = "";
    this.render();
  }

  compose() {
    return jdom`
    <div class="modal ${this.hiddenClass}">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">${this.modalTitle}</p>
      <button class="delete" aria-label="close" id="modalclose"></button>
    </header>
    <section class="modal-card-body">
      <!-- Content ... -->
      <div class="labelrow"><label for="textlabel">Label:</label><input id="textlabel" /></div>
      <div><textarea id="textarea" rows=3></textarea></div>
    </section>
    <footer class="modal-card-foot">
      <button class="button is-success" id="savechanges">Save changes</button>
      <button class="button" id="modalcancel">Cancel</button>
    </footer>
  </div>
</div>

    `;
  }
}

// dialog for choice card
class ChoiceDialog extends Component {
  init(source, removeCallback) {
    this.removeCallback = removeCallback;
    this.onShow = this.onShow.bind(this);
    this.onHide = this.onHide.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.domAddChoice = this.domAddChoice.bind(this);
    this.domRemoveChoice = this.domRemoveChoice.bind(this);
    this.hiddenClass = '';
    this.modalTitle = "Add new choice block";
    this.cardOptionsView = new CardOptionList(cards)
    //this.bind(source, data => this.render(data));
  }

  saveChanges() {
     let idx=cards.records.size;
     let domChoices = document.querySelectorAll("#choice-table-body tr");
     let choicesArr = [];
     domChoices.forEach((itm,idx)=> {
       let choiceObj = {
         idx: choicesArr.length,
         label: itm.querySelector(".choice-label-field").value,
         target: itm.querySelector(".choice-link-field").value
       }
       choicesArr.push(choiceObj);
     })

    cards.add(
      new Card(idx, {
        type: 'choice',
        content: {
          idx: idx,
          choices: choicesArr, 
          label: document.getElementById('choicelabel').value
        }
      })
    );
    this.onHide();
    document.getElementById('choicelabel').value = '';
  }

  onShow() {
    this.hiddenClass = "is-active";
    this.render();
  }

  onHide() {
    this.hiddenClass = "";
    this.render();
  }

// todo: change this to data driven 
  domAddChoice(){
    let tbody = document.querySelector('#choice-table-body');

    let newRow = htmlToElement(`
          <tr>
            <td><input type="checkbox" class="choice-check"/></td>
            <td><input type="text" class="choice-label-field"/></td>
            <td> 
              <input type="text" class="choice-link-field"/>
            </td>
          </tr>
    `);

    tbody.appendChild(newRow);
  }

// todo: move this to data driven
  domRemoveChoice(){
   let tbody = document.querySelector('#choice-table-body');

    let selectedRows = document.querySelectorAll('input:checked:enabled')
    console.log("selectedRows:", selectedRows);
    selectedRows.forEach((el,idx) => {
      console.log('el:', el);
      console.log("idx:", idx);
      tbody.removeChild(el.parentNode.parentNode);
    })
  }

  compose(data){
        return jdom`
    <div class="modal ${this.hiddenClass}">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">${this.modalTitle}</p>
      <button class="delete" aria-label="close" id="choicemodalclose" onclick="${this.onHide}"></button>
    </header>
    <section class="modal-card-body">
      <!-- Content ... -->
        <div class="labelrow">
          <label for="choicelabel">Label:</label>
          <input type="text" id="choicelabel"/>
          </div>
        <div class="choice-nav">
          <button class="button is-primary" onclick="${this.domAddChoice}">
            <span class="icon">
              <i class="fas fa-plus-square"></i>
            </span>
          </button>

          <button class="button is-danger"
          onclick="${this.domRemoveChoice}">
            <span class="icon">
              <i class="fas fa-minus-square"></i>
            </span>
          </button>

          <button class="button is-warning" disabled> 
            <span class="icon">
              <i class="fas fa-arrow-circle-up"></i>
            </span>
          </button>
          <button class="button is-warning" disabled>
            <span class="icon">
              <i class="fas fa-arrow-circle-down"></i>
            </span>
          </button>                    
        </div>

        <table class="table">
        <thead>
          <tr>
            <th>Select</th>
            <th>Choice Text</th>
            <th>Choice Link</th>
          </tr>
        </thead>
        <tbody id="choice-table-body">
          <tr>
            <td><input type="checkbox" class="choice-check"/></td>
            <td><input type="text" class="choice-label-field"/></td>
            <td> 
              <!-- todo: ${this.cardOptionsView.node} -->
              <input type="text" class="choice-link-field"/>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
    <footer class="modal-card-foot">
      <button class="button is-success" id="choicesavechanges" onclick="${this.saveChanges}">Save changes</button>
      <button class="button" id="choicemodalcancel" onclick="${this.onHide}">Cancel</button>
    </footer>
  </div>
</div>
`;
  }


}


// cardselect classes

class CardOption extends StyledComponent {
  init(source, removeCallback){
    console.log("CardOption init called");
    this.removeCallback = removeCallback;

   
    this.displayLabel = source.data.content.label? source.data.content.label : "-"
    this.bind(source, data => this.render(data));
  }

  compose(data){
    console.log("CardOption compose - data:",data);
    return jdom`
      <option>${data.content.label}</option>
    `;
  }
}

class CardOptionList extends ListOf(CardOption){
  compose(){
    return jdom`<select>${this.nodes}</select>`;
  }
}


// edit textcard
// todo: add editing textcard modal




// reorder code 

class ReorderDialog extends Component {
  init(source, removeCallback){
    console.log("reorderDialog init called");
    this.removeCallback = removeCallback;
    this.onShow = this.onShow.bind(this);
    this.onHide = this.onHide.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.hiddenClass = '';
    this.modalTitle = "Reorder Blocks";
    this.listView = new ReorderListView(cards);
    //this.bind(source, data => this.render(data));
  }

   onShow() {
    this.hiddenClass = "is-active";
    this.render();
  }

  onHide() {
    this.hiddenClass = "";
    this.render();
  }

  saveChanges(){
    console.log('reorderDialog saveChanges called');

    this.onHide();
  }

   compose(data) {
    return jdom`
    <div class="modal ${this.hiddenClass}" id="reorder-modal-id">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">${this.modalTitle}</p>
      <button class="delete" aria-label="close" id="modalclose" onclick="${this.onHide}"></button>
    </header>
    <section class="modal-card-body">
      <!-- Content ... -->
     
      ${this.listView.node}
    </section>
    <footer class="modal-card-foot">
      <button class="button is-success" id="savechanges" onclick="${this.saveChanges}">Done</button>

    </footer>
  </div>
</div>
    `;
  }
}

// reorder view is a list

class ReorderListView extends Component {
  init(source, removeCallback){
    console.log("listview init called with source:", source);
    console.log("source.summarize:", source.summarize())
    //this.rows = new ListOf(source);
    this.tbody = new ReorderListBody(cards);
    this.moveItemUp = this.moveItemUp.bind(this);
    this.moveItemDown = this.moveItemDown.bind(this);
    this.bind(source, data => this.render(data));
  }

  moveItemUp(evt){
    console.log("reorderlistview move item up evt:", evt);
    // get the current item's index
    let selId = document.getElementById("reorder-modal-id").querySelector("tr.is-selected").dataset.id;

    // let iter = 0;
    // for(const card of cards ){
    //   console.log("card:", card)
    //   card.update({
    //     id: iter
    //   });
    //   iter++;
    // }

    console.log("selId:", parseInt(selId));
    let cardsArr = cards.serialize();
    console.log("cardsArr  :", cardsArr)
    console.log("cards:", cards);
    console.log('cards.find(1)', cards.find(1));
    if(parseInt(selId) > 0){
      let oldCard = cards.find(parseInt(selId)).summarize();
      let tempCard = cards.find(parseInt(selId) - 1).summarize();
      console.log("oldCard:", oldCard);
      console.log('tempCard:', tempCard);
      oldCard.content.idx = parseInt(selId)-1;
      tempCard.content.idx = parseInt(selId);


      cards.find(parseInt(selId)-1).update({

        type: oldCard.type,
        content: oldCard.content
      });

      cards.find(parseInt(selId)).update({
        type: tempCard.type,
        content: tempCard.content
      });


      /** 
      cards.find(parseInt(selId)).update({
        content: {
          idx: parseInt(selId),
          value: "wooop",
          label: "ghghgh",
          hidden: true
        }
      })
    **/

      //cards.find(parseInt(selId)).update(tempCard)

      console.log("cards summary /n", cards.serialize());
      populateCardStore(cards, JSON.stringify(cards.serialize()))

      
    }
  }

  moveItemDown(evt){
    console.log("reorderlistview move item down evt:", evt);

    let selId = document.getElementById("reorder-modal-id").querySelector("tr.is-selected").dataset.id;


    console.log("selId:", parseInt(selId));
    let cardsArr = cards.serialize();
    console.log("cardsArr  :", cardsArr)
    console.log("cards:", cards);
    console.log('cards.find(1)', cards.find(1));
    if(parseInt(selId) < cardsArr.length){
      let oldCard = cards.find(parseInt(selId)).summarize();
      let tempCard = cards.find(parseInt(selId) +1).summarize();
      console.log("oldCard:", oldCard);
      console.log('tempCard:', tempCard);
      oldCard.content.idx = parseInt(selId)+1;
      tempCard.content.idx = parseInt(selId);


      cards.find(parseInt(selId)+1).update({

        type: oldCard.type,
        content: oldCard.content
      });

      cards.find(parseInt(selId)).update({
        type: tempCard.type,
        content: tempCard.content
      });


      /** 
      cards.find(parseInt(selId)).update({
        content: {
          idx: parseInt(selId),
          value: "wooop",
          label: "ghghgh",
          hidden: true
        }
      })
    **/

      //cards.find(parseInt(selId)).update(tempCard)

      console.log("cards summary /n", cards.serialize());
      populateCardStore(cards, JSON.stringify(cards.serialize()))
    }
  }

  compose(data){
    return jdom`
    <div class="reorder-list-wrapper">
    <div class="field has-addons">
      <p class="control">
        <a class="button" onclick="${this.moveItemUp}">
          <span class="icon is-small">
            <i class="fas fa-sort-up"></i>
          </span>
          <span>Move Up</span>
        </a>
      </p>
      <p class="control">
        <a class="button" onclick="${this.moveItemDown}">
         <span class="icon is-small">
            <i class="fas fa-sort-down"></i>
          </span>
          <span>Move Down</span>
        </a>
      </p>
    </div>

    <table class="is-bordered is-striped table">
      <thead>
        <tr>
          <td>ID</td>
          <td>TYPE</td>
          <td>LABEL</td>
          
        </tr>
      </thead>
      ${this.tbody.node}
    </table>
    </div>
    `;
  }
}


class ReorderListRow extends Component {
  init(source){
    console.log("init called for ReorderListRow source:", source);
    this.id = source.data.content.idx
    this.label = source.data.content.label;
    this.type = source.data.type;
    this.onSelectBound = this.onSelect.bind(this);
    this.bind(source, data => this.render(data));
  }

  onSelect(evt){
    console.log("reorderlistrow onSelect clicked ", evt);
    evt.target.parentNode.parentNode.childNodes.forEach((itm, idx, arr)=>{
      itm.classList.remove('is-selected');
    })
    evt.target.parentNode.classList.toggle('is-selected');
    //console.log("evt.target", evt.target);

  }

  compose(){
    return jdom`
    <tr data-id="${this.id}" onclick="${this.onSelectBound}">
      <td>
        ${this.id}
      </td>
      <td>
        ${this.type}
      </td>
      <td>
        ${this.label}
      </td>
    </tr>
    `;
  }
}

class ReorderListBody extends ListOf(ReorderListRow){
  compose(){
    console.log("reorderlistbody this.nodes:", this.nodes);
    return jdom`<tbody>
      ${this.nodes}
    </tbody>`
  }
}


// export ALL THE THINGS

export default {
  init,
  App,
  ModalDialog,
  ChoiceDialog,
  ReorderDialog,
  cards,
  populateCardStore
}