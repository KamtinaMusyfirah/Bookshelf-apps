document.addEventListener("DOMContentLoaded", function(){
    const bookSubmit = document.getElementById("inputBook");

    bookSubmit.addEventListener("submit", function(event){
        event.preventDefault();
        addBook();
        deleteForm();
    });

    if(isStorageExist()){
        loadDataFromStorage();
    }

});

document.addEventListener("ondatasaved", () =>{
    console.log("Data berhasil disimpan");
});

document.addEventListener("ondataloaded", () =>{
    refreshDataFromBooks();
});