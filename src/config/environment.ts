import { from } from 'env-var';

const env = from(import.meta.env);

console.log(import.meta.env.VITE_OWM_API_KEY);
export const OWM_API_KEY = env.get('VITE_OWM_API_KEY').required().asString();
