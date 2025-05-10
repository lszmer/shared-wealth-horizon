
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PiggyBank, HeartHandshake, Bell, Phone } from "lucide-react";

export function ElderHub() {
  const [activeTab, setActiveTab] = useState("wallet");
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        <TabsContent value="wallet" className={activeTab === "wallet" ? "block" : "hidden"}>
          <ElderWallet />
        </TabsContent>
        
        <TabsContent value="support" className={activeTab === "support" ? "block" : "hidden"}>
          <ElderSupport />
        </TabsContent>
      </div>

      <Button
        className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-full shadow-lg min-h-[44px] min-w-[200px] z-10"
      >
        <Phone className="mr-2 h-5 w-5" /> Emergency Contact
      </Button>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-auto">
        <TabsList className="grid w-full grid-cols-2 h-16 fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white">
          <TabsTrigger 
            value="wallet" 
            className="flex flex-col items-center justify-center text-base data-[state=active]:text-[#10B981]"
            style={{ minHeight: '44px' }}
          >
            <PiggyBank className="h-5 w-5" />
            <span className="mt-1">Wallet</span>
          </TabsTrigger>
          
          <TabsTrigger 
            value="support" 
            className="flex flex-col items-center justify-center text-base data-[state=active]:text-[#10B981]"
            style={{ minHeight: '44px' }}
          >
            <HeartHandshake className="h-5 w-5" />
            <span className="mt-1">Support</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}

function ElderWallet() {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold">My Balance</h2>
          <p className="text-4xl font-bold mt-4">€1,250.75</p>
          <p className="text-lg text-gray-600 mt-2">Available Funds</p>
          
          <Button 
            className="w-full mt-6 bg-[#10B981] hover:bg-[#10B981]/90 min-h-[44px] text-lg"
          >
            🔊 Read My Balance
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold">Recent Transactions</h3>
          
          <div className="mt-4 space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between">
                <span className="text-lg font-bold">Grocery Store</span>
                <span className="text-lg">€45.20</span>
              </div>
              <p className="text-base text-gray-600">Yesterday</p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between">
                <span className="text-lg font-bold">Pharmacy</span>
                <span className="text-lg">€12.99</span>
              </div>
              <p className="text-base text-gray-600">2 days ago</p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between">
                <span className="text-lg font-bold">Utility Bill</span>
                <span className="text-lg">€78.50</span>
              </div>
              <p className="text-base text-gray-600">Last week</p>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full mt-6 min-h-[44px] text-lg"
          >
            View All Transactions
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold">Quick Actions</h3>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Button 
              className="bg-[#10B981] hover:bg-[#10B981]/90 min-h-[60px] text-lg"
            >
              Send Money
            </Button>
            
            <Button 
              className="bg-[#10B981] hover:bg-[#10B981]/90 min-h-[60px] text-lg"
            >
              Pay Bills
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ElderSupport() {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold">Trusted Contacts</h2>
          
          <div className="mt-4 space-y-4">
            <Button 
              className="w-full bg-blue-500 hover:bg-blue-600 min-h-[60px] text-lg justify-start"
            >
              <Phone className="mr-3 h-6 w-6" />
              <span>Call Parent 1</span>
            </Button>
            
            <Button 
              className="w-full bg-blue-500 hover:bg-blue-600 min-h-[60px] text-lg justify-start"
            >
              <Phone className="mr-3 h-6 w-6" />
              <span>Call Parent 2</span>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold">Bill Support</h3>
          
          <div className="mt-4 space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Electricity Bill</span>
                <Bell className="h-6 w-6 text-yellow-500" />
              </div>
              <p className="text-base text-gray-600">Due in 5 days</p>
              <Button 
                className="mt-3 bg-[#10B981] hover:bg-[#10B981]/90 min-h-[44px] text-base"
              >
                Get Help Paying
              </Button>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Phone Bill</span>
                <Bell className="h-6 w-6 text-yellow-500" />
              </div>
              <p className="text-base text-gray-600">Due in 12 days</p>
              <Button 
                className="mt-3 bg-[#10B981] hover:bg-[#10B981]/90 min-h-[44px] text-base"
              >
                Get Help Paying
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold">Voice Commands</h3>
          <p className="text-base text-gray-600 mt-2">Tap and speak clearly</p>
          
          <Button 
            className="w-full mt-4 bg-[#10B981] hover:bg-[#10B981]/90 min-h-[60px] text-lg"
          >
            🎤 Speak a Command
          </Button>
          
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-base font-medium">Try saying:</p>
            <ul className="list-disc pl-5 mt-2 text-base">
              <li>"Send €50 to Child"</li>
              <li>"What's my balance?"</li>
              <li>"Call my trusted contact"</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
