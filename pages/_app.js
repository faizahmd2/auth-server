import '../styles/globals.css'
import '../libs/css/bootstrap.min.css'
import '../libs/css/fontawesome.min.css'
import Head from "next/head";
// import Script from 'next/script'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const MyApp = ({ Component, pageProps }) => {
    const pathname = usePathname()
    return <>
        <Head>
            <title>Books</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        {/* <Script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/js/bootstrap.min.js" /> */}
        {/* <Script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.2.0/js/fontawesome.min.js" /> */}
        <nav className="navbar navbar-expand-lg mb-3" style={{ backgroundColor: '#e3f2fd' }}>
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Book App</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className={`nav-link ${pathname === '/' ? 'active' : ''}`} href="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${pathname === '/books' ? 'active' : ''}`} href="/books">
                                Books
                            </Link>
                        </li>
                    </ul>
                    <div className="d-flex">
                    <Link className={`auth-text me-2 ${pathname === '/books' ? 'active' : ''}`} style={{ cursor: 'pointer' }} href="/login">
                        Login
                    </Link>
                    </div>
                </div>
            </div>
        </nav>
        <Component {...pageProps} />
    </>
};

export default MyApp;