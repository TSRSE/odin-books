const myLibrary = [];
let INDEX_COUNTER = 0;

function Book(title, author, isRead, index) {
    this.index = index;
    this.author = author;
    this.title = title;
    this.isRead = isRead;
}

function addBookToLibrary(book) {
    book.index = INDEX_COUNTER;
    INDEX_COUNTER = INDEX_COUNTER+1;
    myLibrary.push(book);
}

function deleteFromLibrary(index){
    myLibrary.pop(index);
}

function updateBookStates(booksList){
    booksList.forEach(element => {
        let readBtn = document.getElementById(`readToggle-${element.index}`);
        readBtn.onclick = () =>{
            element.isRead = !element.isRead;
            updateView();
        }
        document.getElementById(`delete-${element.index}`).onclick = () =>{
            deleteFromLibrary(element.index);
            updateView();
        }
    });

}

function createBookHTML(book){
    var bookCardHTML = '' + 
    '<div class="book--card">' + 
    '    <div class="card--info">' + 
    `        <h1>${book.title}</h1>` + 
    `        <h3>${book.author}</h3>` + 
    `        <p>${book.isRead ? 'Already read' : 'Need to read'}</p>` + 
    '    </div>' + 
    '    <div class="card--buttons">' + 
    `        <button id="readToggle-${book.index}" class="${book.isRead ? 'green' : 'red'}">${book.isRead ? 'Read' : 'Not read'}</button>` + 
    `        <button class="accent" id="delete-${book.index}">Delete</button>` + 
    '    </div>' + 
    '</div>' + 
    '';
    return bookCardHTML;
}

function createBookList(booksArray){
    let HTML = '';
    booksArray.forEach(element => {
        HTML += createBookHTML(element);
    });
    return HTML;
}

function displayBooks(bookList){
    const tmp = createBookList(bookList);
    document.getElementById('books-list').innerHTML = tmp;
}

function saveToLocalStorage(){
    localStorage.clear();
    localStorage.setItem('library', JSON.stringify(myLibrary));
}

function loadFromLocalStorage(){
    myLibrary = localStorage.getItem('library') === 'undefined' ? [] : JSON.parse(localStorage.getItem('library'));
}


updateView();

function updateView(){
    displayBooks(myLibrary);
    updateBookStates(myLibrary);
    saveToLocalStorage();
}

// Dialog logic

const dialog = document.getElementById('dialog');

const openDialogBtn = document.getElementById('addBookButton');
openDialogBtn.addEventListener('click', () => {
    dialog.showModal();
})

const inputTitle = document.getElementById('book-title');
const inputAuthor = document.getElementById('book-author');
const inputIsRead = document.getElementById('book-isRead');

const confirmBtn = document.getElementById('confirm_btn');
confirmBtn.addEventListener('click', (e) => {
    e.preventDefault();
    dialog.close();
    addBookToLibrary(new Book(inputTitle.value, inputAuthor.value, inputIsRead.checked))
    updateView();
})