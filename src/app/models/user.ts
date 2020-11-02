import Plan from './plan';
import Store from './store';

interface User {
  name: string;
  email: string;
  store?: Store;
  plan: Plan;
  role: string;
}

export default User;
