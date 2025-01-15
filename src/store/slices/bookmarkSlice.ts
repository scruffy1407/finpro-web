import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

export interface Job {
  wishlist_id: number;
  jobPostId: number;
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
  loading: boolean;
  error: string | null;
}

const initialState: BookmarkState = {
  bookmarks: [],
  loading: false,
  error: null,
};

export const fetchBookmarks = createAsyncThunk(
  "bookmarks/fetchBookmarks",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        throw new Error("Token is missing from cookies.");
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/applyjob/bookmark`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data.bookmarks?.jobWishlist || [];
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    setBookmarks: (state, action: PayloadAction<Job[]>) => {
      state.bookmarks = action.payload;
    },
    removeBookmark: (state, action: PayloadAction<number>) => {
      state.bookmarks = state.bookmarks.filter(
        (bookmark) => bookmark.wishlist_id !== action.payload
      );
      toast.success("Job Removed from Bookmark")
    },
    addBookmark: (state, action: PayloadAction<Job>) => {
      state.bookmarks.push(action.payload);
      toast.success("Job successfully added to bookmark!");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookmarks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookmarks.fulfilled, (state, action) => {
        state.loading = false;
        state.bookmarks = action.payload;
      })
      .addCase(fetchBookmarks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setBookmarks, removeBookmark, addBookmark } =
  bookmarkSlice.actions;
export default bookmarkSlice.reducer;
