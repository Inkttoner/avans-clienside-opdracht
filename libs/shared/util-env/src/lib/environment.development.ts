import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
    production: false,

    ROOT_DOMAIN_URL: 'https://mango-meadow-014b9b503.5.azurestaticapps.net',
    dataApiUrl: 'https://data-api-clientside-chg6gdgqetf6cffk.canadacentral-01.azurewebsites.net/api',
    rcmdApiUrl: 'https://trinitas-rcmnd-api.azurewebsites.net/api',

    MONGO_DB_CONNECTION_STRING: 'mongodb://localhost:27017/trinitas',
    NEO4J_USER: 'neo4j',
    NEO4J_PASSWORD: 'cicstyamQ6fuqMwIxHKSrZUJWpl1gH-nnknsxib0tBg',
};
