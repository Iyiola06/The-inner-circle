export function sanitizeLog(data: any): any {
  if (typeof data !== 'object' || data === null) return data;
  const piiFields = ['email', 'phone', 'full_name', 'password', 'token'];
  const sanitized = { ...data };
  for (const field of piiFields) {
    if (field in sanitized) sanitized[field] = '[REDACTED]';
  }
  return sanitized;
}
