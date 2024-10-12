import { MarkdownComponent } from 'ngx-markdown';

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
	selector: 'app-json-viewer',
	standalone: true,
	imports: [MarkdownComponent , MatDialogModule],
	templateUrl: './json-viewer.component.html',
	styleUrl: './json-viewer.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class JsonViewerComponent {
	private readonly data = inject(MAT_DIALOG_DATA);
	title = this.data.title;
	jsonString = '```json\n' + JSON.stringify(this.data.json, null, 2);
}
