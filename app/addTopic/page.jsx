"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTopic() {
  const [selectedDate, setSelectedDate] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [extraFields, setExtraFields] = useState([]);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDate || !title || !description || extraFields.some(field => !field.text || !field.textarea)) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    try {
      const res = await fetch("/api/topics", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          date: selectedDate,
          title,
          description,
          extraFields: extraFields.filter(field => field.text.trim() !== "" && field.textarea.trim() !== ""),
        }),
      });

      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("Error al crear el tema");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const addExtraField = () => {
    setExtraFields([...extraFields, { text: "", textarea: "" }]);
  };

  const updateExtraField = (index, key, value) => {
    const updatedFields = [...extraFields];
    updatedFields[index][key] = value;
    setExtraFields(updatedFields);
  };

  const removeExtraField = (index) => {
    setExtraFields(extraFields.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg flex flex-col gap-6">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Agregar Tema</h1>

      {/* Input de fecha */}
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="border border-gray-300 px-4 py-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      {/* Input de título */}
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="border border-gray-300 px-4 py-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="Título del Tema"
      />

      {/* Input de descripción */}
      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className="border border-gray-300 px-4 py-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="Descripción del Tema"
      />

      {/* Extra Fields Dinámicos */}
      {extraFields.map((field, index) => (
        <div key={index} className="flex flex-col gap-4 mb-4">
          <input
            value={field.text}
            onChange={(e) => updateExtraField(index, "text", e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder={`Titulo ${index + 1}`}
          />
          <textarea
            value={field.textarea}
            onChange={(e) => updateExtraField(index, "textarea", e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`Texto ${index + 1}`}
          ></textarea>
          <button
            type="button"
            onClick={() => removeExtraField(index)}
            className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors"
          >
            Eliminar campo
          </button>
        </div>
      ))}

      {/* Botón para agregar extra fields */}
      <button
        type="button"
        onClick={addExtraField}
        className="bg-blue-600 text-white py-2 px-6 rounded-full mb-4 hover:bg-blue-700 transition-colors"
      >
        Agregar Tarjeta
      </button>

      {/* Botón para enviar */}
      <button type="submit" className="bg-green-600 text-white py-3 px-6 rounded-full w-full hover:bg-green-700 transition-colors">
        Agregar Tema
      </button>
    </form>
  );
}
