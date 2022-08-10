const form = document.querySelector('.form');
const library = document.querySelector('.library');
const inputAuthor = document.querySelector('.input-author');
const inputBook = document.querySelector('.input-book');
const errorMessage = document.querySelector('.errormessage');
const storedBooks = JSON.parse(localStorage.getItem('books'));
let bookShelf = [];
// const filter = [];

class Book {
  constructor(author, book) {
    this.author = author;
    this.book = book;
  }

  add() {
    if (inputAuthor.value !== '' && inputBook.value !== '') {
      const currentBook = [];
      currentBook.push(
        {
          author: inputAuthor.value,
          book: inputBook.value,
        },
      );
      this.filter = bookShelf.filter((x) => x.book === currentBook[0].book);
      if (this.filter.length > 0) {
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
        currentBook.forEach((book) => library.insertAdjacentHTML('beforeend', this.displayBooks(book)));
      }
    }
    inputAuthor.value = '';
    inputBook.value = '';
    localStorage.setItem('books', JSON.stringify(bookShelf));
  }
  /* eslint-disable */
  remove() {
    if (bookShelf.length > 0) {
      const removebtn = document.querySelectorAll('.remove');
      removebtn.forEach((element) => element.addEventListener('click', () => {
        const parentNodeClass = element.parentNode.className;
        element.parentNode.remove();
        bookShelf = bookShelf.filter((x) => x.author !== parentNodeClass);
        localStorage.setItem('books', JSON.stringify(bookShelf));
      }));
    }
  };

  displayBooks(object){
    return `<li class="${object.author}">
      <span class="title">${object.book} by ${object.author}</span>
      <button class="remove">remove</button></li>`;
  };

};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const newBook = new Book();
  newBook.add();
  newBook.remove();
});

if (storedBooks !== null) {
  bookShelf = storedBooks;
  bookShelf.forEach((book) => {
    const newBook = new Book();
    library.insertAdjacentHTML('beforeend', newBook.displayBooks(book));
    newBook.remove();
  });
};
