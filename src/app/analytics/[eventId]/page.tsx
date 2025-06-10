
'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound, useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc, collection, query, orderBy, getDocs, Timestamp } from 'firebase/firestore';
import type { EventDetailsFormData } from '@/components/create/CustomizeDetailsStep';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Download, Loader2, BarChartHorizontalBig, Eye } from 'lucide-react';
import { format } from 'date-fns';

interface RsvpResponse {
  id: string;
  name: string;
  email: string;
  customAnswer?: string;
  submittedAt: Timestamp | null; 
}

interface FullEventData extends EventDetailsFormData {
  visitCount?: number;
}

export default function AnalyticsPage() {
  const params = useParams();
  const eventId = params.eventId as string;
  const router = useRouter();

  const [eventDetails, setEventDetails] = useState<FullEventData | null>(null);
  const [responses, setResponses] = useState<RsvpResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!eventId) {
      setError("Event ID is missing.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null); 
      try {
        const eventDocRef = doc(db, "invites", eventId);
        const eventDocSnap = await getDoc(eventDocRef);

        if (!eventDocSnap.exists()) {
          setError("Event not found.");
          setLoading(false);
          return;
        }

        const eventData = eventDocSnap.data();
        const currentEventDetails = eventData?.eventDetails as EventDetailsFormData;
        const visitCount = eventData?.visitCount as number | undefined;
        
        setEventDetails({ ...currentEventDetails, visitCount });
        document.title = `Analytics for ${currentEventDetails?.eventName || 'Event'} - EventLink`;

        if (currentEventDetails?.enableRsvp) {
          const responsesColRef = collection(db, "invites", eventId, "responses");
          const q = query(responsesColRef, orderBy("submittedAt", "desc"));
          const responsesSnap = await getDocs(q);
          
          const fetchedResponses: RsvpResponse[] = [];
          responsesSnap.forEach((docSnap) => {
            const data = docSnap.data();
            fetchedResponses.push({ 
              id: docSnap.id, 
              name: data.name,
              email: data.email,
              customAnswer: data.customAnswer,
              submittedAt: data.submittedAt || null, 
            });
          });
          setResponses(fetchedResponses);
        }
      } catch (e) {
        console.error("Error fetching analytics data:", e);
        setError("Failed to load analytics data. Please ensure you have the correct permissions and the event ID is valid.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [eventId]);

  const downloadCSV = () => {
    if (!eventDetails?.enableRsvp || !responses.length) return;

    const headers = ["Name", "Email"];
    if (eventDetails.customRsvpQuestion) {
      headers.push(eventDetails.customRsvpQuestion.replace(/,/g, '')); 
    }
    headers.push("Submitted At");

    const csvRows = [
      headers.join(','),
      ...responses.map(res => {
        const row = [
          `"${(res.name || '').replace(/"/g, '""')}"`,
          `"${(res.email || '').replace(/"/g, '""')}"`,
        ];
        if (eventDetails.customRsvpQuestion) {
          row.push(`"${(res.customAnswer || '').replace(/"/g, '""')}"`);
        }
        row.push(res.submittedAt ? format(res.submittedAt.toDate(), "yyyy-MM-dd HH:mm:ss") : '');
        return row.join(',');
      })
    ];
    
    const csvString = csvRows.join('\n');
    const blob = new Blob([`\uFEFF${csvString}`], { type: 'text/csv;charset=utf-8;' }); 
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `${(eventDetails.eventName || 'event').replace(/[^a-z0-9]/gi, '_')}_rsvp_responses.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Loading Analytics...</p>
      </div>
    );
  }
  
  const PageLayout: React.FC<{children: React.ReactNode, title?: string, description?: string, showBackButton?: boolean, showCsvButton?: boolean}> = 
    ({children, title, description, showBackButton = true, showCsvButton = false }) => (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <header className="max-w-5xl mx-auto mb-8 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          {showBackButton && (
            <Button variant="outline" asChild className="mb-4 md:mb-0">
                <Link href={eventId ? `/invite/${eventId}`: '/create'}><ArrowLeft className="mr-2 h-4 w-4" /> Back to Invite</Link>
            </Button>
          )}
          {title && <h1 className="text-2xl md:text-3xl font-bold text-primary mt-2">{title}</h1>}
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
        {showCsvButton && (
             <Button onClick={downloadCSV} variant="outline" className="border-accent text-accent hover:bg-accent/10 self-start md:self-center">
                <Download className="mr-2 h-4 w-4" /> Download CSV
            </Button>
        )}
      </header>
      <main className="max-w-5xl mx-auto">
        {children}
      </main>
      <footer className="mt-12 text-center max-w-5xl mx-auto">
        <p className="text-sm text-muted-foreground">
          Powered by <a href="/" className="text-accent hover:underline">EventLink</a>
        </p>
      </footer>
    </div>
  );

  if (error) {
     return (
        <PageLayout title="Analytics Unavailable" showBackButton={!!eventId} showCsvButton={false}>
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl text-destructive flex items-center">
                        <BarChartHorizontalBig className="mr-3 h-7 w-7" /> Analytics Error
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{error}</p>
                     <Button variant="link" onClick={() => router.push(eventId ? `/invite/${eventId}`: '/create')} className="mt-4 px-0 text-primary">
                        {eventId ? "Go to Invite Page" : "Create a New Invite"}
                    </Button>
                </CardContent>
            </Card>
        </PageLayout>
    );
  }

  if (!eventDetails) { 
      notFound(); 
      return null;
  }

  const pageTitle = eventDetails.enableRsvp 
    ? `${eventDetails.eventName} - RSVP Analytics` 
    : `${eventDetails.eventName} - Visit Analytics`;
  const pageDescription = eventDetails.enableRsvp 
    ? "View responses submitted by your guests and total invite views." 
    : "See how many times your invitation link has been viewed.";

  return (
    <PageLayout 
        title={pageTitle}
        description={pageDescription}
        showCsvButton={!!(eventDetails.enableRsvp && responses.length > 0)}
    >
        <Card className="shadow-lg">
          <CardHeader>
             <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <CardTitle className="flex items-center">
                    {eventDetails.enableRsvp ? <BarChartHorizontalBig className="mr-2 h-5 w-5 text-primary" /> : <Eye className="mr-2 h-5 w-5 text-primary" />}
                    {eventDetails.enableRsvp ? `Guest Responses (${responses.length})` : 'Invitation Views'}
                </CardTitle>
                {eventDetails.visitCount !== undefined && (
                    <p className="text-sm text-muted-foreground sm:text-right">
                        Total Views: <span className="font-semibold text-accent">{eventDetails.visitCount}</span>
                    </p>
                )}
            </div>
            {eventDetails.enableRsvp && eventDetails.customRsvpQuestion && (
                <CardDescription>Your Custom Question: "{eventDetails.customRsvpQuestion}"</CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {eventDetails.enableRsvp ? (
              responses.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[200px] min-w-[150px]">Name</TableHead>
                        <TableHead className="w-[250px] min-w-[200px]">Email</TableHead>
                        {eventDetails.customRsvpQuestion && (
                          <TableHead className="min-w-[200px]">{eventDetails.customRsvpQuestion || 'Custom Answer'}</TableHead>
                        )}
                        <TableHead className="text-right w-[180px] min-w-[150px]">Submitted At</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {responses.map((response) => (
                        <TableRow key={response.id}>
                          <TableCell className="font-medium">{response.name}</TableCell>
                          <TableCell>{response.email}</TableCell>
                          {eventDetails.customRsvpQuestion && (
                            <TableCell>{response.customAnswer || <span className="text-muted-foreground italic">No answer</span>}</TableCell>
                          )}
                          <TableCell className="text-right">
                            {response.submittedAt ? format(response.submittedAt.toDate(), "MMM d, yyyy HH:mm") : <span className="text-muted-foreground italic">N/A</span>}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">No RSVP responses yet. Share your invite link to collect RSVPs!</p>
              )
            ) : (
              <p className="text-muted-foreground text-center py-8">RSVP data collection was not enabled for this event.</p>
            )}
          </CardContent>
        </Card>
    </PageLayout>
  );
}

    