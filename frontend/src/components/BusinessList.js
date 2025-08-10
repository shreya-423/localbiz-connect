import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import './BusinessList.css';

function BusinessList() {
  const [businesses, setBusinesses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    fetchBusinesses(); // Load all businesses initially
  }, []);

  const fetchBusinesses = async () => {
    try {
      const params = {};
      if (searchTerm.trim()) params.search = searchTerm.trim();
      if (locationFilter) params.location = locationFilter;
      if (categoryFilter) params.category = categoryFilter;

     const res = await axios.get('https://local-biz-support-backend.onrender.com/api/businesses', { params });
      setBusinesses(res.data);
      setVisibleCount(6); // Reset count on each new search
    } catch (err) {
      console.error('Error fetching businesses:', err);
    }
  };

  const handleSearch = () => {
    fetchBusinesses(); // Fetch filtered data from backend
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <div className="business-list container mt-4">
      <h2 className="mb-4">Explore Local Businesses</h2>

      {/* Search + Filters */}
      <Row className="mb-3">
        <Col md={3}>
          <Form.Control
            type="text"
            placeholder="Search by name or owner"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
            <option value="">All Locations</option>
            <option value="Nagpur">Nagpur</option>
            <option value="Wardha">Wardha</option>
            <option value="Pune">Pune</option>
            <option value="Nashik">Nashik</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Chennai">Chennai</option>
            <option value="Yavatmal">Yavatmal</option>
            <option value="Amravati">Amravati</option>
            <option value="Aurangabad">Aurangabad</option>
            <option value="Akola">Akola</option>
            <option value="Solapur">Solapur</option>
            <option value="Thane">Thane</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="">All Categories</option>
            <option value="Food & Beverages">Food & Beverages</option>
            <option value="Grocery">Grocery</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Health & Wellness">Health & Wellness</option>
            <option value="Education">Education</option>
            <option value="Automotive">Automotive</option>
            <option value="Real Estate">Real Estate</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Travel & Tourism">Travel & Tourism</option>
            <option value="Construction">Construction</option>
            <option value="Finance">Finance</option>
            <option value="Beauty & Wellness">Beauty & Wellness</option>
            <option value="Sports & Fitness">Sports & Fitness</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Button variant="primary" onClick={handleSearch} className="w-100">Search</Button>
        </Col>
      </Row>

      {/* Business Cards */}
      <Row>
        {businesses.slice(0, visibleCount).map((biz, index) => (
          <Col md={4} className="mb-4" key={index}>
            <Card className="business-card h-100 shadow-sm">
              <Card.Body>
                <Card.Title>{biz.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{biz.owner}</Card.Subtitle>
                <Card.Text>
                  <strong>Category:</strong> {biz.category}<br />
                  <strong>Location:</strong> {biz.location}<br />
                  <strong>Contact:</strong> {biz.contact}
                </Card.Text>
                <Button variant="outline-primary" href="#" className="mt-2">Explore</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Load More Button */}
      {visibleCount < businesses.length && (
        <div className="text-center mt-4">
          <Button variant="primary" onClick={handleLoadMore}>Load More</Button>
        </div>
      )}
    </div>
  );
}

export default BusinessList;
