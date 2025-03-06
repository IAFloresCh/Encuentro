import Link from "next/link";

const getTopicById = async (id) => {
  const apiUrl = process.env.API_URL;
  try {
    const res = await fetch(`${apiUrl}/api/topics/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function ViewTopic({ params }) {
  const { id } = params;
  const { topic } = await getTopicById(id);

  if (!topic) return <p className="text-red-500">Tema no encontrado.</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 mb-8">
      <h1 className="font-semibold text-3xl text-gray-900 mb-3">{topic.title}</h1>
      <p className="text-gray-600 text-sm mb-4">
        {topic.date ? new Date(topic.date).toLocaleDateString("es-ES") : "No date"}
      </p>
      <p className="text-lg text-gray-700 mb-6">{topic.description}</p>

      {topic.extraFields && topic.extraFields.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold text-xl text-gray-900 mb-2">Detalles adicionales:</h3>
          {topic.extraFields.map((field, index) => (
            <div key={index} className="border border-gray-300 rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-shadow duration-300">
              <p className="font-semibold text-gray-800">{field.text}</p>
              <p className="text-gray-700">{field.textarea}</p>
            </div>
          ))}
        </div>
      )}

      <Link
        href="/"
        className="mt-6 inline-block bg-gradient-to-r from-[#f58529] to-[#f7a800] text-white py-2 px-6 rounded-full text-sm font-semibold transition-all hover:bg-gray-200"
      >
        Volver a la lista
      </Link>
    </div>
  );
}
