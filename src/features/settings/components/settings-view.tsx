"use client"

import { useState } from "react"
import { User, Users, CreditCard, Bell, Shield, Key, Check, Plus, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

export function SettingsView() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div className="flex-1 p-4 md:p-8 pt-6 h-full flex flex-col min-w-0 max-w-[1200px] mx-auto w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground mt-1 text-sm">Manage your account settings and team preferences.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Settings Navigation */}
        <div className="w-full md:w-64 shrink-0">
          <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto pb-4 md:pb-0">
            <Button 
              variant={activeTab === "profile" ? "secondary" : "ghost"} 
              className="justify-start shrink-0" 
              onClick={() => setActiveTab("profile")}
            >
              <User className="mr-2 h-4 w-4" /> Profile
            </Button>
            <Button 
              variant={activeTab === "team" ? "secondary" : "ghost"} 
              className="justify-start shrink-0" 
              onClick={() => setActiveTab("team")}
            >
              <Users className="mr-2 h-4 w-4" /> Team
            </Button>
            <Button 
              variant={activeTab === "billing" ? "secondary" : "ghost"} 
              className="justify-start shrink-0" 
              onClick={() => setActiveTab("billing")}
            >
              <CreditCard className="mr-2 h-4 w-4" /> Billing
            </Button>
            <Button 
              variant={activeTab === "notifications" ? "secondary" : "ghost"} 
              className="justify-start shrink-0" 
              onClick={() => setActiveTab("notifications")}
            >
              <Bell className="mr-2 h-4 w-4" /> Notifications
            </Button>
            <Button 
              variant={activeTab === "security" ? "secondary" : "ghost"} 
              className="justify-start shrink-0" 
              onClick={() => setActiveTab("security")}
            >
              <Shield className="mr-2 h-4 w-4" /> Security
            </Button>
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1 space-y-6">
          {activeTab === "profile" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Details</CardTitle>
                  <CardDescription>Update your personal information and avatar.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                      KY
                    </div>
                    <Button variant="outline" onClick={() => toast("Upload dialog opened")}><Upload className="mr-2 h-4 w-4" /> Change Avatar</Button>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First name</Label>
                      <Input id="firstName" defaultValue="Kyaga" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last name</Label>
                      <Input id="lastName" defaultValue="Smith" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="email">Email address</Label>
                      <Input id="email" type="email" defaultValue="kyaga@pixelandproof.com" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                  <Button onClick={() => toast("Profile updated")}>Save Changes</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Brand Preferences</CardTitle>
                  <CardDescription>Customize the look and feel of your portal.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <div className="flex gap-4">
                      <div className="border-2 border-primary rounded-lg p-1 cursor-pointer">
                        <div className="bg-background w-24 h-16 rounded-md border" />
                        <p className="text-center text-xs mt-2 font-medium">Dark Mode</p>
                      </div>
                      <div className="border-2 border-transparent rounded-lg p-1 cursor-pointer opacity-50 hover:opacity-100">
                        <div className="bg-white w-24 h-16 rounded-md border" />
                        <p className="text-center text-xs mt-2 font-medium">Light Mode</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "team" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Team Members</CardTitle>
                    <CardDescription>Manage who has access to this workspace.</CardDescription>
                  </div>
                  <Button size="sm" onClick={() => toast("Invite modal opened")}><Plus className="mr-2 h-4 w-4" /> Invite Member</Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">KY</div>
                        <div>
                          <p className="font-medium text-sm">Kyaga Smith (You)</p>
                          <p className="text-xs text-muted-foreground">kyaga@pixelandproof.com</p>
                        </div>
                      </div>
                      <Badge>Owner</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-bold">SA</div>
                        <div>
                          <p className="font-medium text-sm">Sarah Adams</p>
                          <p className="text-xs text-muted-foreground">sarah@pixelandproof.com</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Editor</Badge>
                        <Button variant="ghost" size="sm" className="text-destructive" onClick={() => toast("Member removed")}>Remove</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "billing" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <Card>
                <CardHeader>
                  <CardTitle>Subscription Plan</CardTitle>
                  <CardDescription>You are currently on the Agency Pro plan.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold">Agency Pro</h3>
                      <span className="text-2xl font-bold">$199<span className="text-sm font-normal text-muted-foreground">/mo</span></span>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Unlimited Clients</li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> 500GB Asset Storage</li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Custom Domain</li>
                    </ul>
                    <div className="flex gap-4">
                      <Button onClick={() => toast("Redirecting to upgrade flow...")}>Upgrade Plan</Button>
                      <Button variant="outline" onClick={() => toast("Cancel subscription initiated")}>Cancel Subscription</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Manage how you pay for your subscription.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-16 bg-muted rounded flex items-center justify-center">
                        <CreditCard className="h-5 w-5 opacity-50" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Visa ending in 4242</p>
                        <p className="text-xs text-muted-foreground">Expires 12/2028</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => toast("Update payment modal opened")}>Update</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
