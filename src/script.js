let app = null;
let modal = null;
$(() => {
  // console.log("I'm ready! Promotion!");
  // console.log(window.Torus);
  test();
  app = new App();
  // console.log('app: ', app)
  modal = new ModalDialog();

  $('#storyNode').append(app.node);
  $('#modals').append(modal.node);
  bindEvents();
})

let test = () => {
   console.log("test");
}



for (const exportedName in Torus) {
  window[exportedName] = Torus[exportedName];
}

class Card extends Record { }

class CardStore extends StoreOf(Card) {

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
    console.log("CardItem: source:" , source);
    this.type = source.data.type
    this.card = null;
    this.content = source.data.content;
  }

  compose(data) {
    // console.log("in compose, data:", data);
    // return jdom`<div>
    //   [card] ${this.type}
    // </div>
    //  `;
    switch(this.type) {
      case 'text' : 
        console.log("** this.content", this.content);
        this.card = new TextCard(this.content);
        // return jdom`${this.card.node}`;
        break;
      case 'image':
        this.card = new ImageCard();
        // return jdom`${this.card.node}`; 
        break;
      case 'choice':
        this.card = new ChoiceCard();
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
  }

  compose(){
    return jdom`
      <div>
        ${this.list.node}
      </div>
    `;
  }
}


// button actions

function xxxOpenModal(modaltext) {
//   var theHTML = `
//   <div class="modal is-active">
//   <div class="modal-background"></div>
//   <div class="modal-content">
//     <!-- Any other Bulma elements you want -->
//     <div>testing ${modaltext}</div>
//   </div>
//   <button class="modal-close is-large" aria-label="close"></button>
// </div>
//   `;
//   console.log(theHTML)
//   console.log($(theHTML));
//   document.body.appendChild($(theHTML).node);
}

function bindEvents(){
// document.getElementsByClassName('modal')[0].classList.add('is-active')


document.getElementById('addParagraph').addEventListener("click", function(){
  console.log("addParagraph")
  // xxxOpenModal('testing');
  modal.onShow();
});

document.getElementById('modalclose').addEventListener('click', ()=>{
    // document.getElementsByClassName('modal')[0].classList.remove('is-active')
    console.log("close");
    modal.onHide()
});

document.getElementById('savechanges').addEventListener('click', ()=> {
  console.log('click');
  modal.saveChanges();
  modal.onHide();
})

// experimental

document.getElementById("addChoice").addEventListener("click", (evt)=>{
  // document.getElementsByClassName('modal')[1].classList.add('is-active')

});

// document.getElementById('modal2close').addEventListener('click', ()=>{
//     // document.getElementsByClassName('modal')[1].classList.remove('is-active')
// });

}

// Card stuff

class TextCard extends Component { 
  init(content){
    // this.bind(content, props => {
    //   this.render(props);
    // })
    console.log("TextCard init [content]", content);
    this.content = content;
  }
  compose(data) {
    // console.log("-- TextCard compose data:", data);
    return jdom`
    <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                <span class="icon">
                <i class="fas fa-paragraph"></i>
                </span> 
                Text area
              </p>
              <a href="#" class="card-header-icon" aria-label="more options">
              <span class="icon">
              <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>
              </a>
            </header>
            <div class="card-content">
              <div class="content">
              ${this.content.value}
              </div>
            </div>
            <footer class="card-footer">
              <a href="#" class="card-footer-item">Test</a>
              <a href="#" class="card-footer-item">Edit</a>
              <a href="#" class="card-footer-item">Delete</a>
            </footer>
          </div>
  `;
  }
}


// const textcard = new TextCard({});
// document.body.appendChild(textcard.node);

class ChoiceCard extends Component {
  compose(){
    return jdom`<div class="card">
            <header class="card-header">
              <p class="card-header-title">
                <span class="icon">
                <i class="fas fa-list"></i>
                </span> 
                Choices
              </p>
              <a href="#" class="card-header-icon" aria-label="more options">
              <span class="icon">
              <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>
              </a>
            </header>
            <div class="card-content">
              <div class= "content">
                <p>Choice one text</p>
              </div>
            </div>
            <footer class="card-footer">
              <p class="card-footer-item">
                <a href="#">Add Choice</a>
              </p>
              <p class="card-footer-item">
                <select>
                  <option value="volvo">Choice 1</option>
                  <option value="saab">Choice 2</option>
                  <option value="mercedes">Choice 3</option>
                  <option value="audi">Choice 4</option>
                </select>
              </p>
              <p class="card-footer-item">
                <a href="#"> Delete</a>
              </p>
            </footer>
          </div>`;
  }
}

// const choicecard = new ChoiceCard();
// document.body.appendChild(choicecard.node);

class ImageCard extends Component {
  compose(){
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

class ModalDialog extends Component {
  init(source, removeCallback){
    this.removeCallback = removeCallback;
    this.onShow = this.onShow.bind(this);
    this.onHide = this.onHide.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.hiddenClass = '';
  }

  saveChanges(){
    cards.add(   new Card(cards.records.size, {
    type: 'text',
    content: {
      value: document.getElementById('textarea').value
    }
  }) )
  }

  onShow() {
    this.hiddenClass = "is-active";
    this.render();
  }

  onHide() {
    this.hiddenClass = "";
    this.render();
  }

  compose(){
    return jdom`
    <div class="modal ${this.hiddenClass}">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Modal title</p>
      <button class="delete" aria-label="close" id="modalclose"></button>
    </header>
    <section class="modal-card-body">
      <!-- Content ... -->
      <div><textarea id="textarea"></textarea></div>
    </section>
    <footer class="modal-card-foot">
      <button class="button is-success" id="savechanges">Save changes</button>
      <button class="button">Cancel</button>
    </footer>
  </div>
</div>

    `;
  }
}