use('zenclass');

// 1. Find all topics and tasks taught in the month of October
db.topics.aggregate([
  {
    $match: {
      date: {
        $gte: ISODate("2020-10-01"),
        $lte: ISODate("2020-10-31")
      }
    }
  },
  {
    $lookup: {
      from: "tasks",
      localField: "topic_id",
      foreignField: "topic_id",
      as: "tasks"
    }
  }
]);

// 2. Find all the company drives between 15th Oct 2020 and 31st Oct 2020
db.company_drives.find({
  drive_date: {
    $gte: ISODate("2020-10-15"),
    $lte: ISODate("2020-10-31")
  }
});

// 3. Find all company drives attended by user_id: 1
db.company_drives.find({ user_id: 1 });

// 4. Find number of problems solved by each user in codekata
db.codekata.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "user_id",
      foreignField: "user_id",
      as: "user_details"
    }
  },
  {
    $project: {
      _id: 0,
      user: { $arrayElemAt: ["$user_details.name", 0] },
      problems_solved: 1
    }
  }
]);

// 5. Find mentors with more than 1 mentee
db.users.aggregate([
  {
    $group: {
      _id: "$mentor_id",
      mentee_count: { $sum: 1 }
    }
  },
  {
    $match: {
      mentee_count: { $gt: 1 }
    }
  },
  {
    $lookup: {
      from: "mentors",
      localField: "_id",
      foreignField: "mentor_id",
      as: "mentor"
    }
  }
]);

// 6. Find users who were absent and did not submit tasks between 15 Oct and 31 Oct 2020
const absentUserIds = db.attendance.find({
  date: { $gte: ISODate("2020-10-15"), $lte: ISODate("2020-10-31") },
  status: "absent"
}).map(doc => doc.user_id);

db.tasks.find({
  user_id: { $in: absentUserIds },
  submitted: false
});

// 7. Find total number of problems solved by all users
db.codekata.aggregate([
  {
    $group: {
      _id: null,
      total_problems_solved: { $sum: "$problems_solved" }
    }
  }
]);

// 8. Find all topics taught and tasks assigned on the same day
db.topics.aggregate([
  {
    $lookup: {
      from: "tasks",
      localField: "topic_id",
      foreignField: "topic_id",
      as: "related_tasks"
    }
  },
  {
    $match: {
      related_tasks: { $ne: [] }
    }
  }
]);

// 9. Find users who attended all the company drives
db.users.find({
  user_id: {
    $in: db.company_drives.distinct("user_id")
  }
});

// 10. Find students who did not attend any class and did not submit any task
const attendedUserIds = db.attendance.distinct("user_id");
const submittedTaskUserIds = db.tasks.distinct("user_id");

db.users.find({
  user_id: {
    $nin: [...new Set([...attendedUserIds, ...submittedTaskUserIds])]
  }
});
