import * as env from 'env-var';

env.from(import.meta.env);

export const OWM_API_KEY = env.get('VITE_OWM_API_KEY').required().asString();
