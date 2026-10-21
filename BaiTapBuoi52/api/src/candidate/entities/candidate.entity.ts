export class Candidate {
  id!: number;
  name!: string;
  phone!: string;
  email!: string;
  gender?: string;
  province_id!: number;
  ward_id?: number;
  address_detail?: string;
  created_at?: string;
  created_by!: number;
  modified_at?: string | null;
  modified_by?: number | null;
  deleted_at?: string | null;
  deleted_by?: number | null;
  active!: boolean;

  constructor(init?: Partial<Candidate>) {
    Object.assign(this, init);
  }
}