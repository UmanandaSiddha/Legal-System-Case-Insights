"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Calendar, Eye, MessageSquare } from "lucide-react"
import Link from "next/link"

// Sample data for cases
const ALL_CASES = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  title:
    i % 3 === 0
      ? `State v. Johnson Corporation ${i + 1}`
      : i % 3 === 1
        ? `Smith v. Global Enterprises ${i + 1}`
        : `Rodriguez v. City of Springfield ${i + 1}`,
  type: i % 3 === 0 ? "Criminal" : i % 3 === 1 ? "Corporate" : "Civil",
  status: i % 2 === 0 ? "Ongoing" : i % 4 === 1 ? "Resolved" : i % 4 === 3 ? "Appealed" : "Dismissed",
  date: new Date(2023, 0, (i + 1) * 10),
  confidence: 70 + (i % 10) * 3,
  description:
    i % 3 === 0
      ? "A criminal case involving allegations of securities fraud and financial misrepresentation."
      : i % 3 === 1
        ? "A corporate lawsuit regarding intellectual property infringement and patent violations."
        : "A civil rights case concerning alleged violations by local government entities.",
  tags:
    i % 3 === 0
      ? ["Securities", "Fraud", "Financial"]
      : i % 3 === 1
        ? ["Intellectual Property", "Patents", "Corporate"]
        : ["Civil Rights", "Government", "Constitutional"],
  lawCodes:
    i % 3 === 0
      ? ["18 U.S.C. § 1348", "15 U.S.C. § 78j"]
      : i % 3 === 1
        ? ["35 U.S.C. § 101", "17 U.S.C. § 501"]
        : ["42 U.S.C. § 1983", "28 U.S.C. § 1331"],
}))

