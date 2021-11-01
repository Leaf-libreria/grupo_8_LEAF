
function buscarLibro() {
    var input, filter,  title, i;
    input = document.getElementById("input-buscador-admin");
    filter = input.value.toLowerCase();
    booksContainer = document.getElementsByClassName("libro");
  
    for(let book of booksContainer)
    {
        book.style.display = "none";
    }
    for (i = 0; i < booksContainer.length; i++) {
      title = booksContainer[i].children[1].children[0];
      console.log(title);
      if (title.innerText.toLowerCase().indexOf(filter) > -1) {
        booksContainer[i].style.display = '';
      } else {
        booksContainer[i].style.display = "none";
      }
    }
}  