// import cookie from 'cookie';
// import { NextApiResponse, NextApiRequest } from 'next';

// export const setCookie = (
//   res: NextApiResponse,
//   name: string,
//   value: string,
//   options: cookie.SerializeOptions = {}
// ): void => {
//   const serialized = cookie.serialize(name, value, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'strict',
//     path: '/',
//     ...options,
//   });
//   res.setHeader('Set-Cookie', serialized);
// };

// export const getCookies = (req: NextApiRequest): Record<string, string> => {
//   const parsedCookies = cookie.parse(req.headers.cookie || '') as Record<string, string>;
//   return parsedCookies;
// };

// export const deleteCookie = (res: NextApiResponse, name: string): void => {
//   setCookie(res, name, '', { maxAge: -1 });
// };
