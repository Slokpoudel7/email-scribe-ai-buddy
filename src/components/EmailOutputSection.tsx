
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface EmailOutputSectionProps {
  subjectLine: string;
  emailBody: string;
  loading: boolean;
}

const EmailOutputSection: React.FC<EmailOutputSectionProps> = ({
  subjectLine,
  emailBody,
  loading,
}) => {
  const [copied, setCopied] = useState<"none" | "subject" | "body" | "all">("none");
  const { toast } = useToast();

  const handleCopy = (text: string, type: "subject" | "body" | "all") => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    toast({
      title: "Copied to clipboard",
      description: `${type.charAt(0).toUpperCase() + type.slice(1)} has been copied to clipboard.`,
    });
    setTimeout(() => setCopied("none"), 2000);
  };

  const fullEmail = `Subject: ${subjectLine}\n\n${emailBody}`;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl text-brand-700">Generated Email</CardTitle>
        <Button
          variant="outline"
          onClick={() => handleCopy(fullEmail, "all")}
          disabled={!emailBody || loading}
          className="flex gap-1 items-center"
        >
          {copied === "all" ? (
            <>
              <Check size={16} /> Copied
            </>
          ) : (
            <>
              <Copy size={16} /> Copy All
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {loading ? (
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
            </div>
          </div>
        ) : emailBody ? (
          <>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-700">Subject Line:</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(subjectLine, "subject")}
                  className="h-8 px-2 text-gray-500"
                >
                  {copied === "subject" ? <Check size={16} /> : <Copy size={16} />}
                </Button>
              </div>
              <p className="p-3 bg-gray-50 rounded-md">{subjectLine}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-700">Email Body:</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(emailBody, "body")}
                  className="h-8 px-2 text-gray-500"
                >
                  {copied === "body" ? <Check size={16} /> : <Copy size={16} />}
                </Button>
              </div>
              <div className="p-4 bg-white border rounded-md email-container">
                <div className="whitespace-pre-line">{emailBody}</div>
              </div>
            </div>
          </>
        ) : (
          <div className="py-8 text-center">
            <p className="text-gray-500">Your generated email will appear here</p>
            <p className="text-sm text-gray-400 mt-2">
              Fill in the parameters on the left and click "Generate Email"
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmailOutputSection;
