// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

//DECLARE GLOBAL CONSTANTS
const bookMenu = document.querySelector('#book-menu')
const detailImage = document.querySelector('.detail-image')
const bookName = document.querySelector('.book-name')
const authorName = document.querySelector('.author')
const description = document.querySelector('.description')
const newComment = document.querySelector('#new-comment')
const commentDisplay = document.querySelector('#comment-display')
const textBox = document.querySelector('#new-comment2')
const likeButton = document.querySelector('.like-glyph')
const likeCount = document.querySelector("#like-count")
const commentArray = []

//WAIT TILL PAGE LOADS
function init() {
    fetch('https://openlibrary.org/authors/OL26320A/works.json?limit=10')
        .then(res => res.json())
        .then(data => {
            data.entries.forEach(function (book, i=0){ 
                displayBook(book, i)
                i++
                commentArray.push('')
            })
            selectBook(data.entries[0])  
        })
}

function displayBook(book, i) { 
    const img = document.createElement('img')
    img.src = `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
    img.className = 'book-image'
    img.dataset.key = book.key
    img.dataset.id = i
    img.dataset.likeCount = 0
    img.addEventListener('click', () => selectBook(book))
    bookMenu.appendChild(img)
}

function selectBook(book) {
    detailImage.src = `https://covers.openlibrary.org/b/id/${book.covers[0]}-M.jpg`
    detailImage.dataset.key = book.key
    bookName.textContent = book.title
    const img = document.querySelector(`.book-image[data-key='${detailImage.dataset.key}']`)
    likeCount.textContent = img.dataset.likeCount
    const imgID = img.dataset.id
    commentDisplay.textContent = commentArray[imgID]

    if (Number(img.dataset.likeCount) > 0) {
        likeButton.textContent = FULL_HEART
        likeButton.style.color = 'red'
    } else {
        likeButton.textContent = EMPTY_HEART
    }

    if (Number(img.dataset.likeCount) === 0)
    {
        likeButton.style.color = 'white'
    }

    authorName.textContent = 'J.R.R. Tolkien'
    if (book.description === undefined) {
        description.textContent = 'No Description'
    } else {
        description.textContent = book.description
    }
    newComment.addEventListener('submit', addComment)
}

function addComment(event) {
    event.preventDefault()
    const img = document.querySelector(`.book-image[data-key='${detailImage.dataset.key}']`)
    const imgID = img.dataset.id
    commentArray.splice(imgID, 1, textBox.value)
    commentDisplay.textContent = commentArray[imgID]
    event.target.reset()
}

likeButton.addEventListener("click", () => {
    const currentLikes = Number(likeCount.textContent);
    const incrementedLikes = currentLikes + 1;
    const img = document.querySelector(`.book-image[data-key='${detailImage.dataset.key}']`)
    likeCount.textContent = incrementedLikes;
    likeButton.textContent = FULL_HEART;
    img.dataset.likeCount = incrementedLikes
    likeButton.style.color = 'red'
});

document.addEventListener('DOMContentLoaded', init)
