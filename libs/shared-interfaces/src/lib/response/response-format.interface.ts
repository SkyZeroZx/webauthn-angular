export interface ResponseFormat<T = unknown> {
	isArray: boolean;
	path: string;
	duration: string;
	method: string;
	data: T;
}
