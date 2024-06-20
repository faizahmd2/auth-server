import '../styles/globals.css'
import '../libs/css/bootstrap.min.css'
import '../libs/css/fontawesome.min.css'
import NavBar from '../components/NavBar'

const MyApp = ({ Component, pageProps }) => {
    return <>
        <NavBar />
        <Component {...pageProps} />
    </>
};

export default MyApp;