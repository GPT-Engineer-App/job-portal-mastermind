import React, { useState } from "react";
import { Container, VStack, Text, Input, Button, Box, FormControl, FormLabel, Textarea, IconButton, HStack } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Index = () => {
  const [jobs, setJobs] = useState([]);
  const [jobDetails, setJobDetails] = useState({ title: "", description: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [currentJobId, setCurrentJobId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobDetails({ ...jobDetails, [name]: value });
  };

  const handleSubmit = () => {
    if (isEditing) {
      setJobs(jobs.map((job) => (job.id === currentJobId ? { ...job, ...jobDetails } : job)));
      setIsEditing(false);
      setCurrentJobId(null);
    } else {
      setJobs([...jobs, { ...jobDetails, id: Date.now() }]);
    }
    setJobDetails({ title: "", description: "" });
  };

  const handleEdit = (id) => {
    const job = jobs.find((job) => job.id === id);
    setJobDetails({ title: job.title, description: job.description });
    setIsEditing(true);
    setCurrentJobId(id);
  };

  const handleDelete = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Job Board</Text>
        <FormControl id="job-title">
          <FormLabel>Job Title</FormLabel>
          <Input name="title" value={jobDetails.title} onChange={handleInputChange} placeholder="Enter job title" />
        </FormControl>
        <FormControl id="job-description">
          <FormLabel>Job Description</FormLabel>
          <Textarea name="description" value={jobDetails.description} onChange={handleInputChange} placeholder="Enter job description" />
        </FormControl>
        <Button onClick={handleSubmit} colorScheme="teal" width="100%">
          {isEditing ? "Update Job" : "Create Job"}
        </Button>
        <Box width="100%">
          <Text fontSize="xl" mt={8} mb={4}>
            Active Jobs
          </Text>
          {jobs.map((job) => (
            <Box key={job.id} p={4} borderWidth="1px" borderRadius="lg" mb={4}>
              <HStack justifyContent="space-between">
                <Box>
                  <Text fontSize="lg" fontWeight="bold">
                    {job.title}
                  </Text>
                  <Text>{job.description}</Text>
                </Box>
                <HStack spacing={2}>
                  <IconButton aria-label="Edit Job" icon={<FaEdit />} onClick={() => handleEdit(job.id)} />
                  <IconButton aria-label="Delete Job" icon={<FaTrash />} onClick={() => handleDelete(job.id)} />
                </HStack>
              </HStack>
            </Box>
          ))}
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
