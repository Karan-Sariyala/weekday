import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 4,
};

export default function JobCards() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const jobs = useSelector((state) => state.jobs.data);
  
  if (!jobs || !jobs.jdList) {
    return <div>No jobs available</div>;
  }

  return (
    <section>
      <div className="jobCardWrapper">
        {jobs.jdList.map((job, index) => {
          return (
            <Card sx={{ maxWidth: 300 }} className="jobCard" key={index}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 13 }}
                  gutterBottom
                  className="postedOn"
                >
                  Posted 10 days ago
                </Typography>
                <div className="flex">
                  <Avatar
                    sx={{ objectFit: "contain", marginRight: "8px" }}
                    variant="square"
                    src={job.logoUrl}
                  ></Avatar>
                  <div className="flex flex-col">
                    <Typography variant="body1" color="text.secondary">
                      {job.companyName}
                    </Typography>
                    <Typography variant="body1">{job.jobRole}</Typography>
                    <Typography variant="body1">{job.location}</Typography>
                  </div>
                </div>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  gutterBottom
                >
                  Estimated salary: {job.salaryCurrencyCode}
                  <span> {job.minJdSalary ? job.minJdSalary : "NA"}</span> -
                  <span> {job.maxJdSalary ? job.maxJdSalary : "NA"}</span>
                </Typography>
                <Typography>About company :</Typography>
                <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                  About us
                </Typography>
                <Typography
                  paragraph
                  sx={{ maxHeight: 200 }}
                  className="jobDesc"
                >
                  {job.jobDetailsFromCompany}
                </Typography>
                <Typography
                  sx={{ fontSize: 14, fontWeight: 500, color: "#D4D4D4" }}
                >
                  Minimum experience
                </Typography>
                <Typography>{job.minExp ? job.minExp : "NA"} years</Typography>
                <div>
                  <Button
                    variant="text"
                    className="viewJobBtn"
                    onClick={handleOpen}
                  >
                    View job
                  </Button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    style={{
                      backdropFilter: "blur(1px)",
                      backgroundColor: "transparent",
                    }}
                    className="removeBgColor"
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {job.jobDetailsFromCompany}
                      </Typography>
                    </Box>
                  </Modal>
                </div>
              </CardContent>
              <CardActions>
                <div className="flex flex-col buttonWrapper">
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      backgroundColor: "#54EFC3",
                      color: "#000",
                      fontWeight: 600,
                      borderRadius: "10px",
                    }}
                  >
                    Easy apply
                  </Button>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      backgroundColor: "##4943DA",
                      color: "#fff",
                      fontWeight: 600,
                      borderRadius: "10px",
                    }}
                  >
                    Unlock referral asks
                  </Button>
                </div>
              </CardActions>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
