export const corsOptions = {
  origin: process.env.PORT_CORS || "https://dr-integradora.vercel.app",
  credentials: true,
  optionsSuccessStatus: 200,
};
