"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ActivityService } from "@/src/services/activity.service";
import { ErrorModal } from "./ErrorModal";
import { FaStar, FaRegStar } from "react-icons/fa";

interface StarRatingProps {
  activityId: number;
}

export const StarRating = ({ activityId }: StarRatingProps) => {
  const router = useRouter();
  const [hoveredStar, setHoveredStar] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [hasVoted, setHasVoted] = useState(false);
  const [submittedScore, setSubmittedScore] = useState<number>(0); 
  
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleVote = async (score: number) => {
    if (isSubmitting || hasVoted) return;
    
    setIsSubmitting(true);
    setErrorMessage(null);
    
    try {
      await ActivityService.addVote(activityId, score);
      
      setSubmittedScore(score);
      setHasVoted(true);
      router.refresh(); 
    } catch (error: any) {
      console.error("Voting error:", error);
      setErrorMessage("Could not submit your rating. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-2">
      
      <ErrorModal 
        isOpen={errorMessage !== null} 
        message={errorMessage || ""} 
        onClose={() => setErrorMessage(null)} 
      />

      <div className="flex items-center gap-1.5">
        {[1, 2, 3, 4, 5].map((starPosition) => {
          const isFilled = hasVoted 
            ? starPosition <= submittedScore 
            : starPosition <= hoveredStar;

          const StarIcon = isFilled ? FaStar : FaRegStar;

          return (
            <button
              key={starPosition}
              type="button"
              disabled={isSubmitting || hasVoted}
              onMouseEnter={() => setHoveredStar(starPosition)}
              onMouseLeave={() => setHoveredStar(0)}
              onClick={() => handleVote(starPosition)}
              className="focus:outline-none disabled:cursor-default transition-all"
            >
              <StarIcon
                className={`w-4 h-4 transition-all duration-200 ${
                  hasVoted
                    ? isFilled 
                        ? "text-gray-400" 
                        : "text-gray-200"
                    : isFilled
                        ? "text-black scale-110"
                        : "text-gray-300 hover:text-gray-400"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Feedback Text */}
      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
        {isSubmitting 
          ? "Submitting..." 
          : hasVoted 
            ? `✓ You rated ${submittedScore}/5` 
            : "Rate this class"}
      </span>
    </div>
  );
};