export interface User {
  _id: string;
  name: string;
  phone: string;
  role: 'admin' | 'center' | 'member';
}
