export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const handleApiError = (error: unknown): AppError => {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    return new AppError(error.message);
  }

  return new AppError('An unexpected error occurred');
};

export const isAppError = (error: unknown): error is AppError => {
  return error instanceof AppError;
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

export const logError = (error: unknown, context?: string): void => {
  const timestamp = new Date().toISOString();
  const errorMessage = getErrorMessage(error);
  const errorDetails = {
    timestamp,
    message: errorMessage,
    context,
    error: error instanceof Error ? {
      name: error.name,
      stack: error.stack,
    } : error,
  };

  console.error('Error occurred:', errorDetails);

  // In production, you might want to send this to an error tracking service
  if (process.env.NODE_ENV === 'production') {
    // Example: sendToErrorTracking(errorDetails);
  }
}; 