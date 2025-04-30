import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const sendContactForm = async (formData: {
  name: string;
  email: string;
  message: string;
}) => {
  try {
    // Create a FormData object for Web3Forms
    const web3FormData = new FormData();
    web3FormData.append('access_key', '2abc227c-88da-447c-93ae-1b36d7fb7781');
    web3FormData.append('name', formData.name);
    web3FormData.append('email', formData.email);
    web3FormData.append('message', formData.message);
    web3FormData.append('from_name', 'Portfolio Contact Form');
    web3FormData.append('subject', 'New Contact Form Submission');
    
    // Send the form data to Web3Forms
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: web3FormData,
    });
    
    // Parse the JSON response
    const result = await response.json();
    
    // Check if the submission was successful
    if (result.success) {
      return result;
    } else {
      throw new Error(result.message || 'Failed to send message');
    }
  } catch (error) {
    console.error('Error sending form:', error);
    throw error;
  }
};
