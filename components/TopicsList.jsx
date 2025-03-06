import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

const getTopics = async () => {
  const apiUrl = process.env.API_URL;
  try {
    const res = await fetch(`${apiUrl}/api/topics`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

export default async function TopicsList() {
  const { topics } = await getTopics();

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {topics.map((t) => (
          <div
            key={t._id}
            className="w-full sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12 mx-auto bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 mb-6"
          >
            <Link href={`/viewTopic/${t._id}`} className="block p-4">
              <h2 className="font-semibold text-xl text-gray-900">{t.title}</h2>
              <p className="text-gray-500 text-sm">
                {t.date ? new Date(t.date).toLocaleDateString("es-ES") : "No date"}
              </p>
              <p className="text-gray-700 mt-2">{t.description}</p>
            </Link>

            <div className="flex justify-between items-center p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <RemoveBtn id={t._id} />
                <Link href={`/editTopic/${t._id}`}>
                  <HiPencilAlt size={20} className="text-gray-600 hover:text-blue-500 transition-colors" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
