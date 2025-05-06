
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface EmailFormSectionProps {
  emailType: string;
  setEmailType: (type: string) => void;
  tone: string;
  setTone: (tone: string) => void;
  purpose: string;
  setPurpose: (purpose: string) => void;
  keyPoints: string;
  setKeyPoints: (keyPoints: string) => void;
  audience: string;
  setAudience: (audience: string) => void;
  callToAction: string;
  setCallToAction: (callToAction: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

const EmailFormSection: React.FC<EmailFormSectionProps> = ({
  emailType,
  setEmailType,
  tone,
  setTone,
  purpose,
  setPurpose,
  keyPoints,
  setKeyPoints,
  audience,
  setAudience,
  callToAction,
  setCallToAction,
  onGenerate,
  isGenerating,
}) => {
  const emailTypes = [
    "promotional",
    "follow-up",
    "cold-outreach",
    "newsletter",
    "thank-you",
    "apology",
    "support",
  ];

  const toneOptions = [
    "professional",
    "friendly",
    "persuasive",
    "casual",
    "urgent",
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl text-brand-700">
          Email Parameters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email-type">Email Type</Label>
          <div className="flex flex-wrap gap-2">
            {emailTypes.map((type) => (
              <Button
                key={type}
                variant={emailType === type ? "default" : "outline"}
                onClick={() => setEmailType(type)}
                className="capitalize"
              >
                {type.replace("-", " ")}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tone">Tone</Label>
          <div className="flex flex-wrap gap-2">
            {toneOptions.map((option) => (
              <Button
                key={option}
                variant={tone === option ? "default" : "outline"}
                onClick={() => setTone(option)}
                className="capitalize"
              >
                {option}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="purpose">Purpose of Email</Label>
          <Textarea
            id="purpose"
            placeholder="What's the main purpose of this email? (e.g., introducing a new product, following up after a meeting...)"
            className="min-h-[80px]"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="key-points">Key Points</Label>
          <Textarea
            id="key-points"
            placeholder="What key points, details, or information should be included? (one per line)"
            className="min-h-[120px]"
            value={keyPoints}
            onChange={(e) => setKeyPoints(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="audience">Target Audience</Label>
          <Input
            id="audience"
            placeholder="Who is this email for? (e.g., potential customers, current clients, team members...)"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="call-to-action">Call to Action</Label>
          <Input
            id="call-to-action"
            placeholder="What action do you want recipients to take? (e.g., schedule a call, visit website...)"
            value={callToAction}
            onChange={(e) => setCallToAction(e.target.value)}
          />
        </div>

        <Button 
          onClick={onGenerate} 
          className="w-full bg-brand-600 hover:bg-brand-700"
          disabled={isGenerating}
        >
          {isGenerating ? "Generating..." : "Generate Email"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default EmailFormSection;
