import * as React from "react";
import { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Filters from "../assets/filtersData.json";
import { TextField } from "@mui/material";
import { useSelector } from "react-redux";

export default function Filter() {
  const [role, setRole] = useState("");
  const [noOfEmployees, setNoOfEmployees] = useState("");
  const [experience, setExperience] = useState("");
  const [jobType, setJobType] = useState("");
  const [salary, setSalary] = useState("");

  const jobs = useSelector((state) => state.jobs.data);

  const filterJobs = () => {
    // Apply filters to jobs
    let filteredJobs = jobs?.jdList?.filter((job) => {
      let matchesRole = true;
      let matchesEmployees = true;
      let matchesExperience = true;
      let matchesJobType = true;
      let matchesSalary = true;

      if (role !== "") {
        matchesRole = job.jobRole === role;
      }

      return (
        matchesRole &&
        matchesEmployees &&
        matchesExperience &&
        matchesJobType &&
        matchesSalary
      );
    });

    // Update UI with filtered jobs
    console.log(filteredJobs);
  };

  // Call filter function when any filter changes
  useEffect(() => {
    filterJobs();
  }, [role, noOfEmployees, experience, jobType, salary]);

  return (
    <section className="filterSection">
      <FormControl className="filterWrapper">
        <InputLabel id="roles">Roles</InputLabel>
        <Select
          labelId="roles"
          id="role"
          value={role}
          label="Roles"
          onChange={(e) => setRole(e.target.value)}
        >
          {Filters.roles.map((role, index) => (
            <MenuItem key={index} value={role}>
              {role}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className="filterWrapper">
        <InputLabel id="employees">Employees</InputLabel>
        <Select
          labelId="employees"
          id="employees"
          value={noOfEmployees}
          label="Roles"
          onChange={(e) => setNoOfEmployees(e.target.value)}
        >
          {Filters.noOfEmployees.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className="filterWrapper">
        <InputLabel id="experience">Experience</InputLabel>
        <Select
          labelId="experience"
          id="experience"
          value={experience}
          label="Experience"
          onChange={(e) => setExperience(e.target.value)}
        >
          {Filters.experience.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className="filterWrapper">
        <InputLabel id="jobType">Mode</InputLabel>
        <Select
          labelId="jobType"
          id="jobType"
          value={jobType}
          label="jobType"
          onChange={(e) => setJobType(e.target.value)}
        >
          {Filters.jobType.map((role, index) => (
            <MenuItem key={index} value={role}>
              {role}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className="filterWrapper">
        <InputLabel id="salary">Salary</InputLabel>
        <Select
          labelId="salary"
          id="salary"
          value={salary}
          label="salary"
          onChange={(e) => setSalary(e.target.value)}
        >
          {Filters.minSalary.map((role, index) => (
            <MenuItem key={index} value={role}>
              {role}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className="filterWrapper">
        <TextField
          id="outlined-basic"
          label="Company name"
          variant="outlined"
        />
      </FormControl>
    </section>
  );
}
