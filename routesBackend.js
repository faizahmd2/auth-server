import loginRoutes from './app/routes/login.js';
import bookRoutes from './app/routes/books.js';
import reviewRoutes from './app/routes/review.js';

const router = (app) => {
    app.use(loginRoutes);
    app.use(bookRoutes);
    app.use(reviewRoutes);
}

export default router;