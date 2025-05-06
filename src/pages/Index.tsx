
import React, { useState } from "react";
import Header from "@/components/Header";
import EmailFormSection from "@/components/EmailFormSection";
import EmailOutputSection from "@/components/EmailOutputSection";
import { generateEmail, type EmailParams, type EmailOutput } from "@/lib/emailGenerator";

const Index = () => {
  // Form state
  const [emailType, setEmailType] = useState<string>("promotional");
  const [tone, setTone] = useState<string>("professional");
  const [purpose, setPurpose] = useState<string>("");
  const [keyPoints, setKeyPoints] = useState<string>("");
  const [audience, setAudience] = useState<string>("");
  const [callToAction, setCallToAction] = useState<string>("");
  
  // Output state
  const [subjectLine, setSubjectLine] = useState<string>("");
  const [emailBody, setEmailBody] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleGenerate = async () => {
    if (!purpose) {
      alert("Please enter the purpose of your email");
      return;
    }

    setIsGenerating(true);

    try {
      const params: EmailParams = {
        emailType,
        tone,
        purpose,
        keyPoints,
        audience,
        callToAction,
      };

      const result = await generateEmail(params);
      setSubjectLine(result.subjectLine);
      setEmailBody(result.emailBody);
    } catch (error) {
      console.error("Error generating email:", error);
      alert("Error generating email. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col gradient-bg">
      <Header />
      
      <main className="flex-1 container py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-brand-800">Create Your Email</h2>
            <EmailFormSection
              emailType={emailType}
              setEmailType={setEmailType}
              tone={tone}
              setTone={setTone}
              purpose={purpose}
              setPurpose={setPurpose}
              keyPoints={keyPoints}
              setKeyPoints={setKeyPoints}
              audience={audience}
              setAudience={setAudience}
              callToAction={callToAction}
              setCallToAction={setCallToAction}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-6 text-brand-800">Preview & Copy</h2>
            <EmailOutputSection
              subjectLine={subjectLine}
              emailBody={emailBody}
              loading={isGenerating}
            />
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Email Scribe helps you craft perfect emails for any occasion.
            <br />
            Simply fill in the details, and our AI will generate a professionally written email for you.
          </p>
        </div>
      </main>
      
      <footer className="py-6 border-t bg-white">
        <div className="container">
          <p className="text-sm text-center text-gray-500">
            &copy; {new Date().getFullYear()} Email Scribe - AI Email Assistant
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
