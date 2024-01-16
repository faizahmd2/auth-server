import { useState, useEffect } from "react";
import styles from '../styles/Home.module.css'
import BookCard from "../components/books/BookCard";
import { authenticate } from "../utils/auth";

export async function getServerSideProps(context) {
    const authResult = await authenticate(context);

    if ('redirect' in authResult) {
      return authResult;
    }

    return {
      props: authResult.props,
    };
}

const fetchBook = async (query) => {
    let q = "/api/books/search";
    if(query) {
        q += "?search="+query;
    }
    const data = await fetch(q);
    const jsonData = await data.json();
    return jsonData;
};

const PageHandle = ({text}) => <h1 style={{textAlign: 'center', color: '#000'}}>{text}</h1>

const Books = ({user}) => {
    const [query, setQuery] = useState("");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        const result = await fetchBook(query);
        setData(result);
        setLoading(false);
    };

    useEffect(() => {
        return handleSearch;
    }, [])

    return <div className={styles['home-containes']}>
        <div className={`${styles.search_container} me-3`}>
            <input
                placeholder="Search for a books..."
                aria-label="Search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="form-control"
                style={{width: '25%'}}
            />
            <button className="btn btn-primary" onClick={handleSearch}>Search</button>

        </div>

        <div className={styles.book_card_parent}>
            {
                (!loading && data && data.rows && data.rows.length) ? 
                    data.rows.map((d) => <div className=''><BookCard book={d} /></div>)
                : loading ? <PageHandle text="Loading..." /> : <PageHandle text="No Books Found" />
            }
        </div>

    </div>
}

export default Books;