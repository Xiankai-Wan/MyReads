import React, {Component} from 'react'
import Book from './Book'

class BookShelf extends Component{
    render(){
        return (
                    <div className="bookshelf">
                    <h2 className="bookshelf-title">{this.props.ShelfName}</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                            {this.props.ThisShelfBooks.map((book) =>(
                                <li key={book.id}>
                                  <Book ShelfBooks={book}/>  
                                </li>
                            ))}
                            </ol>
                        </div>
                    </div>
                )       
    }

}

export default BookShelf