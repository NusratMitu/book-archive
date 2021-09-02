const loadSearchResult = () => {
    const searchText = document.getElementById('search-field').value;
    const url = `http://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.docs))
}
const displaySearchResult = books => {
    // console.log(books.length-20);  //num of search result
    console.log(books); 
    document.getElementById('books-number').innerHTML= `
    ${books.numFound.length - 20} more results
    `;
    const booklist =books.slice(0,20);
    booklist.forEach(book => {
        console.log(book.title);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
        <img src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i: ''}-M.jpg" style="width:250px; height:250px;" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title fw-bold">${book.title}</h5>
          <small class="card-title text-success">${book.author_name}</small>
          <p class="card-text">First Published: ${book.first_publish_year ? book.first_publish_year: '' }</p>
          <p class="card-text">Author Detail: ${book.first_publish_year ? book.first_publish_year: '' }</p>
          <a href="https://openlibrary.org/authors/${book.key}/${book.alternate_names}.json">Author Detail</a>
        </div>
      </div>
        `
    document.getElementById('books-Container').appendChild(div); 
    });
}