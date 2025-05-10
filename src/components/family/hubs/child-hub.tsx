
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, PiggyBank, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ChildHub() {
  const [activeTab, setActiveTab] = useState("wallet");
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        <TabsContent value="wallet" className={activeTab === "wallet" ? "block" : "hidden"}>
          <ChildWallet />
        </TabsContent>
        
        <TabsContent value="goals" className={activeTab === "goals" ? "block" : "hidden"}>
          <ChildGoals />
        </TabsContent>
        
        <TabsContent value="learn" className={activeTab === "learn" ? "block" : "hidden"}>
          <ChildLearn />
        </TabsContent>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-auto">
        <TabsList className="grid w-full grid-cols-3 h-16 fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white">
          <TabsTrigger 
            value="wallet" 
            className="flex flex-col items-center justify-center text-xs data-[state=active]:text-[#10B981]"
            style={{ minHeight: '44px' }}
          >
            <PiggyBank className="h-5 w-5" />
            <span className="mt-1">Wallet</span>
          </TabsTrigger>
          
          <TabsTrigger 
            value="goals" 
            className="flex flex-col items-center justify-center text-xs data-[state=active]:text-[#10B981]"
            style={{ minHeight: '44px' }}
          >
            <Award className="h-5 w-5" />
            <span className="mt-1">Goals</span>
          </TabsTrigger>
          
          <TabsTrigger 
            value="learn" 
            className="flex flex-col items-center justify-center text-xs data-[state=active]:text-[#10B981]"
            style={{ minHeight: '44px' }}
          >
            <BookOpen className="h-5 w-5" />
            <span className="mt-1">Learn</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}

function ChildWallet() {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold">My Money</h3>
          <p className="text-3xl font-bold mt-2">€24.50</p>
          <p className="text-sm text-gray-500 mt-1">Available to spend</p>
          
          <div className="flex justify-between items-center mt-4">
            <Button 
              className="bg-[#10B981] hover:bg-[#10B981]/90 min-h-[44px] flex-1 mr-2"
            >
              Add Money
            </Button>
            <Button 
              variant="outline"
              className="min-h-[44px] flex-1 ml-2"
            >
              Spend
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-bold">My Savings Goal</h3>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm font-semibold">New Bike</span>
            <span className="text-sm font-semibold">€45 / €120</span>
          </div>
          <Progress value={37.5} className="h-3 mt-2" />
          
          <div className="mt-6 bg-blue-50 rounded-lg p-4 flex items-center">
            <PiggyBank className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="font-bold">+€5 this week</p>
              <p className="text-sm text-gray-600">Keep saving!</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-bold">My Investments</h3>
          <p className="text-sm text-gray-500 mt-1">Watch your money grow!</p>
          
          <div className="mt-4 space-y-4">
            <div className="rounded-lg border p-3">
              <div className="flex justify-between">
                <span className="font-semibold">Green Energy Fund</span>
                <span className="text-green-600">+2%</span>
              </div>
              <p className="text-sm mt-1">€10 invested</p>
            </div>
            
            <div className="rounded-lg border p-3">
              <div className="flex justify-between">
                <span className="font-semibold">Tech Companies</span>
                <span className="text-green-600">+5%</span>
              </div>
              <p className="text-sm mt-1">€5 invested</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ChildGoals() {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold">My Goals</h3>
          
          <div className="mt-4 space-y-6">
            <div>
              <div className="flex justify-between items-center">
                <span className="font-bold">New Bike</span>
                <span className="text-sm font-medium">€45 / €120</span>
              </div>
              <Progress value={37.5} className="h-3 mt-2" />
              <p className="text-sm mt-2 text-gray-600">75 more days at this rate</p>
            </div>
            
            <div>
              <div className="flex justify-between items-center">
                <span className="font-bold">Video Game</span>
                <span className="text-sm font-medium">€20 / €60</span>
              </div>
              <Progress value={33.3} className="h-3 mt-2" />
              <p className="text-sm mt-2 text-gray-600">40 more days at this rate</p>
            </div>
          </div>
          
          <Button 
            className="w-full mt-6 bg-[#10B981] hover:bg-[#10B981]/90 min-h-[44px]"
          >
            Add New Goal
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-bold">My Rewards</h3>
          
          <div className="mt-4 space-y-4">
            <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
              <Award className="h-8 w-8 text-yellow-500 mr-3" />
              <div>
                <p className="font-bold">Saving Star</p>
                <p className="text-sm text-gray-600">Saved 4 weeks in a row!</p>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-purple-50 rounded-lg">
              <Award className="h-8 w-8 text-purple-500 mr-3" />
              <div>
                <p className="font-bold">Money Master</p>
                <p className="text-sm text-gray-600">Completed 5 lessons</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ChildLearn() {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold">Money Lessons</h3>
          <p className="text-sm text-gray-500 mt-1">Learn how money works!</p>
          
          <div className="mt-4 space-y-4">
            <Button 
              variant="outline"
              className="w-full justify-start text-left h-auto py-4 min-h-[44px]"
            >
              <div>
                <p className="font-bold">What is Saving?</p>
                <p className="text-sm text-gray-600">2 minute lesson</p>
              </div>
            </Button>
            
            <Button 
              variant="outline"
              className="w-full justify-start text-left h-auto py-4 min-h-[44px]"
            >
              <div>
                <p className="font-bold">How Banks Work</p>
                <p className="text-sm text-gray-600">3 minute lesson</p>
              </div>
            </Button>
            
            <Button 
              variant="outline"
              className="w-full justify-start text-left h-auto py-4 min-h-[44px]"
            >
              <div>
                <p className="font-bold">What is Investing?</p>
                <p className="text-sm text-gray-600">4 minute lesson</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-bold">Money Quiz</h3>
          <p className="text-sm text-gray-500 mt-1">Test your knowledge!</p>
          
          <Button 
            className="w-full mt-4 bg-[#10B981] hover:bg-[#10B981]/90 min-h-[44px]"
          >
            Start Quick Quiz
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
