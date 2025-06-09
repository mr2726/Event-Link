import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Zap, Link2, Users, Share2, Send, Video } from 'lucide-react';
import { WhatsappIcon } from '@/components/icons/WhatsappIcon';

const features = [
  {
    icon: <Zap className="h-8 w-8 text-accent" />,
    title: 'Instant Invite Creation',
    description: 'Design beautiful event invitations in seconds. No complex tools, just quick and easy.',
  },
  {
    icon: <Link2 className="h-8 w-8 text-accent" />,
    title: 'Short Link Generation',
    description: 'Get a unique, shareable short link for every event. Perfect for SMS, email, or social media.',
  },
  {
    icon: <Users className="h-8 w-8 text-accent" />,
    title: 'RSVP Tracking',
    description: 'Monitor responses in real-time. Know who is coming and manage your guest list effortlessly.',
  },
  {
    icon: <Share2 className="h-8 w-8 text-accent" />,
    title: 'Platform Integrations',
    description: 'Seamlessly connect with your favorite platforms for event notifications and joining.',
    integrations: [
      { name: 'Telegram', icon: <Send className="h-6 w-6 text-accent" /> },
      { name: 'WhatsApp', icon: <WhatsappIcon className="h-6 w-6 text-accent" /> },
      { name: 'Zoom', icon: <Video className="h-6 w-6 text-accent" /> },
    ]
  },
];

export function Features() {
  return (
    <section id="features" className="w-full py-16 md:py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm text-accent font-medium">Key Features</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-primary">
            Everything You Need to Host Amazing Events
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            EventLink offers a suite of powerful features designed to make your event planning seamless and effective.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="flex flex-col bg-background shadow-lg hover:shadow-accent/20 transition-shadow duration-300 animate-fadeIn" style={{ animationDelay: `${index * 0.1 + 0.2}s` }}>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl font-semibold font-headline text-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
                {feature.integrations && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium text-foreground">Integrates with:</p>
                    <div className="flex flex-wrap gap-2">
                      {feature.integrations.map(integration => (
                        <div key={integration.name} className="flex items-center gap-1.5 p-1.5 rounded-md bg-muted" title={integration.name}>
                          {integration.icon}
                          <span className="text-xs text-muted-foreground">{integration.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
