import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import './App.css'

class SearchBooks extends Component {
    state={
        query:'',
        books:[]
    }
    
    searchBook=(query)=>{
        this.setState({query:query.trim()})
    }
    keyDownEnter = (e) => {
        const { query } = this.state;
        const { currentlyReading, wantToRead, read } = this.props.books;
        const searchResultCount = 20;
        const shelfBooks = {};

        [...currentlyReading, ...wantToRead, ...read].map((book) => (
            shelfBooks[book.id] = book.shelf
        ));

        if (query && (e.key === 'Enter')) {
            BooksAPI.search(query, searchResultCount).then((searchBooks) => {
                    const books = searchBooks.map((searchBook) => {
                        if (searchBook.id in shelfBooks) {
                            searchBook.shelf = shelfBooks[searchBook.id];
                        } else {
                            searchBook.shelf = 'none';
                        }
                        return searchBook;
                    })
                    this.setState({ books })
            });
        }
        return;
    }
    render(){
        const {query,books}=this.state;
        const {onChangeShelf}=this.props;
        return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link className="close-search" to='/' >Close</Link>
                <div className="search-books-input-wrapper">
                    <input 
                    type="text" 
                    placeholder="Search by title or author" 
                    value={query}
                    onChange={(event)=>this.searchBook(event.target.value)}
                    onKeyDown={(e) => this.keyDownEnter(e)}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                {books.map((book)=>(
                    <Book key={book.id} ShelfBooks={book} ChangeBookShelf={onChangeShelf} /> 
                ))
                }
                </ol>
            </div>
        </div>
        )
    }
}
export default SearchBooks
