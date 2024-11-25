# Agribasket E-Commerce Application  

**Agribasket** is a robust e-commerce platform focused on agricultural products, built using the MERN stack. It provides a seamless experience for users to explore, purchase, and manage products with features tailored for both shoppers and admins.  

---  

## Features  
- User authentication (Sign-up/Sign-in)  
- Admin dashboard with:  
  - Header and sidebar components  
  - Product management (Create, List, Update, Delete)  
- Shopping interface:  
  - Product listing and details view  
  - Search functionality  
  - Cart management  
  - Checkout process  
  - User account page  
  - Home page with featured products  
  - Review functionality for products  
- Fully responsive design for all devices  

---  

## Installation and Setup Instructions  

### Prerequisites  
Ensure you have the following installed:  
- [Node.js](https://nodejs.org/) (v14 or higher)  
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)  
- A package manager like [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)  

---  

### Backend Setup  
1. Clone the repository:  
   ```bash  
   git clone https://github.com/your-username/Agribasket.git  
   cd Agribasket/backend  
Install dependencies:

    npm install  
Create a .env file in the backend directory and add the following:

    PORT=5000  
    MONGO_URI=<Your MongoDB Connection String>  
    JWT_SECRET=<Your JWT Secret Key>  
Start the backend server:


    npm start  
Frontend Setup
Navigate to the frontend directory:


    cd ../frontend  
Install dependencies:


    npm install  
Create a .env file in the frontend directory and add:

    REACT_APP_API_URL=http://localhost:5000  
Start the frontend development server:

    npm start  
Usage
Open your browser and visit:

    Frontend: http://localhost:3000
    Backend API: http://localhost:5000

Use the admin credentials to manage products or sign up as a new user to explore the shopping experience.

Technologies Used: 

Frontend: React.js

Backend: Node.js, Express.js

Database: MongoDB

Authentication: JSON Web Tokens (JWT)

Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes.

License

This project is licensed under the MIT License.

Contact

For any inquiries or feedback, feel free to contact:

Author: Shivasai

Email: mamidalashivasai789@gmail.com

GitHub: shivasai789


Replace placeholders like `<Your MongoDB Connection String>` and `your-email@example.com` with actual details before using.
