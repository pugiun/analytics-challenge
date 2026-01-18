"use client";

import { useQuery } from "@tanstack/react-query";
import type { DateRangeOption } from "@/components/charts/date-range-selector";
import { getDateRange } from "@/components/charts/date-range-selector";
import { createClient } from "@/lib/supabase/client";
import type { Post } from "@/types/database";

export function usePosts(dateRangeOption: DateRangeOption = "7d") {
  const supabase = createClient();

  return useQuery({
    queryKey: ["posts", dateRangeOption],
    queryFn: async (): Promise<Post[]> => {
      const dateRange = getDateRange(dateRangeOption);
      const { current } = dateRange;

      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .gte("posted_at", current.start.toISOString())
        .lte("posted_at", current.end.toISOString())
        .order("posted_at", { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return data as Post[];
    },
  });
}
