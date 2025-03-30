import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Download, MessageSquare, Share2, FileText, Users, Calendar, MapPin, Scale, AlertCircle } from "lucide-react"

export default function CasePage({ params }: { params: { id: string } }) {
  const caseId = params.id

  // This would be fetched from your database in a real application
  const caseData = {
    id: caseId,
    title: "State v. Johnson Corporation",
    type: "Criminal",
    date: "2023-05-15",
    status: "Ongoing",
    confidence: 92,
    isPublic: true,
    description:
      "A landmark case involving corporate fraud and securities violations with significant precedent for future financial regulation.",
    insights: {
      summary:
        "This case involves allegations of securities fraud against Johnson Corporation and its executives. The prosecution claims that the company misrepresented financial data to investors, leading to significant losses when the truth was revealed.",
      suspects: ["Robert Johnson (CEO)", "Sarah Williams (CFO)", "Johnson Corporation"],
      witnesses: ["James Smith (Former Employee)", "Maria Garcia (Investor)", "David Lee (Financial Analyst)"],
      location: "New York, NY",
      lawCodes: ["18 U.S.C. § 1348", "15 U.S.C. § 78j(b)", "17 C.F.R. § 240.10b-5"],
      keyEvents: [
        "2022-01-15: Initial investigation by SEC",
        "2022-03-10: Search warrant executed at corporate headquarters",
        "2022-07-22: Indictment filed",
        "2023-02-05: Pre-trial motions hearing",
      ],
    },
    documents: [
      { id: "doc1", name: "Indictment.pdf", type: "PDF", size: "1.2 MB", date: "2022-07-22" },
      { id: "doc2", name: "Financial_Records_2021.xlsx", type: "XLSX", size: "3.5 MB", date: "2022-02-10" },
      { id: "doc3", name: "Witness_Statement_Smith.pdf", type: "PDF", size: "0.8 MB", date: "2022-04-18" },
    ],
    group: {
      id: "group1",
      name: "Corporate Fraud Task Force",
      members: [
        { id: "user1", name: "John Doe", role: "Lead Prosecutor" },
        { id: "user2", name: "Jane Smith", role: "Financial Analyst" },
        { id: "user3", name: "Robert Brown", role: "Legal Assistant" },
      ],
    },
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-8 max-w-6xl mx-auto">
        {/* Case Header */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge>{caseData.type}</Badge>
              <Badge variant={caseData.isPublic ? "default" : "secondary"}>
                {caseData.isPublic ? "Public" : "Private"}
              </Badge>
              <Badge variant="outline">{caseData.status}</Badge>
            </div>
            <h1 className="text-3xl font-bold mb-2">{caseData.title}</h1>
            <p className="text-muted-foreground mb-4">{caseData.description}</p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{new Date(caseData.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                <span>AI Confidence: {caseData.confidence}%</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 self-start">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-1" /> Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" /> Export PDF
            </Button>
            <Button size="sm">
              <MessageSquare className="h-4 w-4 mr-1" /> Chat with AI
            </Button>
          </div>
        </div>

        <Tabs defaultValue="insights" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Case Summary</CardTitle>
                  <CardDescription>AI-generated summary of the case</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{caseData.insights.summary}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm mb-1 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" /> Location
                    </h4>
                    <p className="text-sm">{caseData.insights.location}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-1 flex items-center">
                      <Scale className="h-4 w-4 mr-1" /> Applicable Law
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {caseData.insights.lawCodes.map((code, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {code}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-1">AI Confidence</h4>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: `${caseData.confidence}%` }}></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{caseData.confidence}% confidence in analysis</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Parties Involved</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Suspects/Defendants</h4>
                      <ul className="space-y-2">
                        {caseData.insights.suspects.map((suspect, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback>{suspect[0]}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{suspect}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-medium text-sm mb-2">Witnesses</h4>
                      <ul className="space-y-2">
                        {caseData.insights.witnesses.map((witness, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback>{witness[0]}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{witness}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Events Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="relative border-l border-muted">
                    {caseData.insights.keyEvents.map((event, i) => {
                      const [date, description] = event.split(": ")
                      return (
                        <li key={i} className="mb-6 ml-4 last:mb-0">
                          <div className="absolute w-3 h-3 bg-primary rounded-full mt-1.5 -left-1.5 border border-background"></div>
                          <time className="mb-1 text-xs font-normal leading-none text-muted-foreground">{date}</time>
                          <p className="text-sm font-normal">{description}</p>
                        </li>
                      )
                    })}
                  </ol>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Case Documents</CardTitle>
                    <CardDescription>Documents uploaded and processed for this case</CardDescription>
                  </div>
                  <Button size="sm">
                    <FileText className="h-4 w-4 mr-1" /> Add Documents
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 p-4 font-medium border-b">
                    <div className="col-span-2">Name</div>
                    <div>Type</div>
                    <div>Size</div>
                    <div>Date Added</div>
                  </div>
                  {caseData.documents.map((doc) => (
                    <div key={doc.id} className="grid grid-cols-5 p-4 hover:bg-muted/50">
                      <div className="col-span-2 flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{doc.name}</span>
                      </div>
                      <div className="flex items-center">
                        <Badge variant="outline">{doc.type}</Badge>
                      </div>
                      <div className="flex items-center text-muted-foreground text-sm">{doc.size}</div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground text-sm">{new Date(doc.date).toLocaleDateString()}</span>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Document Comparison</CardTitle>
                <CardDescription>Compare multiple documents to identify similarities and differences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg">
                  <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground text-center mb-4">
                    Select multiple documents to compare their contents
                  </p>
                  <Button>Start Comparison</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="collaboration" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>{caseData.group.name}</CardTitle>
                    <CardDescription>Collaborative group for this case</CardDescription>
                  </div>
                  <Button size="sm">
                    <Users className="h-4 w-4 mr-1" /> Manage Group
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h4 className="font-medium text-sm">Group Members</h4>
                  <div className="grid gap-4">
                    {caseData.group.members.map((member) => (
                      <div key={member.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar>
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Message
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Share Case</CardTitle>
                <CardDescription>Share this case with other users or groups</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="share-email">Email or Username</Label>
                  <div className="flex gap-2">
                    <Input id="share-email" placeholder="Enter email or username" />
                    <Button>Invite</Button>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label>Share Link</Label>
                  <div className="flex gap-2">
                    <Input readOnly value={`https://legalcaseai.com/cases/${caseId}/share`} />
                    <Button variant="outline">Copy</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Anyone with this link can view this case if it's public
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Case History</CardTitle>
                <CardDescription>Activity and changes to this case</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="relative border-l border-muted">
                  {[
                    { date: "2023-05-15", user: "John Doe", action: "Created the case" },
                    { date: "2023-05-15", user: "System", action: "Processed 3 documents with OCR" },
                    { date: "2023-05-16", user: "Jane Smith", action: "Added to Corporate Fraud Task Force group" },
                    { date: "2023-05-18", user: "John Doe", action: "Corrected AI summary" },
                    { date: "2023-05-20", user: "Robert Brown", action: "Added witness statement document" },
                  ].map((event, i) => (
                    <li key={i} className="mb-6 ml-4 last:mb-0">
                      <div className="absolute w-3 h-3 bg-muted-foreground rounded-full mt-1.5 -left-1.5 border border-background"></div>
                      <time className="mb-1 text-xs font-normal leading-none text-muted-foreground">{event.date}</time>
                      <p className="text-sm font-normal">
                        <span className="font-medium">{event.user}</span> {event.action}
                      </p>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

