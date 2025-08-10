# Local Business Registration Platform

A **MERN stack** web application designed to register and list local businesses from different cities and villages.  
The platform allows vendors to register their businesses with essential details, making it easy for customers to discover local services.  
The focus is on **simplicity**, without delivery or payment integrations.

---

## 📌 Features

- **Business Registration Form** – Vendors can register their business with details like name, category, contact, and location.
- **View All Registered Businesses** – Users can browse all listed businesses.
- **Responsive UI** – Mobile-friendly and professional-looking interface.
- **MongoDB Integration** – Secure and persistent data storage.
- **Simple Architecture** – No delivery or payment features for ease of deployment.

---

## 🛠 Tech Stack

### **Frontend**
- React.js
- HTML, CSS, Bootstrap
- Axios (for API requests)

### **Backend**
- Node.js
- Express.js

### **Database**
- MongoDB (via Mongoose ODM)

---

## 📂 Project Structure

```bash
localbiz-platform/
│
├── backend/
│   ├── models/        # Mongoose schemas
│   ├── routes/        # API routes
│   ├── server.js      # Entry point
│
├── frontend/
│   ├── public/        # Static files
│   ├── src/           # React components & pages
│   ├── package.json   # Frontend dependencies
│
├── README.md          # Project documentation
└── package.json       # Backend dependencies
