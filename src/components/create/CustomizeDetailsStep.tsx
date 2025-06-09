
'use client';

import type { Template } from '@/app/create/page';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Image from 'next/image';

const eventDetailsSchema = z.object({
  eventName: z.string().min(3, { message: "Event name must be at least 3 characters." }),
  eventDate: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format." }),
  eventTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: "Invalid time format (HH:MM)." }),
  eventLocation: z.string().min(3, { message: "Location must be at least 3 characters." }),
  eventDescription: z.string().min(10, { message: "Description must be at least 10 characters." }).max(500, {message: "Description must be 500 characters or less."}),
  optionalLink: z.string().url({ message: "Invalid URL." }).optional().or(z.literal('')),
  primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, { message: "Invalid hex color."}).default('#BE29FF'),
  fontStyle: z.string().default('Space Grotesk'),
});

export type EventDetailsFormData = z.infer<typeof eventDetailsSchema>;

interface CustomizeDetailsStepProps {
  template: Template;
  onSubmit: (data: EventDetailsFormData) => void;
  initialData?: EventDetailsFormData | null;
}

const CustomizeDetailsStep: React.FC<CustomizeDetailsStepProps> = ({ template, onSubmit, initialData }) => {
  const form = useForm<EventDetailsFormData>({
    resolver: zodResolver(eventDetailsSchema),
    defaultValues: initialData || {
      eventName: '',
      eventDate: '',
      eventTime: '',
      eventLocation: '',
      eventDescription: '',
      optionalLink: '',
      primaryColor: '#BE29FF', // Default to PRD primary
      fontStyle: 'Space Grotesk',
    },
  });

  const handleSubmit: SubmitHandler<EventDetailsFormData> = (data) => {
    onSubmit(data);
  };

  return (
    <section className="animate-fadeIn">
      <h2 className="text-3xl font-bold font-headline text-center mb-2 text-primary">Step 2: Customize Details</h2>
      <p className="text-center text-muted-foreground mb-6">
        You selected: <span className="font-semibold text-accent">{template.name}</span>. Now, fill in the event specifics.
      </p>
      
      <div className="grid md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-1 p-4 bg-card rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold font-headline text-foreground mb-3">Template Preview</h3>
            <Image
                src={template.previewImageUrl}
                alt={template.name}
                width={300}
                height={400}
                className="w-full h-auto object-cover rounded-md border border-border"
                data-ai-hint={template.aiHint}
            />
            <p className="text-sm text-muted-foreground mt-2">{template.description}</p>
        </div>

        <div className="md:col-span-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 p-6 bg-card rounded-lg shadow-lg">
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
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 123 Main St, Anytown, USA or Online" {...field} />
                    </FormControl>
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
                    <FormLabel>Optional Link (e.g., Zoom, Telegram)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://zoom.us/j/1234567890" {...field} />
                    </FormControl>
                    <FormDescription>If your event has an online component, add the link here.</FormDescription>
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
                        </SelectContent>
                      </Select>
                      <FormDescription>Select a font for your invite's text.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                Save Details & Proceed
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default CustomizeDetailsStep;
