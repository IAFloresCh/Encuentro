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
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="date"
        value={newDate}
        onChange={(e) => setNewDate(e.target.value)}
        className="border border-slate-500 px-8 py-2"
        required
      />
      <input
        onChange={(e) => setNewTitle(e.target.value)}
        value={newTitle}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Título del Tema"
      />
      <input
        onChange={(e) => setNewDescription(e.target.value)}
        value={newDescription}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Descripción del Tema"
      />

      {extraFields.map((field, index) => (
        <div key={index} className="flex flex-col gap-2">
          <input
            value={field.text}
            onChange={(e) => updateExtraField(index, "text", e.target.value)}
            className="border border-slate-500 px-8 py-2"
            type="text"
            placeholder={`Extra Field ${index + 1}`}
          />
          <textarea
            value={field.textarea}
            onChange={(e) => updateExtraField(index, "textarea", e.target.value)}
            className="border border-slate-500 px-8 py-2"
            placeholder={`Extra Textarea ${index + 1}`}
          ></textarea>
          <button
            type="button"
            onClick={() => removeExtraField(index)}
            className="bg-red-600 text-white px-3 py-2"
          >
            X
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addExtraField}
        className="bg-blue-600 font-bold text-white py-2 px-4 w-fit"
      >
        Agregar tarjeta
      </button>

      <button type="submit" className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
        Actualizar Tema
      </button>
    </form>
  );
}
