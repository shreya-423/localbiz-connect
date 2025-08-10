import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const categories = [
  "Retail",
  "Fashion",
  "Education",
  "Health",
  "Automotive",
  "Real Estate",
  "Entertainment",
  "Travel & Tourism",
  "Construction",
  "Finance",
  "Food & Drink",
  "Beauty & Wellness",
  "Sports & Fitness",
  "Home & Garden",
  "Food & Beverage",
  "Services",
  "Health & Wellness",
  "Education",
  "Art & Craft",
  "Technology",
  "Other"
];

function BusinessForm() {
  const [formData, setFormData] = useState({
    name: '',
    owner: '',
    category: '',
    location: '',
    contact: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'contact') {
      if (value === '' || /^[0-9\b]+$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (message.text) setMessage({ type: '', text: '' });
  };

  const validateForm = () => {
    const { name, owner, category, location, contact } = formData;
    if (!name || !owner || !category || !location || !contact) {
      setMessage({ type: 'error', text: 'Please fill all the fields.' });
      return false;
    }
    if (contact.length !== 10) {
      setMessage({ type: 'error', text: 'Contact number must be 10 digits.' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/businesses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        setMessage({ type: 'success', text: data.message || '✅ Business registered successfully!' });
        setFormData({
          name: '',
          owner: '',
          category: '',
          location: '',
          contact: ''
        });
      } else {
        setMessage({ type: 'error', text: data.message || 'Something went wrong.' });
      }
    } catch (err) {
      console.error("Registration error:", err);
      setMessage({ type: 'error', text: 'Failed to register business. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow border-0">
            <div className="card-header bg-dark text-white text-center">
              <h3 className="mb-0">Register a Local Business</h3>
            </div>
            <div className="card-body p-4">
              {message.text && (
                <div
                  className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'}`}
                  role="alert"
                  aria-live="assertive"
                >
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="name" className="form-label fw-semibold">Business Name</label>
                  <input
                    id="name"
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter business name"
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="owner" className="form-label fw-semibold">Owner's Name</label>
                  <input
                    id="owner"
                    type="text"
                    className="form-control"
                    name="owner"
                    value={formData.owner}
                    onChange={handleChange}
                    required
                    placeholder="Enter owner name"
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="category" className="form-label fw-semibold">Business Category</label>
                  <select
                    id="category"
                    className="form-select"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>-- Select Category --</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="location" className="form-label fw-semibold">Location</label>
                  <input
                    id="location"
                    type="text"
                    className="form-control"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    placeholder="Enter location"
                  />
                </div>

                <div className="form-group mb-4">
                  <label htmlFor="contact" className="form-label fw-semibold">Contact Number</label>
                  <input
                    id="contact"
                    type="tel"
                    className="form-control"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                    maxLength="10"
                    pattern="[0-9]{10}"
                    placeholder="Enter 10-digit contact number"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100 fw-bold"
                  disabled={loading}
                >
                  {loading ? 'Registering...' : 'Register Business'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusinessForm;
