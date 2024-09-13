import { FormArray, FormGroup, FormControl } from '@angular/forms';

export type TypedFormControls<T extends Record<any, any>> = {
	[K in keyof T]-?: T[K] extends Array<infer R>
		? FormArray<R extends Record<any, any> ? FormGroup<TypedFormControls<R>> : FormControl<R>>
		: T[K] extends Record<any, any>
		? FormGroup<TypedFormControls<T[K]>>
		: FormControl<T[K]>;
};
