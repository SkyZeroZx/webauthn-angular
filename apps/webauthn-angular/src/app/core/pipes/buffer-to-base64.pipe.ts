import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'bufferToBase64',
	standalone: true
})
export class BufferToBase64Pipe implements PipeTransform {
	transform(buffer: Uint8Array): string {
		const uint8Array = new Uint8Array(buffer['data']);

		const binaryString = String.fromCharCode.apply(null, uint8Array);

		return btoa(binaryString);
	}
}
