import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import {
  setBookmarks,
  removeBookmark,
  addBookmark,
} from "@/store/slices/bookmarkSlice";
import FooterComponent from "@/components/FooterComponent";
import BookmarkJobListMappingComponent from "@/components/BookmarkJobListMappingComponent";
import axios from "axios";
import Cookies from "js-cookie";
import { AuthHandler } from "@/utils/auth.utils";
import { Navbar } from "@/components/NavigationBar/Navbar";
import { toast } from "sonner";

const BookmarkPage: React.FC = () => {
  const authHandler = new AuthHandler();
  authHandler.authorizeUser("jobhunter");

  const dispatch = useDispatch<AppDispatch>();
  const bookmarks = useSelector(
    (state: RootState) => state.bookmarks.bookmarks
  );
  const validBookmarks = Array.isArray(bookmarks) ? bookmarks : [];

  const fetchBookmarks = async () => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        console.error("Token is missing from cookies.");
        return;
      }
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/applyjob/bookmark`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const jobWishlist = response.data.bookmarks?.jobWishlist || [];
      dispatch(setBookmarks(jobWishlist));
    } catch (error) {
      console.error("Failed to fetch bookmarks:", error);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, [dispatch]);

  const handleAddBookmark = async (jobPostId: number) => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        toast.error("You need to be logged in to add bookmark");
        return;
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/applyjob/bookmark`,
        { jobPostId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(addBookmark(response.data.bookmark));
      fetchBookmarks();
    } catch (error) {
      console.error("Failed to add bookmark:", error);
    }
  };

  const handleRemoveBookmark = async (wishlistId: number) => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        console.error("Token is missing from cookies.");
        return;
      }

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/applyjob/bookmark/remove`,
        { wishlist_id: wishlistId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(removeBookmark(wishlistId));
      fetchBookmarks();
    } catch (error) {
      console.error("Failed to remove bookmark:", error);
    }
  };

  return (
    <div className="mt-5 mx-4">
      <Navbar pageRole={"jobhunter"} />

      <div className="mx-auto">
        <div className="max-w-screen-xl mx-auto bg-white mt-5 rounded-xl px-4 md:px-0">
          <h1 className="ml-4 font-bold text-4xl py-6">Job Bookmarks</h1>
        </div>
      </div>
      <div className="w-full mt-5 mb-10">
        <BookmarkJobListMappingComponent
          jobPosts={validBookmarks}
          onRemoveBookmark={handleRemoveBookmark}
          onAddBookmark={handleAddBookmark}
        />
      </div>
      <FooterComponent />
    </div>
  );
};

export default BookmarkPage;
