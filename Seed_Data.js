use('zenclass');

// Users
db.users.insertMany([
  { user_id: 1, name: "Mahadev", mentor_id: 101 },
  { user_id: 2, name: "Arjun", mentor_id: 102 },
  { user_id: 3, name: "Karthik", mentor_id: 101 },
  { user_id: 4, name: "Krishna", mentor_id: 103 }
]);

// Mentors
db.mentors.insertMany([
  { mentor_id: 101, name: "Mentor A" },
  { mentor_id: 102, name: "Mentor B" },
  { mentor_id: 103, name: "Mentor C" }
]);

// Codekata
db.codekata.insertMany([
  { user_id: 1, problems_solved: 100 },
  { user_id: 2, problems_solved: 120 },
  { user_id: 3, problems_solved: 80 },
  { user_id: 4, problems_solved: 75 }
]);

// Topics
db.topics.insertMany([
  { topic_id: 1, name: "HTML", date: ISODate("2020-10-05") },
  { topic_id: 2, name: "CSS", date: ISODate("2020-10-20") },
  { topic_id: 3, name: "JavaScript", date: ISODate("2020-11-01") }
]);

// Tasks
db.tasks.insertMany([
  { task_id: 1, topic_id: 1, user_id: 1, submitted: true },
  { task_id: 2, topic_id: 2, user_id: 2, submitted: false },
  { task_id: 3, topic_id: 2, user_id: 3, submitted: true }
]);

// Attendance
db.attendance.insertMany([
  { user_id: 1, date: ISODate("2020-10-15"), status: "present" },
  { user_id: 2, date: ISODate("2020-10-20"), status: "absent" },
  { user_id: 3, date: ISODate("2020-10-22"), status: "absent" }
]);

// Company Drives
db.company_drives.insertMany([
  { drive_id: 1, company: "Google", drive_date: ISODate("2020-10-16"), user_id: 1 },
  { drive_id: 2, company: "Amazon", drive_date: ISODate("2020-10-29"), user_id: 2 },
  { drive_id: 3, company: "Facebook", drive_date: ISODate("2020-11-05"), user_id: 3 }
]);
