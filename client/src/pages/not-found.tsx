import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <Card className="w-full max-w-md mx-4 border shadow-md">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center mb-6">
            <img 
              src="/acebot-logo.svg" 
              alt="AceBot Logo" 
              className="h-16 w-auto mb-4" 
            />
            <div className="flex items-center gap-2">
              <AlertCircle className="h-7 w-7 text-red-500" />
              <h1 className="text-2xl font-bold text-foreground">404 Page Not Found</h1>
            </div>
          </div>

          <p className="text-center text-muted-foreground mb-6">
            We couldn't find the page you were looking for. It might have been moved or doesn't exist.
          </p>
          
          <div className="flex justify-center">
            <Link href="/">
              <Button className="px-6">
                Return to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
