const form = document.querySelector('.form');
const library = document.querySelector('.library');
const inputAuthor = document.querySelector('.input-author');
const inputBook = document.querySelector('.input-book');
const errorMessage = document.querySelector('.errormessage');
const storedBooks = JSON.parse(localStorage.getItem('books'));
let bookShelf = [];
let filter = [];

function libraryBooks(object) {
  return `<div class="${object.author}">
    <h1>${object.book}</h1>
    <p>${object.author}</p> 
    <hr> 
    <button class="remove">
    remove
    </button>
    </div>`;
}

function remove() {
  if (bookShelf.length > 0) {
    const removebtn = document.querySelectorAll('.remove');
    removebtn.forEach((element) => element.addEventListener('click', () => {
      const parentNodeClass = element.parentNode.className;
      element.parentNode.remove();
      bookShelf = bookShelf.filter((x) => x.author !== parentNodeClass);
      localStorage.setItem('books', JSON.stringify(bookShelf));
    }));
  }
}

function add() {
  if (inputAuthor.value !== '' && inputBook.value !== '') {
    const currentBook = [];
    currentBook.push(
      {
        author: inputAuthor.value,
        book: inputBook.value,
      },
    );
    filter = bookShelf.filter((x) => x.book === currentBook[0].book);
    if (filter.length > 0) {
      errorMessage.style.display = 'unset';
      inputAuthor.value = '';
      inputBook.value = '';
    }
    bookShelf.push(
      {
        author: inputAuthor.value,
        book: inputBook.value,
      },
    );
    if (bookShelf.length > 0) {
      currentBook.forEach((book) => library.insertAdjacentHTML('beforeend', libraryBooks(book)));
    }
  }
  inputAuthor.value = '';
  inputBook.value = '';
  localStorage.setItem('books', JSON.stringify(bookShelf));
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  add();
  remove();
});

if (storedBooks !== null) {
  bookShelf = storedBooks;
  bookShelf.forEach((book) => {
    library.insertAdjacentHTML('beforeend', libraryBooks(book));
    remove();
  });
}
