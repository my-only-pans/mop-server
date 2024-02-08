export default function getErrorMessage(error: any) {
  return {
    error: (error as Error).message || 'An unexpected error occurred',
  }
}