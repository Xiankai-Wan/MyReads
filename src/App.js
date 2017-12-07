import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import BookShelf from './BookShelf'
import './App.css'

class BooksApp extends Component {
  state = {
    shelf:{
      currentlyReading:[],
      wantToRead:[],
      read:[]
    }
  }
    componentDidMount() {
      const shelf = {
        currentlyReading: [],
        wantToRead: [],
        read: []
      };
      BooksAPI.getAll().then((books)=>{
        books.map((book) => (
          book.shelf === 'currentlyReading' ? shelf.currentlyReading.push(book) :
            (book.shelf === 'wantToRead' ? shelf.wantToRead.push(book) : shelf.read.push(book))
        ))
        this.setState({ shelf });
      })
    }
  ChangeShelf = (MovetoShelf, book) => {
    const shelf = this.state.shelf,
      originShelf = book.shelf;

    if (shelf[originShelf]) {
      const newBooksArray = shelf[originShelf].filter(b => (b.id !== book.id));
      shelf[originShelf] = newBooksArray;
    }

    if (MovetoShelf !== 'none') {
      book.shelf = MovetoShelf;
      shelf[MovetoShelf].push(book);
    }
    this.setState({ shelf })
    BooksAPI.update(book, MovetoShelf)
  }

  render() {
    const { currentlyReading, wantToRead, read } = this.state.shelf;
    return (
      <div className="app">
      <Route exact path='/' render={()=>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf ThisShelfBooks={currentlyReading} onChangeShelf={this.ChangeShelf} ShelfName='Currently Reading' />
                <BookShelf ThisShelfBooks={wantToRead} onChangeShelf={this.ChangeShelf} ShelfName='Want To Read' />
                <BookShelf ThisShelfBooks={read} onChangeShelf={this.ChangeShelf} ShelfName='Read' />
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
      )}/>
      {/* search book and add book to shelf */}
      <Route path='/search' component={SearchBooks} />
      </div>
    )
  }
}

export default BooksApp
