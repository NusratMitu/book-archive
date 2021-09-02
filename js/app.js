document.getElementById('error-msg').style.display = 'none';

const loadSearchResult = () => {
    const searchText = document.getElementById('search-field').value;
    document.getElementById('search-field').value = '';
    toggleSpinner('block');
    document.getElementById('books-number').textContent = '';
    document.getElementById('books-Container').textContent = '';
    document.getElementById('error-msg').style.display = 'none';
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    if(searchText == ''){
         displayError();    
    }
    else{
      fetch(url)
      .then(res => res.json())
      .then(data => displaySearchResult(data))
      .catch(error =>{ 
        displayError(error);
      }) 
    }
}
const displayError = () =>{
  document.getElementById('error-msg').style.display = 'block';
  document.getElementById('books-number').textContent = '';
  document.getElementById('books-Container').textContent = '';
  toggleSpinner('none');

}
const toggleSpinner = displayStyle => {
  document.getElementById('spinner').style.display = displayStyle;
}


const displaySearchResult = books => {
    // console.log(books); 
    if( (books.numFound) === 0 ){
      document.getElementById('books-number').innerHTML= `
      no result found `;
    }
    else if((books.numFound) <= 20 ){
      document.getElementById('books-number').innerHTML= ` ${books.numFound} results found`;
    }
    else{
      document.getElementById('books-number').innerHTML= `20 of ${books.numFound} results are shown `;
    }
    const searchResultContainer = document.getElementById('books-Container');
    searchResultContainer.textContent ='';
    document.getElementById('error-msg').style.display = 'none';
    const booklist =books.docs.slice(0,20);
    booklist?.forEach(book => {
        console.log(book.title);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
        <img src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i: ''}-M.jpg"     
        style="width:250px; height:250px;" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title fw-bold">${book.title}</h5>
         <p class="card-text ">by<span class="text-success"> ${book.author_name ? book.author_name: 'unknown autor'}</span></p>
        <p class="card-text">Publisher: ${book.publisher}</p>
        <p class="card-text">First Published: ${book.first_publish_year ? book.first_publish_year: 'unknown'}</p> 
        </div>
      </div>
        `
    searchResultContainer.appendChild(div); 
    }); 
    toggleSpinner('none');
   
   
}