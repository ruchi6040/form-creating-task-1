import React, { useState, useEffect } from "react";
import axios from "axios";

const FormPreview = ({ formId }) => {
    const [form, setForm] = useState(null);

    useEffect(() => {
        const fetchForm = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/forms/${formId}`);
                setForm(response.data);
            } catch (error) {
                console.error("Error fetching form:", error);
            }
        };
        fetchForm();
    }, [formId]);

    if (!form) return <div>Loading...</div>;

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">{form.title}</h1>
            {form.headerImage && <img src={form.headerImage} alt="Header" className="my-4" />}
            {form.questions.map((question, index) => (
                <div key={index} className="mt-4">
                    <h2 className="text-lg font-semibold">{question.question}</h2>
                    {question.image && <img src={question.image} alt="Question" className="my-2" />}
                    {question.type === "Categorize" && <p>Type: Categorize</p>}
                    {question.type === "Cloze" && <p>Type: Cloze</p>}
                    {question.type === "Comprehension" && <p>Type: Comprehension</p>}
                </div>
            ))}
        </div>
    );
};

export default FormPreview;
