document.getElementById('error-msg').style.display = 'none';
// load data
const loadSearchResult = () => {
    const searchText = document.getElementById('search-field').value;
    document.getElementById('search-field').value = '';
    toggleSpinner('block');
    containerDisplayNone();
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
// error msg
const displayError = () =>{
  document.getElementById('error-msg').style.display = 'block';
  containerDisplayNone();
  toggleSpinner('none');

}
// spinner while loading data
const toggleSpinner = displayStyle => {
  document.getElementById('spinner').style.display = displayStyle;
}
const containerDisplayNone =() =>{
  document.getElementById('books-number').textContent = '';
  document.getElementById('books-Container').textContent = '';
}
// display searched data
const displaySearchResult = books => {
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
    const shoerListedBooks =books.docs.slice(0,20);
    shoerListedBooks?.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
        <img src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i: ''}-M.jpg"     
        style="width:100%; height:250px;" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title fw-bold">${book.title}</h5>
         <p class="card-text ">by<span class="text-success"> ${book.author_name ? book.author_name: 'unknown author'}</span></p>
        <p class="card-text">Publisher: ${book.publisher}</p>
        <p class="card-text">First Published: ${book.first_publish_year ? book.first_publish_year: 'unknown'}</p> 
        </div>
      </div>
        `;
    searchResultContainer.appendChild(div); 
    }); 
    toggleSpinner('none');
   
   
}