export default function maskEmail(email: string): string {
  const emailSplit = email.split('@');
  const [username, domain] = emailSplit;

  const maskedUsername = username.length > 2 ? username.slice(0, 2) + '*'.repeat(username.length - 2) : username;
  const maskedDomain =
    domain.length > 4 ? domain.slice(0, 2) + '*'.repeat(domain.length - 4) + domain.slice(-2) : domain;

  return maskedUsername + '@' + maskedDomain;
}
