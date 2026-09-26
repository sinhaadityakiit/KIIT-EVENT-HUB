export interface KiitIdentity {
  isValid: boolean;
  email: string;
  isStudent: boolean;
  rollNumber: string | null;
  error?: string;
}

/**
 * Validates whether an email belongs to the official KIIT University domain (@kiit.ac.in)
 * and extracts the student roll number if matching the student pattern.
 */
export function validateKiitEmail(email: string): KiitIdentity {
  if (!email || typeof email !== 'string') {
    return {
      isValid: false,
      email: '',
      isStudent: false,
      rollNumber: null,
      error: 'Please enter a valid email address.',
    };
  }

  const normalized = email.trim().toLowerCase();
  const domainPattern = /^[a-zA-Z0-9._%+-]+@kiit\.ac\.in$/;

  if (!domainPattern.test(normalized)) {
    return {
      isValid: false,
      email: normalized,
      isStudent: false,
      rollNumber: null,
      error: 'Access restricted to official @kiit.ac.in university email addresses only.',
    };
  }

  // Student email pattern: <roll_number>@kiit.ac.in (e.g. 21051234@kiit.ac.in)
  const studentPattern = /^([0-9]{7,8})@kiit\.ac\.in$/;
  const match = normalized.match(studentPattern);

  if (match) {
    return {
      isValid: true,
      email: normalized,
      isStudent: true,
      rollNumber: match[1],
    };
  }

  // Faculty, Staff, or KSAC administrative email
  return {
    isValid: true,
    email: normalized,
    isStudent: false,
    rollNumber: null,
  };
}
