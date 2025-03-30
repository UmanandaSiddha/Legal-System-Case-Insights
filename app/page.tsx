import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              AI-Powered Legal Case Management
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Search, analyze, and collaborate on legal cases with advanced AI insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button asChild size="lg">
                <Link href="/dashboard">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/search">Browse Public Cases</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="w-full py-12 md:py-16 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Search Public Cases</h2>
            <div className="w-full max-w-3xl flex items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by case name, keywords, or law codes..."
                  className="w-full pl-9"
                />
              </div>
              <Button type="submit">Search</Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="outline">Criminal</Badge>
              <Badge variant="outline">Civil</Badge>
              <Badge variant="outline">Corporate</Badge>
              <Badge variant="outline">Family</Badge>
              <Badge variant="outline">Immigration</Badge>
              <Badge variant="outline">More Filters</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cases */}
      <section className="w-full py-12 md:py-16 bg-muted/50">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl mb-8">Featured Public Cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="h-full flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">State v. Johnson {i}</CardTitle>
                    <Badge>Criminal</Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground mb-4">
                    A landmark case involving corporate fraud and securities violations with significant precedent for
                    future financial regulation.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="secondary" className="text-xs">
                      Securities Fraud
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Corporate Law
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <div className="flex justify-between items-center w-full">
                    <div className="text-xs text-muted-foreground">
                      AI Confidence: <span className="font-medium">92%</span>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/cases/${i}`}>View Details</Link>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Button variant="outline" asChild>
              <Link href="/search">View All Cases</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Powerful Features for Legal Professionals
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Our platform combines advanced AI with collaborative tools to streamline your case management.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Document Analysis",
                description:
                  "OCR technology extracts and analyzes text from documents, providing key insights and summaries.",
              },
              {
                title: "Collaborative Case Management",
                description: "Create groups, share cases, and collaborate with team members in real-time.",
              },
              {
                title: "Advanced Search & Filtering",
                description: "Find relevant cases quickly with powerful search and filtering capabilities.",
              },
              {
                title: "Interactive AI Chat",
                description: "Ask questions about cases and get intelligent responses based on document context.",
              },
              {
                title: "Multi-Document Comparison",
                description:
                  "Compare multiple case files side by side with AI-generated insights on similarities and differences.",
              },
              {
                title: "Exportable Insights",
                description: "Download comprehensive PDF reports of AI-generated case insights and analysis.",
              },
            ].map((feature, i) => (
              <Card key={i} className="h-full">
                <CardHeader>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

