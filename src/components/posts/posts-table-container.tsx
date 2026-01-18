"use client";

import type { DateRangeOption } from "@/components/charts/date-range-selector";
import { getDateRange } from "@/components/charts/date-range-selector";
import { PostsTable } from "@/components/posts/posts-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePosts } from "@/hooks/use-posts";

type PostsTableContainerProps = {
  dateRange?: DateRangeOption;
};

export function PostsTableContainer({
  dateRange = "7d",
}: PostsTableContainerProps) {
  const { data: posts, isLoading, error } = usePosts(dateRange);
  const dateRangeInfo = getDateRange(dateRange);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Posts</CardTitle>
        <CardDescription>
          Posts from {dateRangeInfo.label.toLowerCase()} across platforms
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="flex h-32 items-center justify-center text-destructive">
            Error loading posts: {error.message}
          </div>
        ) : (
          <PostsTable posts={posts ?? []} isLoading={isLoading} />
        )}
      </CardContent>
    </Card>
  );
}
