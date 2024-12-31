'use server';

import {
  LoginFormSchema,
  RegisterFormSchema,
} from './definitions';
import SatellitePublic from '@services/satellite/public';
import { UserLogin, UserRegister, formatMessage } from '@interfaces/data-types';
import { cookies } from 'next/headers';
import { FormState } from '@interfaces/interface-items';
import SatellitePrivate from '@services/satellite/private';
import { AxiosError } from 'axios';

export async function login(
  state: FormState,
  formData: FormData,
): Promise<FormState> {

  try {
    const email = formData.get('email');
    const password = formData.get('password');

    const validatedFields = LoginFormSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    if (!validatedFields.success) {
      return {
        status: false,
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    let user: UserLogin | null = null;
    const res = await SatellitePublic.post(
      '/auth/login',
      {
        email: email,
        password: password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (res.status === 401) {
      return {
        status: false,
        message: 'Invalid email or password.',
      };
    }
    const response = res.data;

    if (response.data && isUserLogin(response.data)) {
      user = response.data; 
    }

    if (!response.success) {
      return { 
        status: false,
        message: response.message 
      };
    }
    
    const jwtToken = user?.access_token;
    if (jwtToken) {
      const cookiesObj = await cookies(); 
      cookiesObj.set('TOKEN_AUTH', jwtToken,{
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
      });
      return { 
        status: true,
        message: response.message 
      };
    } else {
      return { 
        status: false,
        message: 'User data not found.' 
      };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message || 'An error occurred.';
      return {
        status: false,
        message: message || 'Unexpected server error.',
      };
    } else {
      console.error('Unexpected error:', error);
      return {
        status: false,
        message: 'An unexpected error occurred.',
      };
    }
  } finally {
    if (state) {
      state.errors = {};
    }
  }
}

export async function register(
  state: FormState,
  formData: FormData,
): Promise<FormState> {

  try {
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirm_password = formData.get('confirm_password');
    const validatedFields = RegisterFormSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirm_password: formData.get('confirm_password'),
    });

    if (!validatedFields.success) {
      return {
        status: false,
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    let user: UserRegister | null = null;
    const res = await SatellitePublic.post(
      '/auth/register',
      {
        name: name,
        email: email,
        password: password,
        confirm_password: confirm_password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (res.status === 401) {
      return {
        status: false,
        message: 'Invalid email or password.',
      };
    }
    const response = res.data;
    console.log(response);
    if (response.data && isUserRegister(response.data)) {
      user = response.data; 
    }
    console.log(user);

    if (!response.success) {
      return { 
        status: false,
        message: response.message 
      };
    }

    const jwtToken = user?.token;
    if (jwtToken) {
      const cookiesObj = await cookies(); 
      cookiesObj.set('TOKEN_AUTH', jwtToken,{
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
      });
      return { 
        status: true,
        message: response.message 
      };
    } else {
      return { 
        status: false,
        message: 'User data not found.' 
      };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message || 'An error occurred.';
      return {
        status: false,
        message: message || 'Unexpected server error.',
      };
    } else {
      console.error('Unexpected error:', error);
      return {
        status: false,
        message: 'An unexpected error occurred.',
      };
    }
  } finally {
    if (state) {
      state.errors = {};
    }
  }
}

function isUserLogin(data: unknown): data is UserLogin {
  return (
    typeof data === 'object' &&
    data !== null &&
    'name' in data &&
    'email' in data &&
    'access_token' in data
  );
}

function isUserRegister(data: unknown): data is UserRegister {
  return (
    typeof data === 'object' &&
    data !== null &&
    'name' in data &&
    'token' in data
  );
}

export async function logout() {
  const res = await SatellitePrivate.post<formatMessage>('/logout');
  return res.data;
}

export async function deleteCookies(){
  const cookiesObj = await cookies(); 
  cookiesObj.set('TOKEN_AUTH', '', { maxAge: -1, path: '/' });
}
