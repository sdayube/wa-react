import { GetServerSideProps } from 'next';
import { useState } from 'react';
import {
  Container,
  Card,
  Header,
  JobsContainer,
  Input,
  Button,
} from '../../styles/pages/jobs';

interface Job {
  jobId: string;
  jobTitle: string;
  companyName: string;
  jobDescription: string;
  postedDate: string;
}

interface Props {
  jobs: Job[];
}

// The Jobs component wil render the 'test/jobs' page.
export default function Jobs({ jobs }: Props) {
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [page, setPage] = useState(1);
  const [companyName, setCompanyName] = useState('');

  // This function will be used to filter the jobs by company name. The search
  // will be case insensitive.
  function handleFilterJobs() {
    const filtered = jobs.filter(
      (job) => job.companyName.toLowerCase() === companyName.toLowerCase(),
    );
    setFilteredJobs(filtered);
  }

  // This function will be used to filter jobs posted only in the last 7 days.
  function handleFilterByDate() {
    const filtered = jobs.filter((job) => {
      const daysAgo = job.postedDate.match(/\d+/);
      return daysAgo && parseInt(daysAgo[0]) <= 7;
    });
    setFilteredJobs(filtered);
  }

  return (
    <div>
      <Header>
        <h1>Zippia Jobs</h1>
      </Header>

      <Container>
        <Input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <Button
          type="button"
          onClick={() => {
            handleFilterJobs();
            setPage(1);
            setCompanyName('');
          }}
        >
          Jobs by Company Name
        </Button>
        <Button
          type="button"
          onClick={() => {
            handleFilterByDate();
            setPage(1);
          }}
        >
          Jobs Posted in the Last 7 Days
        </Button>
        <Button type="button" onClick={() => setFilteredJobs(jobs)}>
          Reset Filters
        </Button>
      </Container>

      <JobsContainer>
        {filteredJobs.slice((page - 1) * 10, page * 10).map((job) => (
          <Card key={job.jobId}>
            <h2>{job.jobTitle}</h2>
            <h3>{job.companyName}</h3>
            {/* Since the descriptions are returned in rich text format, we */
            /* use the dangerouslySetInnerHTML prop to render the HTML */}
            <div dangerouslySetInnerHTML={{ __html: job.jobDescription }} />
          </Card>
        ))}
      </JobsContainer>

      <Container>
        {!filteredJobs.length && <h2>No jobs found</h2>}
        {page > 1 && (
          <Button type="button" onClick={() => setPage(page - 1)}>
            Previous Page
          </Button>
        )}
        {page < filteredJobs.length / 10 && (
          <Button type="button" onClick={() => setPage(page + 1)}>
            Next Page
          </Button>
        )}
      </Container>
    </div>
  );
}

// We use this function to get the data from the Zippia API before the page is rendered. This function is called on the server side.
export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('https://www.zippia.com/api/jobs/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      companySkills: true,
      dismissedListingHashes: [],
      fetchJobDesc: true,
      jobTitle: 'Business Analyst',
      locations: [],
      numJobs: 20,
      previousListingHashes: [],
    }),
  });

  const data = await res.json();

  return {
    props: data,
  };
};
