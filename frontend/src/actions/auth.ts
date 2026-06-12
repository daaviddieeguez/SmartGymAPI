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

    cookieStore.set({
      name: 'refreshToken',
      value: data.refreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    });

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function registerUser(formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');
  const dni = formData.get('dni');
  const name = formData.get('name');
  const birthdate = formData.get('birthdate');
  const address = formData.get('address');
  const locality = formData.get('locality');
  const province = formData.get('province');
  const postCode = formData.get('postCode');
  const phoneNumber = formData.get('phoneNumber');

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        dni,
        name,
        birthdate,
        address,
        locality,
        province,
        postCode,
        phoneNumber
      }),
    });

    if (!response.ok) {
      throw new Error('Registration failed. Email might already be in use.');
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

    cookieStore.set({
      name: 'refreshToken',
      value: data.refreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7
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

export async function getUserSession() {
  const token = await getToken();
  if (!token) return null;
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      Buffer.from(base64, 'base64')
        .toString('binary')
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const payload = JSON.parse(jsonPayload);
    return {
      role: (payload.role as string) || null,
      userId: payload.userId ? Number(payload.userId) : null,
      email: (payload.sub as string) || null,
    };
  } catch {
    return null;
  }
}

export async function logoutUser() {
  const token = await getToken();

  if (token) {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Failed to invalidate token on backend:', error);
    }
  }

  const cookieStore = await cookies();
  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');

  return { success: true };
}

export async function refreshAccessToken() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!refreshToken) {
    return false;
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      cookieStore.delete('accessToken');
      cookieStore.delete('refreshToken');
      return false;
    }

    const data = await response.json();

    cookieStore.set({
      name: 'accessToken',
      value: data.accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24
    });

    cookieStore.set({
      name: 'refreshToken',
      value: data.refreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    });

    return true;
  } catch (error) {
    console.error('Failed to refresh access token:', error);
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');
    return false;
  }
}