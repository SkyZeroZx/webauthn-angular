import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class RefreshService {
	private readonly _refreshSubject$ = new ReplaySubject<string>(1);

	get refresh$() {
		return this._refreshSubject$.asObservable();
	}

	refresh(value: string = null) {
		this._refreshSubject$.next(value);
	}
}
