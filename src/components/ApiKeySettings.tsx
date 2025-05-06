
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Save, X } from "lucide-react";
import { getApiKey, setApiKey, hasApiKey, clearApiKey } from "@/lib/apiKeyStorage";
import { useToast } from "@/hooks/use-toast";

interface ApiKeySettingsProps {
  onClose: () => void;
}

const ApiKeySettings: React.FC<ApiKeySettingsProps> = ({ onClose }) => {
  const [apiKey, setApiKeyState] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load API key on component mount
    setApiKeyState(getApiKey());
  }, []);

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      setApiKey(apiKey.trim());
      toast({
        title: "API Key Saved",
        description: "Your API key has been saved and will be used for email generation.",
      });
      onClose();
    } else {
      clearApiKey();
      toast({
        title: "API Key Cleared",
        description: "Your API key has been removed.",
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">DeepSeek AI API Settings</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X size={18} />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="api-key">API Key</Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                id="api-key"
                type={showApiKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKeyState(e.target.value)}
                placeholder="Enter your DeepSeek AI API key"
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={() => setShowApiKey(!showApiKey)}
              >
                {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
              </Button>
            </div>
            <Button onClick={handleSaveApiKey} className="flex gap-1 items-center">
              <Save size={16} />
              Save
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Your API key is stored locally on your device only and is never sent to our servers.
          </p>
        </div>
        <div className="pt-2">
          <p className="text-sm text-gray-600">
            {hasApiKey() 
              ? "✅ API key is configured. The application will use your DeepSeek AI API key for email generation."
              : "❌ No API key configured. Please add your DeepSeek AI API key to use advanced email generation features."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiKeySettings;
