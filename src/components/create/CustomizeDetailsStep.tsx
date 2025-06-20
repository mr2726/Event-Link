
'use client';

import type { Template } from '@/app/create/page';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox'; 

import WeddingInvitePreview from './templates/WeddingInvitePreview';
import CorporateInvitePreview from './templates/CorporateInvitePreview';
import MeetupInvitePreview from './templates/MeetupInvitePreview';
import PartyInvitePreview from './templates/PartyInvitePreview';
import ConferenceInvitePreview from './templates/ConferenceInvitePreview';
import StreamInvitePreview from './templates/StreamInvitePreview'; // Import new template

const eventDetailsSchema = z.object({
  eventName: z.string().min(3, { message: "Event name must be at least 3 characters." }).default("My Awesome Event"),
  eventDate: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format." }).default("2025-12-31"),
  eventTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: "Invalid time format (HH:MM)." }).default("19:00"),
  eventLocation: z.string().min(3, { message: "Location must be at least 3 characters." }).default("The Grand Hall"),
  eventDescription: z.string().min(10, { message: "Description must be at least 10 characters." }).max(500, {message: "Description must be 500 characters or less."}).default("Join us for a fantastic celebration!"),
  optionalLink: z.string().url({ message: "Invalid URL." }).optional().or(z.literal('')).default(''),
  primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, { message: "Invalid hex color."}).default('#BE29FF'),
  fontStyle: z.string().default('Space Grotesk'),
  twitterLink: z.string().url({ message: "Invalid Twitter URL." }).optional().or(z.literal('')).default(''),
  linkedinLink: z.string().url({ message: "Invalid LinkedIn URL." }).optional().or(z.literal('')).default(''),
  telegramLink: z.string().url({ message: "Invalid Telegram URL." }).optional().or(z.literal('')).default(''),
  whatsappLink: z.string().url({ message: "Invalid WhatsApp URL (e.g., https://wa.me/1234567890)." }).optional().or(z.literal('')).default(''),
  googleMeetLink: z.string().url({ message: "Invalid Google Meet URL." }).optional().or(z.literal('')).default(''),
  zoomLink: z.string().url({ message: "Invalid Zoom URL." }).optional().or(z.literal('')).default(''),
  twitchLink: z.string().url({ message: "Invalid Twitch URL." }).optional().or(z.literal('')).default(''),
  youtubeLink: z.string().url({ message: "Invalid YouTube URL." }).optional().or(z.literal('')).default(''),
  enableRsvp: z.boolean().default(false).optional(),
  customRsvpQuestion: z.string().max(100, {message: "Custom question must be 100 characters or less."}).optional().or(z.literal('')).default(''),
});

export type EventDetailsFormData = z.infer<typeof eventDetailsSchema>;

interface CustomizeDetailsStepProps {
  template: Template;
  onSubmit: (data: EventDetailsFormData) => void;
  initialData?: EventDetailsFormData | null;
}

const renderSelectedTemplatePreview = (template: Template, formData: EventDetailsFormData) => {
  const previewContainerClasses = "w-full h-auto object-cover rounded-md border border-border overflow-hidden shadow-lg";

  switch (template.id) {
    case 'wedding':
      return <div className={previewContainerClasses}><WeddingInvitePreview template={template} formData={formData} /></div>;
    case 'corporate':
      return <div className={previewContainerClasses}><CorporateInvitePreview template={template} formData={formData} /></div>;
    case 'meetup':
      return <div className={previewContainerClasses}><MeetupInvitePreview template={template} formData={formData} /></div>;
    case 'party':
      return <div className={previewContainerClasses}><PartyInvitePreview template={template} formData={formData} /></div>;
    case 'conference':
      return <div className={previewContainerClasses}><ConferenceInvitePreview template={template} formData={formData} /></div>;
    case 'stream': // Add case for new template
      return <div className={previewContainerClasses}><StreamInvitePreview template={template} formData={formData} /></div>;
    default:
      return <div className="w-full aspect-[3/4] bg-muted flex items-center justify-center text-sm text-muted-foreground rounded-md border border-border">No preview available for this template.</div>;
  }
};


