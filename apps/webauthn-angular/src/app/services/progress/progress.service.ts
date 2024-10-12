import { Injectable, signal } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ProgressService {
	private readonly progressBarVisible = signal(false);

	get isVisible() {
		return this.progressBarVisible.asReadonly();
	}

	show() {
		this.progressBarVisible.set(true);
	}

	hide() {
		this.progressBarVisible.set(false);
	}
}
