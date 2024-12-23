import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Job {
    wishlist_id: number;
    jobPost: {
      job_id: number;
      job_title: string;
      salary_min: string;
      salary_max: string;
      job_type: string;
      job_space: string;
      job_experience_min: string;
      job_experience_max: string;
      salary_show: boolean;
      created_at: string;
      company: {
        company_name: string;
        company_city: string;
        logo: string;
      };
    };
  }

interface BookmarkState {
  bookmarks: Job[];
}

const initialState: BookmarkState = {
  bookmarks: [],
};

const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    setBookmarks: (state, action: PayloadAction<Job[]>) => {
      state.bookmarks = action.payload;
    },
    removeBookmark: (state, action: PayloadAction<number>) => {
      state.bookmarks = state.bookmarks.filter(
        (job) => job.wishlist_id !== action.payload
      );
    },
    addBookmark: (state, action: PayloadAction<Job>) => {
      state.bookmarks.push(action.payload);
    },
  },
});

export const { setBookmarks, removeBookmark, addBookmark } =
  bookmarkSlice.actions;
export default bookmarkSlice.reducer;
