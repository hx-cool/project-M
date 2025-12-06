import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface NoResultsFoundProps {
  query?: string;
}

export const NoResultsFound = ({ query }: NoResultsFoundProps) => {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center px-4">
        <p className="text-gray-400 text-lg mb-8">
          {query ? `We couldn't find "${query}"` : "We couldn't find what you're looking for"}
        </p>
        <div className="bg-white/[0.03] rounded-2xl p-8 backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-pink mb-4">Request a Movie or Series</h3>
          <p className="text-gray-300 mb-6">We’ll process it and add the content within hour.</p>
          <Button className="bg-gradient-to-r from-pink to-magenta text-white font-bold px-8 py-3 rounded-lg">
            <Send className="mr-2 h-5 w-5" />
            Request on Telegram
          </Button>
        </div>
      </div>
    </div>
  );
};