
import React, { useState } from "react";
import { TabBar } from "@/components/tab-bar";
import { FamilyTree } from "@/components/family/family-tree";
import { RoleModal } from "@/components/family/role-modal";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export type FamilyMember = {
  id: string;
  name: string;
  role: "parent1" | "parent2" | "child" | "elder";
  avatarText: string;
};

export default function FamilyAccountManagement() {
  const isMobile = useIsMobile();
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  
  const familyMembers: FamilyMember[] = [
    { id: "1", name: "Parent 1", role: "parent1", avatarText: "P1" },
    { id: "2", name: "Parent 2", role: "parent2", avatarText: "P2" },
    { id: "3", name: "Child", role: "child", avatarText: "C" },
    { id: "4", name: "Elder", role: "elder", avatarText: "E" },
  ];

  const handleSelectMember = (member: FamilyMember) => {
    setSelectedMember(member);
  };

  const handleCloseModal = () => {
    setSelectedMember(null);
  };

  return (
    <div className="min-h-screen bg-white pb-16">
      <div className="px-4 py-6">
        <div className="flex items-center mb-6">
          <Link to="/">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-semibold">Family Account Management</h1>
        </div>

        <div className="flex flex-col items-center justify-center py-6">
          <FamilyTree 
            familyMembers={familyMembers} 
            onSelectMember={handleSelectMember} 
          />
        </div>
      </div>

      {selectedMember && (
        <RoleModal
          member={selectedMember}
          onClose={handleCloseModal}
          open={!!selectedMember}
        />
      )}

      <TabBar currentTab="profile" />
    </div>
  );
}
