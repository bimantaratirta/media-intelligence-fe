"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import type { UserRole } from "@/mocks/data/team";
import { roleLabels, rolePermissions, permissions } from "@/mocks/data/team";

const roles: UserRole[] = ["owner", "admin", "analyst", "viewer"];

export function RolePermissionsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Role Permissions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium">Permission</th>
                {roles.map((role) => (
                  <th key={role} className="text-center py-3 px-4 font-medium">
                    {roleLabels[role]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissions.map((permission) => (
                <tr key={permission.id} className="border-b last:border-0">
                  <td className="py-3 px-4">
                    <p className="text-sm font-medium">{permission.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {permission.description}
                    </p>
                  </td>
                  {roles.map((role) => {
                    const hasPermission = rolePermissions[role].includes(
                      permission.id
                    );
                    return (
                      <td key={role} className="text-center py-3 px-4">
                        {hasPermission ? (
                          <Check className="h-5 w-5 text-green-600 dark:text-green-400 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-gray-300 dark:text-gray-600 mx-auto" />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
