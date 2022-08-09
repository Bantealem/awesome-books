const form = document.querySelector(".form");
const library = document.querySelector(".library");
const inputAuthor = document.querySelector(".input-author");
const inputBook = document.querySelector(".input-book");
const errormessage = document.querySelector(".errormessage");
let storedBooks = JSON.parse(localStorage.getItem("books"));
let bookShelf = [];
let filter = [];
let counter ="0"
function libraryBooks(object) {
  return  `<div class="${object.author}">
    <h1>${object.book}</h1>
    <p>${object.author}</p> 
    <hr> 
    <button class="remove">
    remove
    </button>
    </div>`
  }
  
function add() {
  if(inputAuthor.value != "" && inputBook.value != ""){
    currentBook = []
    currentBook.push (
      {
        author: inputAuthor.value,
        book: inputBook.value
      }
    )
    filter = bookShelf.filter(x => x.book === currentBook[0].book)
    if(filter.length > 0){
      errormessage.style.display ="unset"
      inputAuthor.value = ""
      inputBook.value = ""
      setTimeout(()=>errormessage.style.display = "none",3000)
      return
    }
    bookShelf.push (
      {
        author: inputAuthor.value,
        book: inputBook.value
      }
    )   
     if(bookShelf.length>0) {
      currentBook.forEach(book => library.insertAdjacentHTML('beforeend', libraryBooks(book)))
    }
  } 
  inputAuthor.value = ""
  inputBook.value = ""
  localStorage.setItem('books', JSON.stringify(bookShelf))
}

form.addEventListener("submit", function(event) {
  event.preventDefault();
  add()
  remove()
}
)

if(storedBooks !== null){
   console.log("entré")
   bookShelf = storedBooks
   bookShelf.forEach(book => {
   library.insertAdjacentHTML('beforeend', libraryBooks(book))
   remove()
  })
}
