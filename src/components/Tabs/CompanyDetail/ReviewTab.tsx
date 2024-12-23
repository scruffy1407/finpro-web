import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { TabsContentProps } from "@/models/page.model";
import EmptyResultState from "@/components/EmptyResultState";
import ListSkeleton from "@/components/listSkeleton";
import JobPostComponentSkeleton from "@/components/JobPostSkeleton";
import ReviewComponent from "@/components/ReviewComponent";
import { reviewResponse } from "@/models/company.model";

interface ReviewListProps extends TabsContentProps {
  data: reviewResponse[] | undefined;
  isLoading: boolean;
}

function ReviewTab({ value, data, isLoading }: ReviewListProps) {
  // dummyState

  return (
    <TabsContent
      className={`flex flex-col gap-4 mt-0 data-[state=active]:flex data-[state=inactive]:hidden`}
      value={value}
    >
      {isLoading ? (
        <ListSkeleton
          numberItem={6}
          ListItemComponent={JobPostComponentSkeleton}
          className={`grid lg:grid-cols-2 gap-4 overflow-hidden`}
        />
      ) : data?.length === 0 ? (
        <EmptyResultState
          image={"/noResult.webp"}
          title={`There are no review for this company`}
          description={`Have you worked or are you currently working here? Share your anonymous experience to help other job seekers`}
        />
      ) : (
        <>
          <div className="flex flex-col gap-2">
            <h2 className={"font-bold text-xl text-neutral-950"}>
              Company Review
            </h2>
            <p className={"text-neutral-600"}>
              Please note that all reviews are anonymous and not reviewed by the
              Pathway team.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-4 overflow-hidden">
            {data.map((review) => {
              return (
                <ReviewComponent
                  reviewTitle={review.reviewTitle}
                  reviewDescription={review.reviewDescription}
                  culturalRating={review.culturalRating}
                  careerPathRating={review.careerPathRating}
                  facilictyRating={review.facilityRating}
                  totalYear={3}
                  workBalanceRating={review.workLifeBalanceRating}
                />
              );
            })}
          </div>
        </>
      )}
    </TabsContent>
  );
}

export default ReviewTab;
