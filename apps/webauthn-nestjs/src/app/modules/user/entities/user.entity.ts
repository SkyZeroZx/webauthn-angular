import { genSaltSync, hashSync } from 'bcryptjs';
import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	Unique,
	UpdateDateColumn
} from 'typeorm';

import { AuthenticationEntity } from '../../auth/entities/authentication.entity';
import { User } from '@skyzerozx/shared-interfaces';

@Entity()
@Unique(['username'])
export class UserEntity implements User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 255, nullable: false })
	username: string;

	@Column('varchar', { length: 80, nullable: false })
	name: string;

	@Column('varchar', { length: 255, nullable: false })
	lastName: string;

	@Column({ type: 'varchar', length: 128, nullable: false })
	password: string;

	@CreateDateColumn({ type: 'timestamp' })
	createdAt: string;

	@UpdateDateColumn({ type: 'timestamp' })
	updateAt: string;

	@OneToMany(() => AuthenticationEntity, (authentication) => authentication.user, {
		cascade: true
	})
	authentications: AuthenticationEntity[];

	@BeforeInsert()
	@BeforeUpdate()
	hashPassword() {
		if (!this.password) {
			return;
		}
		const salt = genSaltSync(10);
		this.password = hashSync(this.password, salt);
	}
}
