interface APIResponse {
  status: number;
  message?: string;
  errors?: any;
  data?: any;
}

export default APIResponse;
