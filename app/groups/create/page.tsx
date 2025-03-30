import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Copy } from "lucide-react"
import Link from "next/link"

export default function CreateGroupPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-6 max-w-2xl mx-auto">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/groups">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Create a New Group</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Group Details</CardTitle>
            <CardDescription>
              Create a collaborative group to share and analyze cases with team members.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="group-name">Group Name</Label>
              <Input id="group-name" placeholder="Enter group name" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="group-description">Description</Label>
              <Textarea
                id="group-description"
                placeholder="Describe the purpose of this group"
                className="min-h-[100px]"
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="group-private">Private Group</Label>
                <Switch id="group-private" defaultChecked />
              </div>
              <p className="text-sm text-muted-foreground">Private groups are only visible to invited members</p>
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="case-sharing">Case Sharing</Label>
                <Switch id="case-sharing" defaultChecked />
              </div>
              <p className="text-sm text-muted-foreground">Allow members to share their cases with the group</p>
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="member-invite">Member Invitations</Label>
                <Switch id="member-invite" />
              </div>
              <p className="text-sm text-muted-foreground">Allow members to invite others to the group</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/groups">Cancel</Link>
            </Button>
            <Button>Create Group</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Invite Members</CardTitle>
            <CardDescription>Add team members to your group after creation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="invite-email">Email Addresses</Label>
              <Input id="invite-email" placeholder="Enter email addresses separated by commas" />
            </div>

            <div className="grid gap-2">
              <Label>Invitation Link</Label>
              <div className="flex gap-2">
                <Input readOnly value="https://legalcaseai.com/groups/invite/ABC123" />
                <Button variant="outline" size="icon">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Share this link to invite people to your group</p>
            </div>

            <div className="grid gap-2">
              <Label>Invitation Code</Label>
              <div className="flex gap-2">
                <Input readOnly value="ABC123" />
                <Button variant="outline" size="icon">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Share this code for others to join your group</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

