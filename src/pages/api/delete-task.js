import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const { taskId } = req.query;

    try {
      const client = await MongoClient.connect(
        "mongodb+srv://vaibhavdesai510:aS8CiIHvxbGSuIju@cluster0.7wbat33.mongodb.net/todo?retryWrites=true&w=majority"
      );

      const db = client.db("todo");
      const collection = db.collection("todo");

      await collection.deleteOne({ _id: taskId });

      client.close();

      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting task" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
