import axios from 'axios';
import React, { useState } from 'react';

const CompanyJobPost = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobCategory, setJobCategory] = useState('');
  const [city, setCity] = useState('');
  const [education, setEducation] = useState('');
  const [experience, setExperience] = useState('');
  const [days, setDays] = useState([]);
  const [hours, setHours] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [vacancies, setVacancies] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState('');
  const [tags, setTags] = useState([]);

  const handleTagAddition = (event) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      const skill = skills.trim();
      if (skill && !tags.includes(skill)) {
        setTags([...tags, skill]);
        setSkills('');
      }
    }
  };

  const handleTagRemoval = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const registrationNumber = localStorage.getItem('companyRegistrationNumber');

    const jobData = {
      jobTitle,
      jobCategory,
      city,
      education,
      experience,
      days,
      hours,
      age,
      gender,
      minSalary,
      maxSalary,
      vacancies,
      description,
      skills: tags,
      c_registrationNo: registrationNumber  
    };

    axios.post('http://localhost:3001/post-job', jobData)
      .then(response => {
        console.log(response.data);
        alert('Job posted successfully');
      })
      .catch(error => {
        console.error('There was an error posting the job!', error);
      });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {/* First Row */}
        <div className="form-row">
          <label htmlFor="job-title">Job Title</label>
          <input
            type="text"
            id="job-title"
            name="job-title"
            placeholder="Add job title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
          />
        </div>

        {/* Second Row */}
        <div className="form-row double-column">
          <div className="column">
            <label htmlFor="job-category">Job Category</label>
            <select
              id="job-category"
              name="job-category"
              value={jobCategory}
              onChange={(e) => setJobCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
            </select>
          </div>
          <div className="column">
            <label htmlFor="city">City</label>
            <select
              id="city"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            >
              <option value="">Select City</option>
              <option value="city1">City 1</option>
              <option value="city2">City 2</option>
            </select>
          </div>
          <div className="empty-space"></div>
        </div>

        <br />
        <div className="form-row">
          <label htmlFor="additional-info">Additional Information</label>
        </div>
        <div className="form-row double-column">
          <div className="column" style={{ width: 'fit-content' }}>
            <label htmlFor="education">Education</label>
            <select
              id="education"
              name="education"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              required
            >
              <option value="">Select Education</option>
              <option value="education1">Education 1</option>
              <option value="education2">Education 2</option>
            </select>
          </div>
          <div className="column" style={{ width: 'fit-content' }}>
            <label htmlFor="experience">Experience</label>
            <select
              id="experience"
              name="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
            >
              <option value="">Select Experience</option>
              <option value="experience1">Experience 1</option>
              <option value="experience2">Experience 2</option>
            </select>
          </div>
          <div className="column" style={{ width: 'fit-content' }}>
            <label>Days of Week</label>
            <div className="checkbox-group" style={{ marginTop: '10px' }}>
              {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
                <label key={day}>
                  <input
                    type="checkbox"
                    name="days"
                    value={day}
                    checked={days.includes(day)}
                    onChange={(e) => {
                      const selectedDays = e.target.checked
                        ? [...days, day]
                        : days.filter(d => d !== day);
                      setDays(selectedDays);
                    }}
                  />
                  <span>{day.charAt(0).toUpperCase()}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="column" style={{ width: 'fit-content' }}>
            <label htmlFor="hours">Hours</label>
            <input
              type="number"
              id="hours"
              name="hours"
              placeholder="Hours"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-row double-column">
          <div className="column" style={{ width: '20%' }}>
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div className="column" style={{ width: '20%' }}>
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="empty-space"></div>
        </div>

        {/* Third Row */}
        <div className="form-row double-column">
          <div className="column">
            <label htmlFor="min-salary">Minimum Salary</label>
            <input
              type="number"
              id="min-salary"
              name="min-salary"
              placeholder="Add min salary"
              value={minSalary}
              onChange={(e) => setMinSalary(e.target.value)}
              required
            />
          </div>
          <div className="column">
            <label htmlFor="max-salary">Maximum Salary</label>
            <input
              type="number"
              id="max-salary"
              name="max-salary"
              placeholder="Add max salary"
              value={maxSalary}
              onChange={(e) => setMaxSalary(e.target.value)}
              required
            />
          </div>
          <div className="empty-space"></div>
        </div>

        {/* Fourth Row */}
        <div className="form-row double-column">
          <div className="column">
            <label htmlFor="vacancies">Vacancies</label>
            <input
              type="number"
              id="vacancies"
              name="vacancies"
              placeholder="Add vacancies"
              value={vacancies}
              onChange={(e) => setVacancies(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <label htmlFor="description">Job Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Add job description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="skills">Skills</label>
          <input
            type="text"
            id="skills"
            name="skills"
            placeholder="Type and press space to add skill"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            onKeyDown={handleTagAddition}
          />
          <div className="tags-container">
            {tags.map(tag => (
              <span key={tag} className="tag">
                {tag}
                <button type="button" onClick={() => handleTagRemoval(tag)}>x</button>
              </span>
            ))}
          </div>
        </div>

        <div className="form-row">
          <button type="submit">Post Job</button>
        </div>
      </form>
    </div>
  );
};

export default CompanyJobPost;
