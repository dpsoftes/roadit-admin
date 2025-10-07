export class Validators {
  /**
   * Validates email format
   */
  static email(value: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }
  
  /**
   * Validates password strength
   */
  static password(value: string, options?: {
    minLength?: number;
    requireUppercase?: boolean;
    requireLowercase?: boolean;
    requireNumbers?: boolean;
    requireSpecialChars?: boolean;
  }): { valid: boolean; errors: string[] } {
    const opts = {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      ...options
    };
    
    const errors: string[] = [];
    
    if (value.length < opts.minLength) {
      errors.push(`Password must be at least ${opts.minLength} characters long`);
    }
    
    if (opts.requireUppercase && !/[A-Z]/.test(value)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    
    if (opts.requireLowercase && !/[a-z]/.test(value)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    
    if (opts.requireNumbers && !/\d/.test(value)) {
      errors.push('Password must contain at least one number');
    }
    
    if (opts.requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      errors.push('Password must contain at least one special character');
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }
  
  /**
   * Validates Spanish phone number
   */
  static phoneES(value: string): boolean {
    const phoneRegex = /^(\+34|34)?[6-9]\d{8}$/;
    return phoneRegex.test(value.replace(/\s/g, ''));
  }
  
  /**
   * Validates Spanish DNI
   */
  static dniES(value: string): boolean {
    const dniRegex = /^\d{8}[A-Z]$/;
    if (!dniRegex.test(value)) return false;
    
    const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
    const number = parseInt(value.substring(0, 8), 10);
    const letter = value.substring(8, 9);
    
    return letters[number % 23] === letter;
  }
}