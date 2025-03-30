"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Upload, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function UploadPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-6 max-w-4xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold mb-2">Upload Case Documents</h1>
          <p className="text-muted-foreground">
            Upload legal documents for AI analysis and insights. Our OCR technology will extract text and provide
            valuable information.
          </p>
        </div>

        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload Documents</TabsTrigger>
            <TabsTrigger value="settings">Case Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Document Upload</CardTitle>
                <CardDescription>Upload PDF, DOCX, or image files containing case information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-10 text-center">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="bg-muted rounded-full p-4">
                      <Upload className="h-8 w-8 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium">Drag and drop files here</h3>
                      <p className="text-sm text-muted-foreground">or click to browse files (PDF, DOCX, JPG, PNG)</p>
                    </div>
                    <Input id="file-upload" type="file" multiple className="hidden" />
                    <Button size="sm" onClick={() => document.getElementById("file-upload")?.click()}>
                      Select Files
                    </Button>
                  </div>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Important</AlertTitle>
                  <AlertDescription>
                    Our AI will automatically remove headers, footers, and unnecessary content during processing.
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <h3 className="font-medium">Uploaded Files (0)</h3>
                  <div className="text-sm text-muted-foreground">No files uploaded yet.</div>
                  {/* This would be populated with uploaded files */}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button disabled>Continue to Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Case Information</CardTitle>
                <CardDescription>
                  Provide details about the case for better organization and AI analysis.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="case-name">Case Name</Label>
                    <Input id="case-name" placeholder="e.g., Smith v. Johnson Corp" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="case-type">Case Type</Label>
                      <Select>
                        <SelectTrigger id="case-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="criminal">Criminal</SelectItem>
                          <SelectItem value="civil">Civil</SelectItem>
                          <SelectItem value="corporate">Corporate</SelectItem>
                          <SelectItem value="family">Family</SelectItem>
                          <SelectItem value="immigration">Immigration</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="case-date">Case Date</Label>
                      <Input id="case-date" type="date" />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="case-description">Case Description</Label>
                    <textarea
                      id="case-description"
                      className="min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Brief description of the case..."
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="public-case" />
                    <Label htmlFor="public-case">Make this case public</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="ai-verification" defaultChecked />
                    <div className="grid gap-0.5">
                      <Label htmlFor="ai-verification">Enable AI verification</Label>
                      <p className="text-xs text-muted-foreground">
                        Allow manual verification and correction of AI-generated insights
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Back to Upload</Button>
                <Button>Process Documents</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

