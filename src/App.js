import "./App.css";
import Filter from "./components/filters";
import JobCards from "./components/cards";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobsAsync } from "./redux/jobs/jobSlicer";
import { CircularProgress } from "@mui/material";

function App() {
  const dispatch = useDispatch();
  const { data: jobs, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchJobsAsync({ limit: 10, offset: 0 }));
  }, [dispatch]);

  const [isBottom, setIsBottom] = useState(false);
  const [fetchingMoreJobs, setFetchingMoreJobs] = useState(false);

  useEffect(() => {
    // Function to check if user has scrolled to bottom
    const handleScroll = () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight =
        document.documentElement.clientHeight || window.innerHeight;
      const scrolledToBottom =
        Math.ceil(scrollTop + clientHeight) >= scrollHeight;
      setIsBottom(scrolledToBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setFetchingMoreJobs(true); // Set loading state to true before fetching more jobs
    dispatch(fetchJobsAsync({ limit: jobs?.jdList?.length + 10, offset: 0 }))
      .then(() => {
        setFetchingMoreJobs(false); // Reset loading state after fetching more jobs
      })
      .catch(() => {
        setFetchingMoreJobs(false); // Reset loading state if fetching more jobs fails
      });
  }, [isBottom]);

  // Render error state if there's an error
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="App">
      <Filter></Filter>
      <JobCards></JobCards>
      {fetchingMoreJobs && (
        <div className="flex jc-center">
          <CircularProgress sx={{ margin: 6 }} />
        </div>
      )}
    </div>
  );
}

export default App;
