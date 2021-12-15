 const INCOMPLETE_BOOK_SHELF_LIST = "incompleteBookshelfList";
 const COMPLETE_BOOK_SHLEF_LIST = "completeBookshelfList";
 const BOOK_ITEMID = "itemId";

 function addBook() {
     const incompleteBook = document.getElementById(INCOMPLETE_BOOK_SHELF_LIST);
     const completeBook = document.getElementById(COMPLETE_BOOK_SHLEF_LIST);
     
     const inputTitle = document.getElementById("inputBookTitle").value;
     const inputAuthor = document.getElementById("inputBookAuthor").value;
     const inputYear = document.getElementById("inputBookYear").value;
     const isCompleted = document.getElementById("inputBookIsComplete").checked;
     
     const book = makeBook(inputTitle, inputAuthor, inputYear, isCompleted);
     const bookObject = composeBookObject(inputTitle, inputAuthor, inputYear, isCompleted);

     book[BOOK_ITEMID] = bookObject.id;
     books.push(bookObject);
     
     if (isCompleted) {
         completeBook.append(book);
     }else {
         incompleteBook.append(book);
     }

    updateDataToStorage();
}

 function makeBook(titleB, authorB, yearB, isCompleted) {
     const textTitle = document.createElement("h2");
     textTitle.classList.add("title");
     textTitle.innerText = titleB;
     
     const textAuthor = document.createElement("p");
     textAuthor.innerText = "Penulis : ";
     const text_Author = document.createElement("span");
     text_Author.classList.add("author");
     text_Author.innerText = authorB;
     textAuthor.append(text_Author);
     
     const textYear = document.createElement("p");
     textYear.innerText = "Tahun Terbit : ";
     const text_Year = document.createElement("span");
     text_Year.classList.add("year");
     text_Year.innerText = yearB;
     textYear.append(text_Year);
     
     const detailBook = document.createElement("div");
     detailBook.append(textTitle, textAuthor, textYear);

     const actionBook = document.createElement("div");
     actionBook.classList.add("action");

     const container = document.createElement("article");
     container.classList.add("book_item");
     container.append(detailBook, actionBook);

     if(isCompleted){
         actionBook.append(
             createTrashButton(),
             createUndoButton(),
             createEditButton()
         );
     }else{
         actionBook.append(
             createCheckButton(),
             createTrashButton(),
             createEditButton()
         );
     }

     return container;
 }

 function deleteForm() {
    document.getElementById("inputBookTitle").value = "";
    document.getElementById("inputBookAuthor").value = "";
    document.getElementById("inputBookYear").value = "";
    document.getElementById("inputBookIsComplete").checked = false;
}

 function createButton(buttonTypeClass, eventListener){
     const button = document.createElement("button");
     button.classList.add(buttonTypeClass);
     button.addEventListener("click", function(event){
         eventListener(event);
     });

     return button;
 }

 function addBookToCompleted(bookElement){
     const bookTitle = bookElement.querySelector(".title").innerText;
     const bookAuthor = bookElement.querySelector(".author").innerText;
     const bookYear = bookElement.querySelector(".year").innerText;

     const newBook = makeBook(bookTitle, bookAuthor, bookYear, true);

     const book = findBook(bookElement[BOOK_ITEMID]);
     book.isCompleted = true;
     newBook[BOOK_ITEMID] = book.id;
     
     const completeBook = document.getElementById(COMPLETE_BOOK_SHLEF_LIST);
     completeBook.append(newBook);

     bookElement.remove();

     updateDataToStorage();
 }

 function createCheckButton(){
     return createButton("check", function(event){
         addBookToCompleted(event.target.parentElement.parentElement);
     });
 }

 function removeBookFromCompleted(bookElement){
     const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);
     books.splice(bookPosition, 1);

     bookElement.remove();
     updateDataToStorage();
 }

 function createTrashButton(){
     return createButton("trash", function(event){
        removeBookFromCompleted(event.target.parentElement.parentElement);
     });
 }

 function undoBookFromCompleted(bookElement){
     const incompleteBook = document.getElementById(INCOMPLETE_BOOK_SHELF_LIST);
     const bookTitle = bookElement.querySelector(".title").innerText;
     const bookAuthor = bookElement.querySelector(".author").innerText;
     const bookYear = bookElement.querySelector(".year").innerText;

     const newBook = makeBook(bookTitle, bookAuthor, bookYear, false);

     const book = findBook(bookElement[BOOK_ITEMID]);
     book.isCompleted = false;
     newBook[BOOK_ITEMID] = book.id;
     
     incompleteBook.append(newBook);

     bookElement.remove();

     updateDataToStorage();

 }

 function createUndoButton(){
     return createButton("undo", function(event){
         undoBookFromCompleted(event.target.parentElement.parentElement);
     })
 }

 const submitSearch = document.getElementById("searchSubmit");
    submitSearch.addEventListener("click", (event) => {
        const inputSearch = document.getElementById("searchBookTitle").value.toLowerCase();
        const listBook = document.querySelectorAll('.book_item');

        for(book of listBook){
            const title = book.firstElementChild.textContent.toLowerCase();

            if(title.indexOf(inputSearch) != -1){
                book.style.display = "flex";
            }else{
                book.style.display = "none";
            }
        }
        event.preventDefault();
    });

function addBookEdit(bookElement) {
    bookElement.remove();
    removeBookFromCompleted(bookElement);
    const incompleteBook = document.getElementById(INCOMPLETE_BOOK_SHELF_LIST);
    const completeBook = document.getElementById(COMPLETE_BOOK_SHLEF_LIST);
        
    const inputTitle = document.getElementById("inputBookTitle").value;
    const inputAuthor = document.getElementById("inputBookAuthor").value;
    const inputYear = document.getElementById("inputBookYear").value;
    const isCompleted = document.getElementById("inputBookIsComplete").checked;
        
    const book = makeBook(inputTitle, inputAuthor, inputYear, isCompleted);
    const bookObject = composeBookObject(inputTitle, inputAuthor, inputYear, isCompleted);

    book[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);
        
    if (isCompleted) {
        completeBook.append(book);
    }else {
        incompleteBook.append(book);
    }

    updateDataToStorage();
    deleteForm();
}
    
function editBook(bookElement){
    document.getElementById("bookSubmit").style.display = "none";
    const editButton = document.getElementById("bookEdit");
    if (editButton) {
        if (editButton.style.display === "none") {
            editButton.style.display = "block";
        } else {
            editButton.style.display = "none";
        }
    }
    editButton.style.display = "block";
    document.getElementById("inputBookTitle").value = bookElement.querySelector(".title").innerText;
    document.getElementById("inputBookAuthor").value = bookElement.querySelector(".author").innerText;
    document.getElementById("inputBookYear").value = bookElement.querySelector(".year").innerText;

    editButton.addEventListener("click", function(event) {
        editButton.style.display = "block";
        event.preventDefault();
        addBookEdit(bookElement);
    });
}

function createEditButton(){
    return createButton("edit", function(event){
        editBook(event.target.parentElement.parentElement);
    })
}