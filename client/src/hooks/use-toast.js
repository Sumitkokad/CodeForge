import { useCallback } from 'react';

export function useToast() {
  const toast = useCallback(({ title, description, variant }) => {
    // Basic toast implementation using alert for demonstration
    let message = title;
    if (description) {
      message += '\\n' + description;
    }
    alert(message);
    // In a real app, replace this with a proper toast notification system
  }, []);

  return { toast };
}
