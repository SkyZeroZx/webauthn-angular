export interface ErrorMessage {
	title: string;
	message: string;
	icon: string;
}

export type ErrorMapper = ErrorMessage & { toCompare: string };
