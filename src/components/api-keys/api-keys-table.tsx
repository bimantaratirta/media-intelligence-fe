"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Key,
  Plus,
  Copy,
  Trash2,
  Eye,
  EyeOff,
  AlertTriangle,
} from "lucide-react";
import type { ApiKey } from "@/mocks/data/api-keys";

interface ApiKeysTableProps {
  keys: ApiKey[];
  onGenerate: (name: string, permissions: string[]) => Promise<string>;
  onRevoke: (keyId: string) => void;
  onCopy: (keyPrefix: string) => void;
}

export function ApiKeysTable({
  keys,
  onGenerate,
  onRevoke,
  onCopy,
}: ApiKeysTableProps) {
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyPermissions, setNewKeyPermissions] = useState<string[]>([
    "read",
  ]);
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [showKey, setShowKey] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!newKeyName) return;

    setIsGenerating(true);
    try {
      const fullKey = await onGenerate(newKeyName, newKeyPermissions);
      setGeneratedKey(fullKey);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCloseGenerateDialog = () => {
    setIsGenerateOpen(false);
    setNewKeyName("");
    setNewKeyPermissions(["read"]);
    setGeneratedKey(null);
    setShowKey(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base flex items-center gap-2">
          <Key className="h-5 w-5" />
          Your API Keys
        </CardTitle>
        <Dialog open={isGenerateOpen} onOpenChange={setIsGenerateOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Generate New Key
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Generate API Key</DialogTitle>
              <DialogDescription>
                Create a new API key for accessing the N4P API.
              </DialogDescription>
            </DialogHeader>

            {!generatedKey ? (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Key Name</Label>
                  <Input
                    placeholder="e.g., Production, Development"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Permissions</Label>
                  <div className="space-y-2">
                    {[
                      {
                        id: "read",
                        label: "Read",
                        desc: "Read mentions and statistics",
                      },
                      {
                        id: "write",
                        label: "Write",
                        desc: "Update sentiment labels",
                      },
                      {
                        id: "export",
                        label: "Export",
                        desc: "Export data to CSV/JSON",
                      },
                    ].map((perm) => (
                      <div key={perm.id} className="flex items-start gap-2">
                        <Checkbox
                          id={perm.id}
                          checked={newKeyPermissions.includes(perm.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setNewKeyPermissions([
                                ...newKeyPermissions,
                                perm.id,
                              ]);
                            } else {
                              setNewKeyPermissions(
                                newKeyPermissions.filter((p) => p !== perm.id)
                              );
                            }
                          }}
                        />
                        <div>
                          <Label htmlFor={perm.id}>{perm.label}</Label>
                          <p className="text-xs text-muted-foreground">
                            {perm.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={handleCloseGenerateDialog}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleGenerate}
                    disabled={!newKeyName || isGenerating}
                  >
                    {isGenerating ? "Generating..." : "Generate Key"}
                  </Button>
                </DialogFooter>
              </div>
            ) : (
              <div className="space-y-4 py-4">
                <div className="p-4 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-amber-800 dark:text-amber-200">
                        Save your API key now!
                      </p>
                      <p className="text-sm text-amber-700 dark:text-amber-300">
                        This key will only be shown once. Store it securely.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Your API Key</Label>
                  <div className="flex gap-2">
                    <Input
                      type={showKey ? "text" : "password"}
                      value={generatedKey}
                      readOnly
                      className="font-mono"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setShowKey(!showKey)}
                    >
                      {showKey ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        navigator.clipboard.writeText(generatedKey);
                        onCopy(generatedKey);
                      }}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <DialogFooter>
                  <Button onClick={handleCloseGenerateDialog}>Done</Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Key</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Last Used</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {keys.map((key) => (
              <TableRow key={key.id}>
                <TableCell className="font-medium">{key.name}</TableCell>
                <TableCell>
                  <code className="text-sm bg-muted px-2 py-1 rounded">
                    {key.keyPrefix}
                  </code>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {key.permissions.map((perm) => (
                      <Badge key={perm} variant="outline" className="text-xs">
                        {perm}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {formatDate(key.createdAt)}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {key.lastUsedAt ? formatDate(key.lastUsedAt) : "Never"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onCopy(key.keyPrefix)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Revoke API Key?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. Any applications using
                            this key will lose access immediately.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => onRevoke(key.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Revoke Key
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-4 p-4 bg-muted rounded-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <p className="font-medium">Keep your API keys secret</p>
              <p className="text-sm text-muted-foreground">
                Never share them in public repositories or client-side code.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
