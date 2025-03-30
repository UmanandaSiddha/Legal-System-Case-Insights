import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, Download, MessageSquare, Users, Upload, FileText } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button asChild>
            <Link href="/upload">
              <Upload className="mr-2 h-4 w-4" /> Upload Case
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="my-cases" className="space-y-4">
        <TabsList>
          <TabsTrigger value="my-cases">My Cases</TabsTrigger>
          <TabsTrigger value="shared">Shared With Me</TabsTrigger>
          <TabsTrigger value="groups">My Groups</TabsTrigger>
        </TabsList>

        <TabsContent value="my-cases" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Card key={i} className="h-full flex flex-col">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-lg font-medium">Smith v. Johnson Corp {i}</CardTitle>
                    <CardDescription>Last updated: {new Date().toLocaleDateString()}</CardDescription>
                  </div>
                  <Badge variant={i % 2 === 0 ? "default" : "secondary"}>{i % 2 === 0 ? "Public" : "Private"}</Badge>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium">Case Type:</span> <Badge variant="outline">Corporate</Badge>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Documents:</span> 3
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">AI Confidence:</span> 87%
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Employment dispute regarding wrongful termination and breach of contract.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <div className="flex justify-between w-full">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" /> View
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4 mr-1" /> Chat
                      </Button>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        {i % 2 === 0 ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}

            <Card className="h-full flex flex-col items-center justify-center p-6 border-dashed">
              <Upload className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-muted-foreground text-center mb-4">Upload a new case file to analyze</p>
              <Button asChild>
                <Link href="/upload">Upload Case</Link>
              </Button>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="shared" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2].map((i) => (
              <Card key={i} className="h-full flex flex-col">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-lg font-medium">State v. Enterprise Ltd {i}</CardTitle>
                    <CardDescription>Shared by: Jane Smith • {new Date().toLocaleDateString()}</CardDescription>
                  </div>
                  <Badge variant="secondary">Shared</Badge>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium">Case Type:</span> <Badge variant="outline">Criminal</Badge>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Documents:</span> 5
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">AI Confidence:</span> 92%
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Criminal investigation into alleged corporate tax evasion and financial fraud.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <div className="flex justify-between w-full">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" /> View
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4 mr-1" /> Chat
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="groups" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="text-lg font-medium">
                    {["Tax Litigation Team", "Corporate Defense", "Patent Review"][i - 1]}
                  </CardTitle>
                  <CardDescription>{i === 1 ? "You created this group" : "You are a member"}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium">Members:</span> {i + 3}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Cases:</span> {i * 2}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {i === 1
                        ? "Collaborative group for tax litigation cases and strategy."
                        : i === 2
                          ? "Team working on corporate defense cases for Johnson Industries."
                          : "Patent review and intellectual property litigation team."}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <div className="flex justify-between w-full">
                    <Button variant="outline" size="sm">
                      <Users className="h-4 w-4 mr-1" /> Manage
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-1" /> View Cases
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}

            <Card className="h-full flex flex-col items-center justify-center p-6 border-dashed">
              <Users className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-muted-foreground text-center mb-4">
                Create a new group to collaborate with team members
              </p>
              <Button asChild>
                <Link href="/groups/create">Create Group</Link>
              </Button>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

