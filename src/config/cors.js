export const corsOptions = {
    origin: process.env.PORT_CORS || 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200
  };