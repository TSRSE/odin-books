
// import addElement from './bookCard.js';

// import displayBook from './cardComponent';

const myLibrary = [];

function createBookHTML(book){
    var bookCardHTML = '' + 
    '<div class="book--card">' + 
    '    <div class="card--info">' + 
    `        <h1>${book.title}</h1>` + 
    `        <h3>${book.author}</h3>` + 
    `        <p>${book.isRead ? 'true' : 'false'}</p>` + 
    '    </div>' + 
    '    <div class="card--buttons">' + 
    `        <button id="readToggle-${book.index}">isRead</button>` + 
    `        <button class="accent" id="delete-${book.index}">Delete</button>` + 
    '    </div>' + 
    '</div>' + 
    '';
    return bookCardHTML;
}

function addBookToLibrary(book) {
    myLibrary.push(book)
}

function createBookList(library){
    let HTML = '';
    library.forEach(element => {
        HTML += createBookHTML(element);
    });
    return HTML;
}

function displayBooks(bookList){
    document.getElementById('books-list');
    console.log('yes')
    const tmp = createBookList(bookList);
    document.getElementById('books-list').innerHTML = tmp;
}

function Book(title, author, isRead) {
  this.author = author;
  this.title = title;
  this.isRead = isRead;
}

addBookToLibrary(new Book('Warrior cats','Erric Hunter', true));
addBookToLibrary(new Book('Warrior cats2','Erric Hunter', false));

display();
function display(){
    displayBooks(myLibrary);
}