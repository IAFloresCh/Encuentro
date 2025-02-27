import Link from "next/link";
/*
const getTopicById = async (id) => {
  const apiUrl = process.env.API_URL
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
    <div className="p-6 border border-slate-300">
      <h1 className="font-bold text-3xl mb-2">{topic.title}</h1>
      <p className="text-gray-600 mb-4">
        {topic.date ? new Date(topic.date).toLocaleDateString("es-ES") : "No date"}
      </p>
      <p className="text-lg">{topic.description}</p>


      {topic.extraFields && topic.extraFields.length > 0 && (
        <div className="mt-4">
          <h3 className="font-bold text-xl">Detalles adicionales:</h3>
          {topic.extraFields.map((field, index) => (
            <div key={index} className="border p-3 my-2">
              <p className="font-semibold">{field.text}</p>
              <p className="text-gray-700">{field.textarea}</p>
            </div>
          ))}
        </div>
      )}

      <Link href="/" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
        Volver a la lista
      </Link>
    </div>
  );
}
*/