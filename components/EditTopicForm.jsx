"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditTopicForm({ id, date, title, description, extraFields: initialExtraFields }) {
  const [newDate, setNewDate] = useState(date ? date.split("T")[0] : "");
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [extraFields, setExtraFields] = useState(initialExtraFields || []);

  const router = useRouter();

  useEffect(() => {
    setExtraFields(initialExtraFields || []);
  }, [initialExtraFields]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!newDate || !newTitle || !newDescription || extraFields.some(field => !field.text || !field.textarea)) {
      alert("Todos los campos son obligatorios.");
      return;
    }
  
    try {
      const formattedExtraFields = extraFields.filter(field => field.text.trim() !== "" && field.textarea.trim() !== "");
  
      console.log("Datos enviados en PUT:", {
        newDate,
        newTitle,
        newDescription,
        newExtraFields: formattedExtraFields,
      });
  
      const res = await fetch(`/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          newDate,
          newTitle,
          newDescription,
          newExtraFields: formattedExtraFields,
        }),
      });
  
      if (!res.ok) {
        throw new Error("Failed to update topic");
      }
  
      router.refresh();
      router.push("/");
    } catch (error) {
      console.log("Error al actualizar:", error);
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
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Editar Tema</h1>
      
      <input
        type="date"
        value={newDate}
        onChange={(e) => setNewDate(e.target.value)}
        className="border border-gray-300 px-4 py-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      
      <input
        onChange={(e) => setNewTitle(e.target.value)}
        value={newTitle}
        className="border border-gray-300 px-4 py-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="Título del Tema"
      />
      
      <input
        onChange={(e) => setNewDescription(e.target.value)}
        value={newDescription}
        className="border border-gray-300 px-4 py-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="Descripción del Tema"
      />

      {extraFields.map((field, index) => (
        <div key={index} className="flex flex-col gap-4 mb-4">
          <input
            value={field.text}
            onChange={(e) => updateExtraField(index, "text", e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder={`Extra Field ${index + 1}`}
          />
          <textarea
            value={field.textarea}
            onChange={(e) => updateExtraField(index, "textarea", e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`Extra Textarea ${index + 1}`}
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

      <button
        type="button"
        onClick={addExtraField}
        className="bg-blue-600 text-white py-2 px-6 rounded-full mb-4 hover:bg-blue-700 transition-colors"
      >
        Agregar tarjeta
      </button>

      <button type="submit" className="bg-green-600 text-white py-3 px-6 rounded-full w-full hover:bg-green-700 transition-colors">
        Actualizar Tema
      </button>
    </form>
  );
}
