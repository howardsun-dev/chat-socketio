export interface ServerError {
  log?: string;
  status?: number;
  message?: any; // Consider using a more specific type for the message
}
