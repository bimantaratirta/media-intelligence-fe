"use client";

import { useState } from "react";
import { toast } from "sonner";
import { TeamMemberTable } from "@/components/team/team-member-table";
import { InviteMemberDialog } from "@/components/team/invite-member-dialog";
import { RolePermissionsTable } from "@/components/team/role-permissions-table";
import { mockTeamMembers } from "@/mocks/data/team";
import type { TeamMember, UserRole } from "@/mocks/data/team";

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>(mockTeamMembers);
  const currentUserId = "m1"; // Current user's ID

  const handleInvite = async (email: string, role: UserRole) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newMember: TeamMember = {
      id: `m${Date.now()}`,
      name: email.split("@")[0],
      email,
      role,
      status: "pending",
      invitedAt: new Date().toISOString(),
    };

    setMembers((prev) => [...prev, newMember]);

    toast.success("Invitation Sent", {
      description: `An invitation has been sent to ${email}`,
    });
  };

  const handleChangeRole = (memberId: string, newRole: UserRole) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, role: newRole } : m))
    );

    toast.success("Role Updated", {
      description: "Team member role has been updated",
    });
  };

  const handleRemoveMember = (memberId: string) => {
    const member = members.find((m) => m.id === memberId);
    setMembers((prev) => prev.filter((m) => m.id !== memberId));

    toast.success("Member Removed", {
      description: `${member?.name} has been removed from the team`,
    });
  };

  const handleResendInvite = (memberId: string) => {
    const member = members.find((m) => m.id === memberId);

    toast.success("Invitation Resent", {
      description: `A new invitation has been sent to ${member?.email}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Team Management
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Manage team members and their access levels
          </p>
        </div>

        <InviteMemberDialog onInvite={handleInvite} />
      </div>

      {/* Members Table */}
      <TeamMemberTable
        members={members}
        currentUserId={currentUserId}
        onChangeRole={handleChangeRole}
        onRemoveMember={handleRemoveMember}
        onResendInvite={handleResendInvite}
      />

      {/* Role Permissions */}
      <RolePermissionsTable />
    </div>
  );
}
