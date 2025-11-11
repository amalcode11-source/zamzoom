# Zamzoom - Premium E-commerce Platform

A modern, production-ready e-commerce platform for honey, nuts, and combo products. Built with React, TypeScript, and deployed on Netlify.

## 🚀 Features

- **Frontend**: React + TypeScript + TailwindCSS
- **Backend**: Netlify Functions (Node.js)
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Netlify Identity (JWT)
- **Payments**: Razorpay integration
- **File Storage**: Cloudinary
- **Deployment**: Netlify Free Tier

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Routing**: React Router
- **State Management**: React Query + Context API
- **Form Validation**: Zod
- **Icons**: Lucide React
- **Backend**: Netlify Functions
- **Database**: Neon (PostgreSQL) + Drizzle ORM
- **Authentication**: Netlify Identity
- **Payments**: Razorpay Checkout
- **File Upload**: Cloudinary

## 🏗️ Project Structure

```
zamzoom/
├── app/                    # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom hooks
│   │   └── lib/            # Utilities
├── netlify/                # Backend functions
│   └── functions/          # API endpoints
├── drizzle/                # Database schema
├── scripts/                # Utility scripts
└── docs/                   # Documentation
```

## 🏃‍♂️ Quick Start

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Setup
1. Copy `.env.example` to `.env`
2. Add your API keys and database URL
3. Configure Razorpay, Cloudinary, and Neon

## 🚀 Deployment

### Netlify Deployment
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

## 🗄️ Database Schema

- **users**: Customer and admin accounts
- **products**: Product catalog
- **orders**: Order management
- **order_items**: Order line items

## 🔐 API Endpoints

### Public
- `GET /products-get` - Get all products
- `GET /product-get` - Get product by slug
- `POST /cart-validate` - Validate cart items
- `POST /order-create` - Create new order
- `POST /order-webhook` - Payment webhook

### Admin
- `POST /admin-product-create` - Create product
- `POST /admin-product-update` - Update product
- `POST /admin-product-delete` - Delete product
- `POST /admin-order-status-update` - Update order status

## 📱 Pages

- **Home**: Hero section and featured products
- **Catalog**: Product grid with filters
- **Product Details**: Individual product page
- **Cart**: Shopping cart management
- **Checkout**: Payment processing
- **Orders**: Order history
- **Admin**: Product and order management
- **Authentication**: Login/Register

## 🎨 UI Features

- Mobile-first responsive design
- Dark/light mode support
- Smooth animations and transitions
- Loading states and error handling
- Toast notifications
- SEO optimized

## 🛡️ Security

- JWT-based authentication
- Role-based access control
- Input validation with Zod
- CORS protection
- Environment variable management

## 📊 Performance

- Code splitting with Vite
- Lazy loading
- Image optimization
- Gzip compression
- CDN delivery via Netlify

## 🧪 Testing

- TypeScript for type safety
- ESLint for code quality
- Prettier for formatting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🚀 Live Demo

Visit the live site: [Your Netlify URL]

## 📞 Support

For support, email support@example.com or open an issue on GitHub.

---

Built with ❤️ using modern web technologies.