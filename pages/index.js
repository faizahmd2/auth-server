import Link from 'next/link'

const Home = () => {

  return (
    <h3 style={{textAlign: 'center'}}>Welcome To Book App!!! <br /> Please <Link style={{textDecoration: 'unset'}} href='/login'>Login</Link> to Find Books</h3>
  );
};

export default Home;
