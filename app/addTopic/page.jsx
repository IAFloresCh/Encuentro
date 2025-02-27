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
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {/* Input de fecha */}
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="border border-slate-500 px-8 py-2"
        required
      />

      {/* Input de título */}
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Título del Tema"
      />

      {/* Input de descripción */}
      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Descripción del Tema"
      />

      {/* Extra Fields Dinámicos */}
      {extraFields.map((field, index) => (
        <div key={index} className="flex flex-col gap-2">
          <input
            value={field.text}
            onChange={(e) => updateExtraField(index, "text", e.target.value)}
            className="border border-slate-500 px-8 py-2"
            type="text"
            placeholder={`Titulo ${index + 1}`}
          />
          <textarea
            value={field.textarea}
            onChange={(e) => updateExtraField(index, "textarea", e.target.value)}
            className="border border-slate-500 px-8 py-2"
            placeholder={`Texto ${index + 1}`}
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

      {/* Botón para agregar extra fields */}
      <button
        type="button"
        onClick={addExtraField}
        className="bg-blue-600 font-bold text-white py-2 px-4 w-fit"
      >
        Agregar Tarjeta
      </button>

      {/* Botón para enviar */}
      <button type="submit" className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
        Agregar Tema
      </button>
    </form>
  );
}
