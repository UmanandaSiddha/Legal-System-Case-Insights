import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, Plus, FileText } from "lucide-react"
import Link from "next/link"

export default function GroupsPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-6 max-w-5xl mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Case Groups</h1>
            <p className="text-muted-foreground">
              Create and manage collaborative groups for case analysis and discussion.
            </p>
          </div>
          <Button asChild>
            <Link href="/groups/create">
              <Plus className="h-4 w-4 mr-2" /> Create Group
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="my-groups" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="my-groups">My Groups</TabsTrigger>
            <TabsTrigger value="joined">Joined Groups</TabsTrigger>
            <TabsTrigger value="invitations">Invitations</TabsTrigger>
          </TabsList>

          <TabsContent value="my-groups" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Tax Litigation Team",
                  description: "Collaborative group for tax litigation cases and strategy.",
                  members: 5,
                  cases: 3,
                  created: "2023-04-15",
                },
                {
                  name: "Corporate Defense",
                  description: "Team working on corporate defense cases for Johnson Industries.",
                  members: 4,
                  cases: 2,
                  created: "2023-05-10",
                },
                {
                  name: "Patent Review",
                  description: "Patent review and intellectual property litigation team.",
                  members: 6,
                  cases: 4,
                  created: "2023-03-22",
                },
              ].map((group, i) => (
                <Card key={i} className="h-full flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <Badge>Owner</Badge>
                    </div>
                    <CardDescription>{group.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Members:</span>
                        <span>{group.members}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Cases:</span>
                        <span>{group.cases}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Created:</span>
                        <span>{new Date(group.created).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <div className="flex justify-between w-full">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/groups/${i + 1}`}>
                          <Users className="h-4 w-4 mr-1" /> Manage
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/groups/${i + 1}/cases`}>
                          <FileText className="h-4 w-4 mr-1" /> Cases
                        </Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="joined" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Financial Fraud Investigation",
                  owner: "Jane Smith",
                  description: "Collaborative group for investigating financial fraud cases.",
                  members: 8,
                  cases: 5,
                  joined: "2023-05-05",
                },
                {
                  name: "Environmental Law Team",
                  owner: "Robert Johnson",
                  description: "Team focused on environmental law cases and regulations.",
                  members: 6,
                  cases: 3,
                  joined: "2023-04-12",
                },
              ].map((group, i) => (
                <Card key={i} className="h-full flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <Badge variant="outline">Member</Badge>
                    </div>
                    <CardDescription>{group.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm mb-2">
                        <Avatar className="h-5 w-5 mr-2">
                          <AvatarFallback className="text-xs">{group.owner[0]}</AvatarFallback>
                        </Avatar>
                        <span>Owner: {group.owner}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Members:</span>
                        <span>{group.members}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Cases:</span>
                        <span>{group.cases}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Joined:</span>
                        <span>{new Date(group.joined).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <div className="flex justify-between w-full">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/groups/joined/${i + 1}`}>
                          <Users className="h-4 w-4 mr-1" /> View
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/groups/joined/${i + 1}/cases`}>
                          <FileText className="h-4 w-4 mr-1" /> Cases
                        </Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="invitations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Group Invitations</CardTitle>
                <CardDescription>Pending invitations to join case groups</CardDescription>
              </CardHeader>
              <CardContent>
                {[
                  {
                    name: "Criminal Defense Team",
                    owner: "Michael Brown",
                    description: "Team focused on criminal defense cases and strategy.",
                    members: 7,
                    invited: "2023-05-18",
                  },
                ].map((invitation, i) => (
                  <div key={i} className="border rounded-lg p-4 mb-4 last:mb-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{invitation.name}</h3>
                        <p className="text-sm text-muted-foreground">{invitation.description}</p>
                      </div>
                      <Badge variant="secondary">Invitation</Badge>
                    </div>
                    <div className="flex items-center text-sm mb-4">
                      <Avatar className="h-5 w-5 mr-2">
                        <AvatarFallback className="text-xs">{invitation.owner[0]}</AvatarFallback>
                      </Avatar>
                      <span>From: {invitation.owner}</span>
                      <span className="mx-2">•</span>
                      <span className="text-muted-foreground">{new Date(invitation.invited).toLocaleDateString()}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm">Accept</Button>
                      <Button variant="outline" size="sm">
                        Decline
                      </Button>
                    </div>
                  </div>
                ))}

                {/* Empty state */}
                {false && (
                  <div className="text-center py-8">
                    <Users className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <h3 className="font-medium mb-1">No Invitations</h3>
                    <p className="text-sm text-muted-foreground">You don't have any pending group invitations</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Join a Group</CardTitle>
                <CardDescription>Join an existing group using an invitation code</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="invite-code">Invitation Code</Label>
                    <div className="flex gap-2">
                      <Input id="invite-code" placeholder="Enter group invitation code" />
                      <Button>Join</Button>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="invite-link">Invitation Link</Label>
                    <div className="flex gap-2">
                      <Input id="invite-link" placeholder="Paste invitation link" />
                      <Button>Join</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      {children}
    </label>
  )
}

