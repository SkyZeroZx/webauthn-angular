import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, Unique } from 'typeorm';

import { Authentication } from '@skyzerozx/shared-interfaces';

import { UserEntity } from '../../user/entities/user.entity';

@Entity()
@Unique(['credentialID'])
export class AuthenticationEntity implements Authentication {
	@PrimaryColumn()
	id: string; // String in base64 encoding

	@ManyToOne(() => UserEntity, (user) => user.authentications, {
		onDelete: 'CASCADE'
	})
	user: UserEntity;

	@Column({ type: 'varchar', nullable: false })
	device: string;

	@Column({ type: 'varchar', nullable: true })
	aaguid: string;

	@Column({ type: 'varchar', nullable: false })
	credentialDeviceType: string;

	@CreateDateColumn()
	createAt: string;

	@Column({ type: 'varchar', nullable: false })
	credentialID: string; // SQL: Encode to base64url then store as `TEXT`. Index this column

	@Column({ type: 'bytea', nullable: false })
	credentialPublicKey: Buffer; // SQL: Store raw bytes as `BYTEA`/`BLOB`/etc...

	@Column({ type: 'bigint', nullable: false })
	counter: number; // SQL: Consider `BIGINT` since some authenticators return atomic timestamps as counters
}
