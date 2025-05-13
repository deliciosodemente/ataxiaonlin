import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InfoCardProps {
  title: string;
  description: string;
  delay?: string;
}

export default function InfoCard({ title, description, delay = "0s" }: InfoCardProps) {
  return (
    <Card 
      className="bg-card/50 backdrop-blur-md shadow-xl info-card-hover section-fade-in border-border"
      style={{ animationDelay: delay }}
    >
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
