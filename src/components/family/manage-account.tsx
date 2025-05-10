
import React from "react";
import { FamilyMember } from "@/pages/FamilyAccountManagement";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ManageAccountProps {
  member: FamilyMember;
}

export function ManageAccount({ member }: ManageAccountProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Account Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name" 
              defaultValue={member.name} 
              className="h-11" 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input 
              id="role" 
              value={member.role.charAt(0).toUpperCase() + member.role.slice(1)} 
              disabled 
              className="h-11" 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="permissions">Permissions</Label>
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex items-center h-11">
                <span className="min-w-[120px]">View Balance</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="ml-auto min-h-[44px] px-4"
                >
                  Enabled
                </Button>
              </div>
              
              <div className="flex items-center h-11">
                <span className="min-w-[120px]">Transfer Money</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="ml-auto min-h-[44px] px-4"
                >
                  {member.role === "child" ? "Limited" : "Enabled"}
                </Button>
              </div>
              
              <div className="flex items-center h-11">
                <span className="min-w-[120px]">Make Purchases</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="ml-auto min-h-[44px] px-4"
                >
                  {member.role === "child" ? "Approval Required" : "Enabled"}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Account Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button 
              className="w-full bg-[#10B981] hover:bg-[#10B981]/90 min-h-[44px]"
            >
              Transfer Funds
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full min-h-[44px]"
            >
              Spending Limits
            </Button>
            
            {member.role === "child" && (
              <Button 
                variant="outline" 
                className="w-full min-h-[44px]"
              >
                Manage Allowance
              </Button>
            )}
            
            {member.role === "elder" && (
              <Button 
                variant="outline" 
                className="w-full min-h-[44px]"
              >
                Emergency Contacts
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
