'use server'

import { cookies } from 'next/headers';

export async function loginUser(formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Credenciales inválidas');
    }

    const data = await response.json();

    const cookieStore = await cookies();
    cookieStore.set({
      name: 'accessToken',
      value: data.accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24
    });

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get('accessToken')?.value;
}