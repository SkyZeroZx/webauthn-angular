import { Column, Entity, ManyToOne, PrimaryColumn, Unique } from 'typeorm';

import { Authentication } from '@skyzerozx/shared-interfaces';

import { UserEntity } from '../../user/entities/user.entity';

@Entity()
@Unique(['credentialID'])
export class AuthenticationEntity implements Authentication {
	@PrimaryColumn()
	// String in base64 encoding
	id: string;

	@ManyToOne(() => UserEntity, (user) => user.authentications, {
		onDelete: 'CASCADE'
	})
	user: UserEntity;

	@Column({ type: 'varchar', nullable: false })
	// SQL: Encode to base64url then store as `TEXT`. Index this column
	credentialID: string;

	@Column({ type: 'bytea', nullable: false })
	// SQL: Store raw bytes as `BYTEA`/`BLOB`/etc...
	credentialPublicKey: Buffer;

	@Column({ type: 'bigint', nullable: false })
	// SQL: Consider `BIGINT` since some authenticators return atomic timestamps as counters
	counter: number;
}