const CustomizeDetailsStep: React.FC<CustomizeDetailsStepProps> = ({ template, onSubmit, initialData }) => {
  const form = useForm<EventDetailsFormData>({
    resolver: zodResolver(eventDetailsSchema),
    defaultValues: initialData || eventDetailsSchema.parse({}), 
  });

  const watchedValues = form.watch();
  const watchEnableRsvp = form.watch("enableRsvp");

  const handleSubmitForm: SubmitHandler<EventDetailsFormData> = (data) => {
    onSubmit(data);
  };

  return (
    <section className="animate-fadeIn">
      <h2 className="text-3xl font-bold font-headline text-center mb-2 text-primary">Step 2: Customize Details</h2>
      <p className="text-center text-muted-foreground mb-6">
        You selected: <span className="font-semibold text-accent">{template.name}</span>. Now, fill in the event specifics.
      </p>
      
      <div className="grid md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-1 p-1 bg-card rounded-lg shadow-lg sticky top-24">
            <h3 className="text-xl font-semibold font-headline text-foreground mb-3 px-3 pt-3">Live Preview</h3>
            {renderSelectedTemplatePreview(template, watchedValues)}
            <p className="text-sm text-muted-foreground mt-2 px-3 pb-3">{template.description}</p>
        </div>

        <div className="md:col-span-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmitForm)} className="space-y-6 p-6 bg-card rounded-lg shadow-lg">
              <FormField
                control={form.control}
                name="eventName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., My Awesome Birthday Party" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="eventDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="eventTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="eventLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location / Platform</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 123 Main St, Anytown, USA or Online / YouTube Live" {...field} />
                    </FormControl>
                    <FormDescription>For online events, mention the platform (e.g., Zoom, YouTube Live).</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="eventDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tell your guests about the event..." {...field} rows={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="optionalLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Main Event Link (e.g., Stream Link, Zoom, Registration)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://your-event-link.com" {...field} />
                    </FormControl>
                    <FormDescription>If your event has a primary online link, add it here. This will be the main call-to-action.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <h3 className="text-lg font-semibold font-headline text-foreground pt-4 border-t border-border">Invite Customization</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="primaryColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Color</FormLabel>
                      <FormControl>
                        <Input type="color" {...field} className="p-1 h-10 w-full block"/>
                      </FormControl>
                      <FormDescription>Choose a primary color for your invite.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fontStyle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Font Style</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a font" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Space Grotesk">Space Grotesk (Modern)</SelectItem>
                          <SelectItem value="Arial">Arial (Classic Sans)</SelectItem>
                          <SelectItem value="Times New Roman">Times New Roman (Classic Serif)</SelectItem>
                          <SelectItem value="Montserrat">Montserrat (Stylish Sans)</SelectItem>
                          <SelectItem value="Playfair Display">Playfair Display (Elegant Serif)</SelectItem>
                          <SelectItem value="Parisienne">Parisienne (Cursive Script)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Select a font for your invite's text.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <h3 className="text-lg font-semibold font-headline text-foreground pt-4 border-t border-border">Social &amp; Meeting Links (Optional)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="twitterLink" render={({ field }) => ( <FormItem> <FormLabel>Twitter</FormLabel> <FormControl><Input placeholder="https://twitter.com/yourprofile" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="linkedinLink" render={({ field }) => ( <FormItem> <FormLabel>LinkedIn</FormLabel> <FormControl><Input placeholder="https://linkedin.com/in/yourprofile" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="telegramLink" render={({ field }) => ( <FormItem> <FormLabel>Telegram</FormLabel> <FormControl><Input placeholder="https://t.me/yourgroup" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="whatsappLink" render={({ field }) => ( <FormItem> <FormLabel>WhatsApp</FormLabel> <FormControl><Input placeholder="https://wa.me/1234567890" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="googleMeetLink" render={({ field }) => ( <FormItem> <FormLabel>Google Meet</FormLabel> <FormControl><Input placeholder="https://meet.google.com/abc-defg-hij" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="zoomLink" render={({ field }) => ( <FormItem> <FormLabel>Zoom</FormLabel> <FormControl><Input placeholder="https://zoom.us/j/1234567890" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="twitchLink" render={({ field }) => ( <FormItem> <FormLabel>Twitch</FormLabel> <FormControl><Input placeholder="https://twitch.tv/yourchannel" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="youtubeLink" render={({ field }) => ( <FormItem> <FormLabel>YouTube Channel</FormLabel> <FormControl><Input placeholder="https://youtube.com/yourchannel" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
              </div>

              <h3 className="text-lg font-semibold font-headline text-foreground pt-4 border-t border-border">RSVP &amp; Guest Data Collection</h3>
                <FormField
                  control={form.control}
                  name="enableRsvp"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 shadow">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="cursor-pointer">
                          Enable Registration / RSVP
                        </FormLabel>
                        <FormDescription>
                          Collect guest names, emails, and an answer to one custom question. Analytics page will be generated.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                {watchEnableRsvp && (
                  <FormField
                    control={form.control}
                    name="customRsvpQuestion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Custom Question for Guests (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Any dietary restrictions? or What topic are you most interested in?" {...field} />
                        </FormControl>
                        <FormDescription>This question will be asked if Registration/RSVP is enabled. Keep it short (max 100 chars).</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}


              <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                Save Details &amp; Proceed
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default CustomizeDetailsStep;
