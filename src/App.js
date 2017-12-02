import React from 'react'
// import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import ListBooksContent from './ListBooksContent'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
  }
  render() {
    return (
      <div className="app">
      <Route exact path='/' render={()=>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <ListBooksContent/>
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
