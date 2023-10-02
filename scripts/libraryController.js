const myLibrary = [];

let INDEX_COUNTER = 0;

function Book(title, author, isRead, id) {
    this.id = id;
    this.author = author;
    this.title = title;
    this.isRead = isRead;
}

function addBookToLibrary(book) {
    book.id = INDEX_COUNTER;
    INDEX_COUNTER = INDEX_COUNTER+1;
    myLibrary.push(book);
    saveToLocalStorage(myLibrary);
    displayBooks(myLibrary);
}

function deleteFromLibrary(element){
    var index = myLibrary.indexOf(element);
    if (index !== -1) {
        myLibrary.splice(index, 1);
    }
    saveToLocalStorage(myLibrary);
    displayBooks(myLibrary);
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
    `        <button id="readToggle-${book.id}" class="${book.isRead ? 'green' : 'red'}">${book.isRead ? 'Read' : 'Not read'}</button>` + 
    `        <button class="accent" id="delete-${book.id}">Delete</button>` + 
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
    bookList.forEach(element => {
        let readBtn = document.getElementById(`readToggle-${element.id}`);
        readBtn.onclick = () => {
            element.isRead = !element.isRead;
            displayBooks(myLibrary);
        }
        document.getElementById(`delete-${element.id}`).onclick = () =>{
            deleteFromLibrary(element);
        }
    });
}

function saveToLocalStorage(array){
    localStorage.setItem('library', JSON.stringify(array));
}

loadFromLocalStorage();

function loadFromLocalStorage(){
    let a = JSON.parse(localStorage.getItem('library'));

    if (a !== null) {
        a.forEach(element => {
            myLibrary.push(element);
        });
    }
    displayBooks(myLibrary)
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
    displayBooks(myLibrary);
})