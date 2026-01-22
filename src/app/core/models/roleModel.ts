import { PermissionModel } from "./permissionModel";

export interface RoleModel {
  id: string;
  name: string;
  description: string;
  tenantId: string;
  permissions: PermissionModel[];
}
