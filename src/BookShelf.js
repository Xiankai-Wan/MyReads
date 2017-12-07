import React, {Component} from 'react'
import Book from './Book'

class BookShelf extends Component{
    render(){
        const {ShelfName,ThisShelfBooks,onChangeShelf} = this.props;
        return (
                    <div className="bookshelf">
                    <h2 className="bookshelf-title">{ShelfName}</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                            {ThisShelfBooks.map((book) =>(
                                <li key={book.id}>
                                  <Book ShelfBooks={book} ChangeBookShelf={onChangeShelf}/>  
                                </li>
                            ))}
                            </ol>
                        </div>
                    </div>
                )       
    }

}

export default BookShelf