
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FamilyMember } from "@/pages/FamilyAccountManagement";
import { cn } from "@/lib/utils";

interface FamilyTreeProps {
  familyMembers: FamilyMember[];
  onSelectMember: (member: FamilyMember) => void;
}

export function FamilyTree({ familyMembers, onSelectMember }: FamilyTreeProps) {
  const [animationComplete, setAnimationComplete] = useState(false);

  const handleMemberClick = (member: FamilyMember) => {
    onSelectMember(member);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
        delayChildren: 0.3
      }
    }
  };

  const memberVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  // After all animations complete, set the flag for connector lines
  const handleAnimationComplete = () => {
    setAnimationComplete(true);
  };

  return (
    <motion.div
      className="flex flex-col items-center max-w-xs mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onAnimationComplete={handleAnimationComplete}
    >
      {/* Family main bubble */}
      <motion.div 
        className="relative flex items-center justify-center w-24 h-24 rounded-full bg-white border-2 border-gray-200 mb-10 shadow-sm"
        variants={memberVariants}
        whileTap={{ scale: 1.05, boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}
      >
        <p className="text-black font-bold text-lg">FAMILY</p>
      </motion.div>

      {/* SVG Connector Lines - Only show when animation is complete */}
      <div className="relative w-full">
        {animationComplete && (
          <svg 
            className="absolute top-[-40px] left-0 w-full h-[calc(100%+40px)]" 
            style={{ zIndex: 0, pointerEvents: 'none' }}
          >
            {/* Central vertical line */}
            <motion.path
              d="M 50% 0 V 100%"
              stroke="#D1D5DB"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            
            {/* Horizontal connector lines to each member bubble */}
            {familyMembers.map((_, index) => (
              <motion.path
                key={`connector-${index}`}
                d={`M 50% ${(index * 84) + 42} H 50%`}
                stroke="#D1D5DB"
                strokeWidth="2"
                fill="none"
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                transition={{
                  delay: 1 + (index * 0.2),
                  duration: 0.4
                }}
              />
            ))}
          </svg>
        )}

        {/* Member Bubbles */}
        <div className="relative flex flex-col gap-4 z-10">
          {familyMembers.map((member, index) => (
            <motion.button
              key={member.id}
              className={cn(
                "w-20 h-20 rounded-full flex items-center justify-center shadow-sm border-2 border-gray-200 mx-auto",
                "transition-all duration-200 focus:outline-none focus:ring focus:ring-mint-600 focus:ring-opacity-50",
                "active:shadow-md touch-manipulation"
              )}
              style={{ minHeight: '44px', minWidth: '44px' }}
              variants={memberVariants}
              whileTap={{ scale: 1.05, boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}
              onClick={() => handleMemberClick(member)}
            >
              <span className="text-black font-medium text-sm">
                {member.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
