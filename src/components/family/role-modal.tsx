
import React, { useState } from "react";
import { FamilyMember } from "@/pages/FamilyAccountManagement";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChildHub } from "./hubs/child-hub";
import { ElderHub } from "./hubs/elder-hub";
import { ManageAccount } from "./manage-account";
import { useIsMobile } from "@/hooks/use-mobile";

interface RoleModalProps {
  member: FamilyMember;
  onClose: () => void;
  open: boolean;
}

export function RoleModal({ member, onClose, open }: RoleModalProps) {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("manage");

  const renderRoleView = () => {
    switch (member.role) {
      case "child":
        return <ChildHub />;
      case "elder":
        return <ElderHub />;
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Role view coming soon</p>
          </div>
        );
    }
  };

  return (
    <Sheet open={open} onOpenChange={() => onClose()}>
      <SheetContent 
        side={isMobile ? "bottom" : "right"} 
        className={isMobile ? "h-[90vh]" : "w-[400px] max-w-md"}
      >
        <SheetHeader className="flex flex-row justify-between items-center">
          <SheetTitle className="text-xl font-semibold">{member.name}</SheetTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </SheetHeader>
        
        <Tabs 
          defaultValue="manage" 
          className="mt-6" 
          value={activeTab} 
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-2 h-12">
            <TabsTrigger 
              value="manage" 
              className="text-base h-full"
              style={{ minHeight: '44px' }}
            >
              Manage
            </TabsTrigger>
            <TabsTrigger 
              value="view" 
              className="text-base h-full"
              style={{ minHeight: '44px' }}
            >
              View as {member.name}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="manage" className="mt-6">
            <ManageAccount member={member} />
          </TabsContent>
          
          <TabsContent value="view" className="mt-6">
            {renderRoleView()}
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