export default function SearchPage() {
  // Filter states
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [dateRange, setDateRange] = useState<{ from: string; to: string }>({ from: "", to: "" })
  const [confidenceThreshold, setConfidenceThreshold] = useState<number>(70)
  const [lawCodeQuery, setLawCodeQuery] = useState("")

  // Active filters for display
  const [activeFilters, setActiveFilters] = useState<{ id: string; label: string }[]>([])

  // Filtered cases
  const [filteredCases, setFilteredCases] = useState(ALL_CASES)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState("relevance")
  const casesPerPage = 9

  // Apply filters
  const applyFilters = () => {
    const newActiveFilters: { id: string; label: string }[] = []

    // Filter cases based on all criteria
    let results = ALL_CASES.filter((caseItem) => {
      // Search query filter
      const matchesSearch =
        searchQuery === "" ||
        caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        caseItem.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        caseItem.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        caseItem.lawCodes.some((code) => code.toLowerCase().includes(searchQuery.toLowerCase()))

      // Case type filter
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(caseItem.type)

      // Status filter
      const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(caseItem.status)

      // Date range filter
      const matchesDateFrom = !dateRange.from || new Date(caseItem.date) >= new Date(dateRange.from)
      const matchesDateTo = !dateRange.to || new Date(caseItem.date) <= new Date(dateRange.to)

      // Confidence threshold filter
      const matchesConfidence = caseItem.confidence >= confidenceThreshold

      // Law code filter
      const matchesLawCode =
        lawCodeQuery === "" || caseItem.lawCodes.some((code) => code.toLowerCase().includes(lawCodeQuery.toLowerCase()))

      return (
        matchesSearch &&
        matchesType &&
        matchesStatus &&
        matchesDateFrom &&
        matchesDateTo &&
        matchesConfidence &&
        matchesLawCode
      )
    })

    // Sort results
    if (sortBy === "recent") {
      results = [...results].sort((a, b) => b.date.getTime() - a.date.getTime())
    } else if (sortBy === "confidence") {
      results = [...results].sort((a, b) => b.confidence - a.confidence)
    }

    // Build active filters list
    if (searchQuery) {
      newActiveFilters.push({ id: "search", label: `Search: ${searchQuery}` })
    }

    if (selectedTypes.length > 0) {
      newActiveFilters.push({ id: "types", label: `Types: ${selectedTypes.join(", ")}` })
    }

    if (selectedStatuses.length > 0) {
      newActiveFilters.push({ id: "statuses", label: `Status: ${selectedStatuses.join(", ")}` })
    }

    if (dateRange.from || dateRange.to) {
      const dateLabel = []
      if (dateRange.from) dateLabel.push(`From: ${dateRange.from}`)
      if (dateRange.to) dateLabel.push(`To: ${dateRange.to}`)
      newActiveFilters.push({ id: "dates", label: dateLabel.join(", ") })
    }

    if (confidenceThreshold > 70) {
      newActiveFilters.push({ id: "confidence", label: `AI Confidence: ${confidenceThreshold}%+` })
    }

    if (lawCodeQuery) {
      newActiveFilters.push({ id: "lawCode", label: `Law Code: ${lawCodeQuery}` })
    }

    setActiveFilters(newActiveFilters)
    setFilteredCases(results)
    setCurrentPage(1)
  }

  // Handle type checkbox change
  const handleTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setSelectedTypes((prev) => [...prev, type])
    } else {
      setSelectedTypes((prev) => prev.filter((t) => t !== type))
    }
  }

  // Handle status checkbox change
  const handleStatusChange = (status: string, checked: boolean) => {
    if (checked) {
      setSelectedStatuses((prev) => [...prev, status])
    } else {
      setSelectedStatuses((prev) => prev.filter((s) => s !== status))
    }
  }

  // Remove a specific filter
  const removeFilter = (filterId: string) => {
    switch (filterId) {
      case "search":
        setSearchQuery("")
        break
      case "types":
        setSelectedTypes([])
        break
      case "statuses":
        setSelectedStatuses([])
        break
      case "dates":
        setDateRange({ from: "", to: "" })
        break
      case "confidence":
        setConfidenceThreshold(70)
        break
      case "lawCode":
        setLawCodeQuery("")
        break
    }
  }

  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery("")
    setSelectedTypes([])
    setSelectedStatuses([])
    setDateRange({ from: "", to: "" })
    setConfidenceThreshold(70)
    setLawCodeQuery("")
    setActiveFilters([])
    setFilteredCases(ALL_CASES)
    setCurrentPage(1)
  }

  // Handle sort change
  const handleSortChange = (value: string) => {
    setSortBy(value)
  }

  // Calculate pagination
  const totalPages = Math.ceil(filteredCases.length / casesPerPage)
  const currentCases = filteredCases.slice((currentPage - 1) * casesPerPage, currentPage * casesPerPage)

  // Apply filters when any filter changes
  useEffect(() => {
    applyFilters()
  }, [selectedTypes, selectedStatuses, confidenceThreshold, sortBy])

  // Generate pagination items
  const paginationItems = []
  for (let i = 1; i <= Math.min(totalPages, 5); i++) {
    paginationItems.push(
      <Button
        key={i}
        variant="outline"
        size="sm"
        className={currentPage === i ? "bg-primary text-primary-foreground" : ""}
        onClick={() => setCurrentPage(i)}
      >
        {i}
      </Button>,
    )
  }

  if (totalPages > 5) {
    paginationItems.push(<span key="ellipsis">...</span>)
    paginationItems.push(
      <Button
        key={totalPages}
        variant="outline"
        size="sm"
        className={currentPage === totalPages ? "bg-primary text-primary-foreground" : ""}
        onClick={() => setCurrentPage(totalPages)}
      >
        {totalPages}
      </Button>,
    )
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-6 max-w-6xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold mb-2">Search Cases</h1>
          <p className="text-muted-foreground">
            Search and filter through public legal cases with advanced AI insights.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <Card className="md:w-64 h-fit">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Filter className="h-4 w-4 mr-2" /> Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Case Type</h3>
                <div className="space-y-2">
                  {["Criminal", "Civil", "Corporate", "Family", "Immigration", "Tax", "Other"].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`type-${type.toLowerCase()}`}
                        checked={selectedTypes.includes(type)}
                        onCheckedChange={(checked) => handleTypeChange(type, checked === true)}
                      />
                      <Label htmlFor={`type-${type.toLowerCase()}`} className="text-sm font-normal">
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-medium">Date Range</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label htmlFor="date-from" className="text-xs">
                      From
                    </Label>
                    <Input
                      id="date-from"
                      type="date"
                      className="h-8"
                      value={dateRange.from}
                      onChange={(e) => setDateRange((prev) => ({ ...prev, from: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="date-to" className="text-xs">
                      To
                    </Label>
                    <Input
                      id="date-to"
                      type="date"
                      className="h-8"
                      value={dateRange.to}
                      onChange={(e) => setDateRange((prev) => ({ ...prev, to: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">AI Confidence</h3>
                  <span className="text-xs text-muted-foreground">{confidenceThreshold}%+</span>
                </div>
                <Slider
                  value={[confidenceThreshold]}
                  max={100}
                  step={5}
                  onValueChange={(value) => setConfidenceThreshold(value[0])}
                />
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-medium">Law Codes</h3>
                <Input
                  placeholder="e.g., 18 U.S.C."
                  className="h-8"
                  value={lawCodeQuery}
                  onChange={(e) => setLawCodeQuery(e.target.value)}
                />
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-medium">Status</h3>
                <div className="space-y-2">
                  {["Ongoing", "Resolved", "Appealed", "Dismissed"].map((status) => (
                    <div key={status} className="flex items-center space-x-2">
                      <Checkbox
                        id={`status-${status.toLowerCase()}`}
                        checked={selectedStatuses.includes(status)}
                        onCheckedChange={(checked) => handleStatusChange(status, checked === true)}
                      />
                      <Label htmlFor={`status-${status.toLowerCase()}`} className="text-sm font-normal">
                        {status}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full" onClick={applyFilters}>
                Apply Filters
              </Button>
            </CardContent>
          </Card>

          {/* Search Results */}
          <div className="flex-1 space-y-6">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by case name, keywords, or law codes..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && applyFilters()}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {activeFilters.map((filter) => (
                    <Badge key={filter.id} variant="outline" className="flex items-center gap-1">
                      {filter.label}
                      <button className="ml-1 text-xs" onClick={() => removeFilter(filter.id)}>
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
                {activeFilters.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                    Clear All
                  </Button>
                )}
              </div>
            </div>

            <Tabs defaultValue={sortBy} className="w-full" onValueChange={handleSortChange}>
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="relevance">Most Relevant</TabsTrigger>
                  <TabsTrigger value="recent">Most Recent</TabsTrigger>
                  <TabsTrigger value="confidence">Highest Confidence</TabsTrigger>
                </TabsList>
                <span className="text-sm text-muted-foreground">
                  Showing {Math.min(filteredCases.length, currentPage * casesPerPage)} of {filteredCases.length} results
                </span>
              </div>

              <TabsContent value="relevance" className="space-y-4 mt-4">
                {currentCases.length > 0 ? (
                  currentCases.map((caseItem) => (
                    <Card key={caseItem.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <CardHeader className="md:flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <Badge>{caseItem.type}</Badge>
                                <Badge variant="outline">{caseItem.status}</Badge>
                              </div>
                              <CardTitle className="text-lg">
                                <Link href={`/cases/${caseItem.id}`} className="hover:underline">
                                  {caseItem.title}
                                </Link>
                              </CardTitle>
                            </div>
                            <div className="text-sm text-muted-foreground flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {caseItem.date.toLocaleDateString()}
                            </div>
                          </div>
                          <div className="mt-2">
                            <p className="text-sm text-muted-foreground">{caseItem.description}</p>
                            <div className="mt-3 flex flex-wrap gap-1">
                              {caseItem.tags.map((tag, j) => (
                                <Badge key={j} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardHeader>
                        <CardFooter className="flex md:flex-col justify-between p-4 border-t md:border-t-0 md:border-l bg-muted/30 md:w-48">
                          <div className="space-y-2">
                            <div className="text-sm">
                              <span className="text-muted-foreground">AI Confidence:</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-full bg-muted rounded-full h-2 mr-2">
                                <div
                                  className="bg-primary h-2 rounded-full"
                                  style={{ width: `${caseItem.confidence}%` }}
                                ></div>
                              </div>
                              <span className="text-xs font-medium">{caseItem.confidence}%</span>
                            </div>
                          </div>
                          <div className="flex md:mt-4 space-x-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/cases/${caseItem.id}`}>
                                <Eye className="h-3 w-3 mr-1" /> View
                              </Link>
                            </Button>
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/cases/${caseItem.id}/chat`}>
                                <MessageSquare className="h-3 w-3 mr-1" /> Chat
                              </Link>
                            </Button>
                          </div>
                        </CardFooter>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No cases match your search criteria</p>
                    <Button variant="outline" className="mt-4" onClick={clearAllFilters}>
                      Clear Filters
                    </Button>
                  </div>
                )}

                {filteredCases.length > casesPerPage && (
                  <div className="flex justify-center mt-6">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      >
                        Previous
                      </Button>
                      {paginationItems}
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="recent" className="space-y-4 mt-4">
                {/* Content is dynamically generated based on the sortBy state */}
              </TabsContent>

              <TabsContent value="confidence" className="space-y-4 mt-4">
                {/* Content is dynamically generated based on the sortBy state */}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

