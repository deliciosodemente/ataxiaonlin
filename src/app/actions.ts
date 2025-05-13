"use server";

import { z } from 'zod';
import { contactFormSchema } from '@/lib/schemas';

export type FormState = {
  message: string;
  status: 'success' | 'error' | 'idle';
};

export async function submitContactForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const validatedFields = contactFormSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    });

    if (!validatedFields.success) {
      return {
        message: "Validation failed: " + validatedFields.error.flatten().fieldErrors_messages.join(', '),
        status: 'error',
      };
    }
    
    // const { name, email, subject, message } = validatedFields.data;

    // In a real application, you would process the data here:
    // e.g., send an email, save to a database, etc.
    console.log("Form data received:", validatedFields.data);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      message: 'Message sent successfully! We will get back to you soon.',
      status: 'success',
    };
  } catch (error) {
    console.error("Error submitting form:", error);
    return {
      message: 'An unexpected error occurred. Please try again.',
      status: 'error',
    };
  }
}
