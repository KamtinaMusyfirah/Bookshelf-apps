const STORAGE_KEY = "BOOK_SHELF_APPS";

let books = [];

function isStorageExist(){
    if(typeof(Storage) === undefined){
        alert("Browser kamu tidak mendukung local storage");
        return false;
    }
    return true;
}

function saveData(){
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage(){
    const serializedData = localStorage.getItem(STORAGE_KEY);

    let data = JSON.parse(serializedData);

    if(data !== null){
        books = data;
    }

    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage(){
    if(isStorageExist()){
        saveData();
    }
}

function composeBookObject(inputTitle, inputAuthor, inputYear, isCompleted){
    return{
        id : +new Date(),
        inputTitle, 
        inputAuthor, 
        inputYear,
        isCompleted
    };
}

function findBook(bookId){
    for(book of books){
        if(book.id === bookId)
            return book;
        
    }
    return null;
}

function findBookIndex(bookId){
    let index = 0;
    for(book of books){
        if(book.id === bookId)
            return index;
        
        index++;
    }
    return -1;
}

function refreshDataFromBooks() {
    const incompleteBook = document.getElementById(INCOMPLETE_BOOK_SHELF_LIST);
    let completeBook = document.getElementById(COMPLETE_BOOK_SHLEF_LIST);
  
  
    for(book of books){
        const newBook = makeBook(book.inputTitle, book.inputAuthor, book.inputYear, book.isCompleted);
        newBook[BOOK_ITEMID] = book.id;
  
  
        if(book.isCompleted){
            completeBook.append(newBook);
        } else {
            incompleteBook.append(newBook);
        }
    }
 }