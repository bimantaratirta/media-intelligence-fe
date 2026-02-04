export type UserRole = "owner" | "admin" | "analyst" | "viewer";
export type MemberStatus = "active" | "pending" | "inactive";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: UserRole;
  status: MemberStatus;
  invitedAt: string;
  joinedAt?: string;
  lastActiveAt?: string;
  isCurrentUser?: boolean;
}

export const mockTeamMembers: TeamMember[] = [
  {
    id: "m1",
    name: "John Doe",
    email: "john@company.com",
    avatarUrl: "/avatars/john.jpg",
    role: "owner",
    status: "active",
    invitedAt: "2023-01-01T00:00:00Z",
    joinedAt: "2023-01-01T00:00:00Z",
    lastActiveAt: "2024-01-30T10:30:00Z",
    isCurrentUser: true,
  },
  {
    id: "m2",
    name: "Jane Smith",
    email: "jane@company.com",
    avatarUrl: "/avatars/jane.jpg",
    role: "admin",
    status: "active",
    invitedAt: "2023-06-15T00:00:00Z",
    joinedAt: "2023-06-15T12:00:00Z",
    lastActiveAt: "2024-01-29T16:45:00Z",
  },
  {
    id: "m3",
    name: "Bob Johnson",
    email: "bob@agency.com",
    role: "analyst",
    status: "active",
    invitedAt: "2023-09-01T00:00:00Z",
    joinedAt: "2023-09-02T09:00:00Z",
    lastActiveAt: "2024-01-28T14:20:00Z",
  },
  {
    id: "m4",
    name: "Alice Wong",
    email: "alice@client.com",
    role: "viewer",
    status: "pending",
    invitedAt: "2024-01-25T00:00:00Z",
  },
  {
    id: "m5",
    name: "Charlie Brown",
    email: "charlie@partner.com",
    role: "analyst",
    status: "inactive",
    invitedAt: "2023-03-10T00:00:00Z",
    joinedAt: "2023-03-11T10:00:00Z",
    lastActiveAt: "2023-12-01T08:00:00Z",
  },
];

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export const permissions: Permission[] = [
  {
    id: "view_dashboard",
    name: "View Dashboard",
    description: "Access all dashboard pages",
  },
  {
    id: "edit_sentiment",
    name: "Edit Sentiment",
    description: "Manually correct sentiment labels",
  },
  {
    id: "generate_reports",
    name: "Generate Reports",
    description: "Create and export reports",
  },
  {
    id: "manage_keywords",
    name: "Manage Keywords",
    description: "Edit topic configuration",
  },
  {
    id: "manage_team",
    name: "Manage Team",
    description: "Invite and remove members",
  },
  {
    id: "billing",
    name: "Billing & API Keys",
    description: "Access billing and API settings",
  },
  {
    id: "delete_topic",
    name: "Delete Topic",
    description: "Permanently delete this topic",
  },
];

export const rolePermissions: Record<UserRole, string[]> = {
  owner: [
    "view_dashboard",
    "edit_sentiment",
    "generate_reports",
    "manage_keywords",
    "manage_team",
    "billing",
    "delete_topic",
  ],
  admin: [
    "view_dashboard",
    "edit_sentiment",
    "generate_reports",
    "manage_keywords",
    "manage_team",
  ],
  analyst: ["view_dashboard", "edit_sentiment", "generate_reports"],
  viewer: ["view_dashboard"],
};

export const roleLabels: Record<UserRole, string> = {
  owner: "Owner",
  admin: "Admin",
  analyst: "Analyst",
  viewer: "Viewer",
};

export const roleDescriptions: Record<UserRole, string> = {
  owner: "Full access to all features including billing and deletion",
  admin: "Can manage team and settings, but not billing",
  analyst: "Can view data, edit sentiments, and generate reports",
  viewer: "Read-only access to dashboard",
};
