import { RoleModel } from "./roleModel";

export interface UserModel {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  twoFactorEnabled: boolean;
  active: boolean;
  tenantId: string;
  role: RoleModel;
}
