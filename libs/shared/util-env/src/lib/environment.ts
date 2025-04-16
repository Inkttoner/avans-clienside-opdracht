import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
    production: false,

    ROOT_DOMAIN_URL: 'dummy',
    dataApiUrl: 'http://localhost:3000/api',
    rcmdApiUrl: 'http://localhost:3100/api',

    MONGO_DB_CONNECTION_STRING: 'dummy',
    NEO4J_USER: 'dummy',
    NEO4J_PASSWORD: 'dummy'
};
