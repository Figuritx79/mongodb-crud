export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Error interno del servidor';
    
    res.status(statusCode).json({ 
      success: false,
      message,
      stack: process.env.NODE_ENV === 'dev' ? err.stack : undefined
    });
  };