import React from 'react';
import Navbar from './components/Navbar';
import BusinessForm from './components/BusinessForm';
import BusinessList from './components/BusinessList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section
        className="d-flex align-items-center justify-content-center text-white text-center"
        style={{
          position: 'relative',
          backgroundImage: "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          width: '100%',
          padding: '4rem 1rem',
          marginBottom: '3rem',
        }}
      >
        {/* Dark Overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            zIndex: 1,
          }}
        />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '700px' }}>
          <h1 className="display-4 fw-bold mb-3">Support Local Businesses</h1>
          <p className="lead fs-4">Discover, Register & Grow Together!</p>
          <a
            href="#form"
            className="btn btn-light btn-lg mt-4 shadow"
            aria-label="Scroll to business registration form"
          >
            Register Your Business
          </a>
        </div>
      </section>

      {/* Registration Form Section */}
      <section id="form" className="container mb-5">
        <BusinessForm />
      </section>

      <hr />

      {/* Business List Section */}
      <section id="list" className="container mb-5">
        <BusinessList />
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} LocalBiz Support | Connect. Grow. Thrive.
        </p>
      </footer>
    </>
  );
}

export default App;
