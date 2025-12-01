# Tech Haven - E-Commerce Website

Tech Haven is a modern, responsive e-commerce website for technology products. Built with vanilla HTML, CSS, and JavaScript, it provides a seamless shopping experience with features like product browsing, comparison, cart management, and user authentication.

## 🚀 Features

- **Product Catalog**: Browse and filter products by category and price
- **Product Details**: View detailed specifications and information
- **Product Comparison**: Compare multiple products side-by-side
- **Shopping Cart**: Add, remove, and manage items in your cart
- **User Authentication**: Login and signup pages with social login options
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Search Functionality**: Search for products across the catalog
- **Payment Integration**: Checkout page with payment options

## 🛠️ Tech Stack

### Frontend Technologies
- **HTML5**: Semantic markup for structure
- **CSS3**: Modern styling with flexbox, grid, and responsive design
- **JavaScript (ES6+)**: Vanilla JavaScript for interactivity and dynamic content
  - No frameworks or libraries required
  - Modular JavaScript architecture
  - DOM manipulation and event handling

### Project Structure
```
TechHaven/
├── index.html              # Homepage
├── products.html           # Product listing page
├── productDetails.html     # Individual product details
├── compare.html            # Product comparison page
├── cart.html               # Shopping cart
├── login.html              # User login page
├── signup.html             # User registration page
├── Payment.html            # Checkout page
├── Aboutus.html            # About us page
├── Contactus.html          # Contact page
├── css/                    # Stylesheets
│   ├── index.css
│   ├── products.css
│   ├── productDetails.css
│   ├── compare.css
│   ├── cart.css
│   ├── auth.css
│   ├── Payment.css
│   └── ...
├── js/                     # JavaScript files
│   ├── products.js         # Product data and filtering
│   ├── productDetails.js   # Product details logic
│   ├── compare.js          # Comparison functionality
│   ├── cart.js             # Cart management
│   └── navbar.js           # Navigation functionality
└── public/                 # Static assets
    ├── ai/                 # AI-generated product images
    ├── products/           # Product images
    └── ...                 # Icons, logos, and other assets
```

## 📋 Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, but recommended)

## 🔧 Installation

### Option 1: Direct File Opening (Simple)
1. Clone or download this repository
2. Navigate to the project directory
3. Open `index.html` directly in your web browser

**Note**: Some features may not work correctly when opening files directly due to browser security restrictions (CORS). Use a local server for best results.

### Option 2: Using a Local Web Server (Recommended)

#### Using Python (if installed):
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open: `http://localhost:8000`

#### Using Node.js (if installed):
```bash
# Install http-server globally
npm install -g http-server

# Run the server
http-server -p 8000
```

Then open: `http://localhost:8000`

#### Using PHP (if installed):
```bash
php -S localhost:8000
```

Then open: `http://localhost:8000`

#### Using VS Code Live Server Extension:
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 🏃 Running the Project

1. **Start a local web server** (using one of the methods above)
2. **Open your browser** and navigate to `http://localhost:8000`
3. **Navigate to `index.html`** to see the homepage

### Accessing Different Pages:
- Homepage: `http://localhost:8000/index.html`
- Products: `http://localhost:8000/products.html`
- Login: `http://localhost:8000/login.html`
- Signup: `http://localhost:8000/signup.html`
- Cart: `http://localhost:8000/cart.html`
- Compare: `http://localhost:8000/compare.html`

## 📁 Key Files

- **`index.html`**: Main homepage with hero section and featured products
- **`products.html`**: Product listing with filters and sorting
- **`productDetails.html`**: Individual product detail page
- **`js/products.js`**: Contains product data array and filtering logic
- **`js/cart.js`**: Shopping cart functionality and item management
- **`css/index.css`**: Main stylesheet with global styles

## 🎨 Design Features

- Clean, modern UI with a yellow and black color scheme
- Responsive grid layouts
- Interactive product cards with hover effects
- Filterable and sortable product listings
- Side-by-side product comparison
- Shopping cart with quantity controls
- User authentication pages with social login options

## 🔍 Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Notes

- This is a frontend-only project with no backend integration
- Product data is stored in JavaScript arrays
- Cart data is stored in browser memory (not persistent)
- All images are stored locally in the `public` folder
- AI-generated product images are located in `public/ai/`

## 👥 Authors

- B_i253124
- B_i253143

## 📄 License

This project is created for educational purposes.

---

**Tech Haven** - Gear That Works Smarter 🚀
