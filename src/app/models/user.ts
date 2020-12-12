import Plan from './plan';

interface User {
  _id?: string;
  name: string;
  email: string;
  plan?: string | Plan | any;
  role: string;
  store?: string;
  password?: string;
}

export default User;
