import { MongoClient, ObjectId } from "mongodb";

async function connectToCluster() {
  const uri = process.env.DB_URI;
  let mongoClient;

  try {
    mongoClient = new MongoClient(uri);
    await mongoClient.connect();

    return mongoClient;
  } catch (error) {
    console.error("Connection to MongoDB Atlas failed!", error);
    process.exit();
  }
}

export async function getUser(id) {
  let mongoClient;

  try {
    mongoClient = await connectToCluster();
    const db = mongoClient.db("laboratorioremotofi");
    const collection = db.collection("users");
    return await collection.findOne({ id });
  } finally {
    await mongoClient.close();
  }
}

export async function getStudentGroups(studentId, groupsIds) {
  let mongoClient;

  try {
    mongoClient = await connectToCluster();
    const db = mongoClient.db("laboratorioremotofi");
    const subjectsCollection = db.collection("subjects");
    const schedulesCollection = db.collection("schedules");
    const practicesCollection = db.collection("practices");

    const groups = [];

    for (const index in groupsIds) {
      const groupId = groupsIds[index];
      const semester = groupId.split("_")[0];
      const subjectId = groupId.split("_")[1];
      const groupNumber = groupId.split("_")[2];

      const subject = await subjectsCollection.findOne({ id: subjectId });

      const practices = [];

      for (const practiceId of subject?.practicesIds) {
        const practice = await practicesCollection.findOne({
          id: practiceId,
        });

        const currentStudentSchedule = await schedulesCollection.findOne({
          subjectId,
          practiceId,
          studentId,
        });
        practice.currentStudentSchedule = currentStudentSchedule;

        practices.push(practice);
      }

      const group = {
        ...subject,
        semester,
        groupNumber,
        subjectId,
        id: groupId,
        practices,
      };

      groups.push(group);
    }

    return groups;
  } finally {
    await mongoClient.close();
  }
}

export async function updateSchedule(id, scheduleData) {
  let mongoClient;

  try {
    mongoClient = await connectToCluster();
    const db = mongoClient.db("laboratorioremotofi");
    const schedulesCollection = db.collection("schedules");

    const result = await schedulesCollection.findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: scheduleData },
      { returnDocument: "after" }
    );

    return result;
  } finally {
    await mongoClient.close();
  }
}

export async function reserveSchedule(
  studentId,
  subjectId,
  practiceId,
  timestamp
) {
  let mongoClient;

  try {
    mongoClient = await connectToCluster();
    const db = mongoClient.db("laboratorioremotofi");
    const schedulesCollection = db.collection("schedules");

    await schedulesCollection.updateOne(
      {
        studentId: studentId,
        subjectId: subjectId,
        practiceId: practiceId,
        status: "SCHEDULED",
      },
      { $set: { timestamp } },
      { upsert: true }
    );

    const reservedSchedule = await schedulesCollection.findOne({
      studentId,
      subjectId,
      practiceId,
    });

    return reservedSchedule;
  } finally {
    await mongoClient.close();
  }
}

export async function getSchedules({ practiceId, subjectId, status }) {
  let mongoClient;

  try {
    mongoClient = await connectToCluster();
    const db = mongoClient.db("laboratorioremotofi");
    const schedulesCollection = db.collection("schedules");

    const schedules = await schedulesCollection
      .find({ practiceId, subjectId, status })
      .toArray();

    return schedules;
  } finally {
    await mongoClient.close();
  }
}
