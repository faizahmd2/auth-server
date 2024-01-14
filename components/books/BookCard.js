import Link from 'next/link'

function BookCard({ book }) {

    return <Link href={'/review/' + book.bookId} className="book_card">
        <div className="card main-card" style={{ height: '21rem', width: '18rem' }}>
            <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">{book.summary}</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">{`Auther : ${book.author || "N/A"}`}</li>
            </ul>
        </div>
    </Link>
}

export default BookCard;