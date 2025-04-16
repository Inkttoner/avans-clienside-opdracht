export interface IEnvironment {
    production: boolean;

    ROOT_DOMAIN_URL: string;
    dataApiUrl: string;

    MONGO_DB_CONNECTION_STRING: string;
    NEO4J_USER: string;
    NEO4J_PASSWORD: string;
    rcmdApiUrl: string;

    // Hier kun je meer environment
    // variabelen zetten als dat nodig is
}
