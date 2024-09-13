export interface DatabaseConfig {
	host: string;
	port: number;
	database: string;
	username: string;
	password: string;
	autoLoadEntities: boolean;
	synchronize: boolean;
	logging: boolean;
	ssl: boolean;
}
