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

  render() {
    return (
      <div className="app">
      <Route exact path='/' render={()=>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf ThisShelfBooks={this.state.shelf.currentlyReading} ShelfName='Currently Reading' />
                <BookShelf ThisShelfBooks={this.state.shelf.wantToRead} ShelfName='Want To Read' />
                <BookShelf ThisShelfBooks={this.state.shelf.read} ShelfName='Read' />
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
