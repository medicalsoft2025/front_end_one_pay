import { RoleModel } from "./roleModel";

export interface UserModel {
  id: string;
  fullName: string;
  email: string;
  active: boolean;
  tenantId: string;
  role: RoleModel;
}
