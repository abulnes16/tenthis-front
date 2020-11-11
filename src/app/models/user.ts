import Plan from './plan';

interface User {
  name: string;
  email: string;
  plan?: Plan;
  role: string;
}

export default User;
