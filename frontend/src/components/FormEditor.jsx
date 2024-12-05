import React, { useState } from "react";
import axios from "axios";

const FormEditor = () => {
    const [form, setForm] = useState({ title: "", headerImage: "", questions: [] });

    const addQuestion = (type) => {
        const newQuestion = { type, question: "", options: [], image: "" };
        setForm({ ...form, questions: [...form.questions, newQuestion] });
    };

    const handleInputChange = (index, key, value) => {
        const updatedQuestions = [...form.questions];
        updatedQuestions[index][key] = value;
        setForm({ ...form, questions: updatedQuestions });
    };

    const saveForm = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/forms/create", form);
            alert("Form saved successfully!");
            console.log(response.data);
        } catch (error) {
            console.error("Error saving form:", error);
        }
    };

    return (
        <div className="p-4">
            <input
                type="text"
                placeholder="Form Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="border p-2 mb-4 w-full"
            />
            <input
                type="text"
                placeholder="Header Image URL"
                value={form.headerImage}
                onChange={(e) => setForm({ ...form, headerImage: e.target.value })}
                className="border p-2 mb-4 w-full"
            />
            <div>
                <button
                    onClick={() => addQuestion("Categorize")}
                    className="bg-blue-500 text-white px-4 py-2 mr-2"
                >
                    Add Categorize Question
                </button>
                <button
                    onClick={() => addQuestion("Cloze")}
                    className="bg-green-500 text-white px-4 py-2 mr-2"
                >
                    Add Cloze Question
                </button>
                <button
                    onClick={() => addQuestion("Comprehension")}
                    className="bg-purple-500 text-white px-4 py-2"
                >
                    Add Comprehension Question
                </button>
            </div>
            {form.questions.map((question, index) => (
                <div key={index} className="mt-4 border p-4">
                    <select
                        value={question.type}
                        onChange={(e) => handleInputChange(index, "type", e.target.value)}
                        className="border p-2 w-full"
                    >
                        <option value="Categorize">Categorize</option>
                        <option value="Cloze">Cloze</option>
                        <option value="Comprehension">Comprehension</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Question Text"
                        value={question.question}
                        onChange={(e) => handleInputChange(index, "question", e.target.value)}
                        className="border p-2 w-full mt-2"
                    />
                    <input
                        type="text"
                        placeholder="Image URL (Optional)"
                        value={question.image}
                        onChange={(e) => handleInputChange(index, "image", e.target.value)}
                        className="border p-2 w-full mt-2"
                    />
                </div>
            ))}
            <button onClick={saveForm} className="bg-green-600 text-white px-4 py-2 mt-4">
                Save Form
            </button>
        </div>
    );
};

export default FormEditor;

