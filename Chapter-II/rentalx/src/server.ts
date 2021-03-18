import express from 'express';

import { categoriesRoutes } from './routes/categories.routes';
import { specificationsRoutes } from './routes/specifications.routes';

const PORT = 3333;

const app = express();

app.use(express.json());

app.use('/categories', categoriesRoutes);
app.use('/specifications', specificationsRoutes);

app.listen(PORT, () => console.log(`🔥️ Server is running at port ${PORT}`));
