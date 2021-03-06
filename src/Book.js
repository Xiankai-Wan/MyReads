import React, {Component} from 'react'

class Book extends Component {
    render(){
        const { ShelfBooks, ChangeBookShelf} = this.props;
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${ShelfBooks.imageLinks.smallThumbnail})`}}></div>
                    <div className="book-shelf-changer">
                        <select value={ShelfBooks.shelf} onChange={(e) => {ChangeBookShelf(e.target.value, ShelfBooks)}}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.ShelfBooks.title}</div>
                <div className="book-authors">{this.props.ShelfBooks.authors}</div>
            </div>
        )
    }
}
export default Book