
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AvatarButton } from "./ui/avatar-button";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Account } from "@/types/portfolio";

interface AccountSwitcherProps {
  accounts: Account[];
  currentAccount: Account;
  onAccountChange: (account: Account) => void;
  bottomTab?: boolean;
}

export function AccountSwitcher({
  accounts,
  currentAccount,
  onAccountChange,
  bottomTab = false,
}: AccountSwitcherProps) {
  const [open, setOpen] = useState(false);

  const handleSelectAccount = (account: Account) => {
    onAccountChange(account);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {bottomTab ? (
          <button className="flex flex-col items-center">
            {currentAccount.type === "personal" ? (
              <AvatarButton initial={currentAccount.initial} />
            ) : (
              <div className="flex -space-x-2">
                <AvatarButton initial={currentAccount.initial} size="sm" />
                <AvatarButton 
                  initial={currentAccount.partnerInitial || ""} 
                  size="sm" 
                  color="bg-finance-neutral" 
                />
              </div>
            )}
          </button>
        ) : (
          <button className="flex items-center gap-2">
            {currentAccount.type === "personal" ? (
              <div className="flex items-center gap-2">
                <AvatarButton initial={currentAccount.initial} />
                <span className="font-medium text-sm hidden sm:inline">{currentAccount.name}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <AvatarButton initial={currentAccount.initial} size="sm" />
                  <AvatarButton 
                    initial={currentAccount.partnerInitial || ""} 
                    size="sm" 
                    color="bg-finance-neutral" 
                  />
                </div>
                <span className="font-medium text-sm hidden sm:inline">{currentAccount.name}</span>
              </div>
            )}
            <ChevronDown size={16} />
          </button>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-60 p-2 bg-gray-800 border border-gray-700 text-white">
        <div className="space-y-2">
          {accounts.map((account) => (
            <button
              key={account.id}
              className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-gray-700"
              onClick={() => handleSelectAccount(account)}
            >
              {account.type === "personal" ? (
                <AvatarButton initial={account.initial} size="sm" />
              ) : (
                <div className="flex -space-x-2">
                  <AvatarButton initial={account.initial} size="sm" />
                  <AvatarButton 
                    initial={account.partnerInitial || ""} 
                    size="sm" 
                    color="bg-finance-neutral" 
                  />
                </div>
              )}
              <div className="text-left">
                <div className="font-medium">{account.name}</div>
                <div className="text-xs text-gray-400">
                  {account.type === "personal" ? "Personal Account" : "Joint Account"}
                </div>
              </div>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
