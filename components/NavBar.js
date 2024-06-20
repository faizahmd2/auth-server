import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavBar () {
    let isAuthenticated = false;
    const pathname = usePathname()
    return (
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
                        {isAuthenticated ? 'Logout' : 'Login'}
                    </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}