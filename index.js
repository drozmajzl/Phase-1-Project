// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

//DECLARE GLOBAL CONSTANTS
// const imageArray = Array.from(document.querySelectorAll('.book-image'))
const bookMenu = document.querySelector('#book-menu')
const detailImage = document.querySelector('.detail-image')
const bookName = document.querySelector('.book-name')
const authorName = document.querySelector('.author')
const description = document.querySelector('.description')
const newComment = document.querySelector('#new-comment')
const commentDisplay = document.querySelector('#comment-display')
const textBox = document.querySelector('#new-comment2')

//WAIT TILL PAGE LOADS
function init(){
    fetch('https://openlibrary.org/authors/OL26320A/works.json?limit=7')
    .then(res => res.json())
    .then(res => {res.entries.forEach(book => displayBook(book))
        selectBook(res.entries[0])
        
    })

function displayBook(book){
    const img = document.createElement('img')
    img.src = `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
    img.className = 'book-image'
    img.addEventListener('click', () => selectBook(book))
    bookMenu.appendChild(img)
}

function selectBook(book){
    detailImage.src = `https://covers.openlibrary.org/b/id/${book.covers[0]}-M.jpg`
    bookName.textContent = book.title
    authorName.textContent = 'J.R.R. Tolkien'
    if (book.description === undefined)
    {
        description.textContent = 'No Description'
    }
    else{
    description.textContent = book.description
    }
}
newComment.addEventListener('submit', addComment)

function addComment(event){
    event.preventDefault()
    console.log(textBox.value)
    commentDisplay.textContent = textBox.value
}
}
   
document.addEventListener('DOMContentLoaded', init)
