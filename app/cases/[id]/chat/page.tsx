import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { FileText, Send, Bot, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CaseChatPage({ params }: { params: { id: string } }) {
  const caseId = params.id

  return (
    <div className="container py-6">
      <div className="flex flex-col h-[calc(100vh-8rem)] max-w-6xl mx-auto">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href={`/cases/${caseId}`}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-xl font-bold">Case Chat: State v. Johnson Corporation</h1>
          <Badge className="ml-2">Criminal</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1 overflow-hidden">
          <Card className="md:col-span-1 overflow-hidden flex flex-col">
            <CardHeader className="px-4 py-3">
              <CardTitle className="text-sm font-medium">Case Documents</CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-auto flex-1">
              <div className="px-2">
                {["Indictment.pdf", "Financial_Records_2021.xlsx", "Witness_Statement_Smith.pdf"].map((doc, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2 p-2 rounded-md text-sm ${i === 0 ? "bg-muted" : "hover:bg-muted/50"}`}
                  >
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{doc}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-3 overflow-hidden flex flex-col">
            <CardHeader className="px-4 py-3 border-b">
              <Tabs defaultValue="ai-chat" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="ai-chat">AI Chat</TabsTrigger>
                  <TabsTrigger value="group-chat">Group Chat</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>

            <CardContent className="p-0 flex-1 flex flex-col">
              <TabsContent value="ai-chat" className="flex-1 flex flex-col m-0 data-[state=active]:flex-1">
                <div className="flex-1 overflow-auto p-4 space-y-4">
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/20">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">AI Assistant</span>
                        <span className="text-xs text-muted-foreground">10:30 AM</span>
                      </div>
                      <div className="bg-muted rounded-lg rounded-tl-none p-3 text-sm">
                        <p>
                          Hello! I'm your AI assistant for the case "State v. Johnson Corporation". I've analyzed all
                          the documents in this case. How can I help you today?
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">You</span>
                        <span className="text-xs text-muted-foreground">10:31 AM</span>
                      </div>
                      <div className="bg-primary/10 rounded-lg rounded-tl-none p-3 text-sm">
                        <p>Can you summarize the key allegations in the indictment?</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/20">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">AI Assistant</span>
                        <span className="text-xs text-muted-foreground">10:31 AM</span>
                      </div>
                      <div className="bg-muted rounded-lg rounded-tl-none p-3 text-sm">
                        <p className="mb-2">
                          Based on my analysis of the indictment, the key allegations against Johnson Corporation and
                          its executives are:
                        </p>
                        <ol className="list-decimal pl-5 space-y-1">
                          <li>
                            Securities fraud under 18 U.S.C. § 1348, involving deliberate misrepresentation of financial
                            data in quarterly reports from Q2-Q4 2021.
                          </li>
                          <li>
                            Violation of SEC Rule 10b-5 (17 C.F.R. § 240.10b-5) by making untrue statements of material
                            facts to investors during earnings calls.
                          </li>
                          <li>
                            Artificially inflating company stock value by concealing approximately $43 million in
                            liabilities.
                          </li>
                          <li>
                            Insider trading by CEO Robert Johnson and CFO Sarah Williams, who sold significant stock
                            holdings before the financial discrepancies became public.
                          </li>
                        </ol>
                        <p className="mt-2">
                          The indictment specifically cites email communications between the defendants that allegedly
                          show knowledge of the financial misrepresentations.
                        </p>
                        <div className="mt-3 flex items-center text-xs text-muted-foreground">
                          <span className="mr-1">AI Confidence:</span>
                          <div className="w-20 bg-muted rounded-full h-1.5 mr-1">
                            <div className="bg-primary h-1.5 rounded-full w-[92%]"></div>
                          </div>
                          <span>92%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input placeholder="Ask a question about this case..." className="flex-1" />
                    <Button size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    AI responses are generated based on the case documents. You can verify and correct any inaccuracies.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="group-chat" className="flex-1 flex flex-col m-0 data-[state=active]:flex-1">
                <div className="flex-1 overflow-auto p-4 space-y-4">
                  <div className="text-center text-sm text-muted-foreground py-2">
                    <span>Today</span>
                  </div>

                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">Jane Smith</span>
                        <span className="text-xs text-muted-foreground">9:45 AM</span>
                      </div>
                      <div className="bg-muted rounded-lg rounded-tl-none p-3 text-sm">
                        <p>
                          I've reviewed the financial records and found some inconsistencies in the Q3 reporting. Has
                          anyone else noticed this?
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>RB</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">Robert Brown</span>
                        <span className="text-xs text-muted-foreground">10:15 AM</span>
                      </div>
                      <div className="bg-muted rounded-lg rounded-tl-none p-3 text-sm">
                        <p>
                          Yes, I noticed that too. The AI analysis also flagged it. I think we should focus on those
                          discrepancies during the deposition next week.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">You</span>
                        <span className="text-xs text-muted-foreground">10:30 AM</span>
                      </div>
                      <div className="bg-primary/10 rounded-lg rounded-tl-none p-3 text-sm">
                        <p>
                          I agree. I've prepared some questions based on those inconsistencies. I'll share the document
                          with everyone later today.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input placeholder="Type your message..." className="flex-1" />
                    <Button size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

