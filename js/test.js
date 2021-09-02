const authors = book.author_name;
authors.forEach(author => {
    // console.log(author);  //showing type error
}); 


        // console.log(book.author_name);
        // console.log(book.first_publish_year ? book.first_publish_year: '' );

        const loadSearchResult = () => {
            const searchText = document.getElementById('search-field').value;
            const url = `http://openlibrary.org/search.json?q=${searchText}`;
            fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.docs))
        }
        const displaySearchResult = books => {

            console.log(books); 
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
                  <p="card-title text-success">${book.author_name}</p>
                  <p class="card-text"> ${book.first_publish_year ? book.first_publish_year: '' }</p>
                `