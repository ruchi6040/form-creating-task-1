import React, { useState, useEffect } from "react";
import axios from "axios";

const FormFill = ({ formId }) => {
    const [form, setForm] = useState(null);
    const [responses, setResponses] = useState([]);

    useEffect(() => {
        const fetchForm = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/forms/${formId}`);
                setForm(response.data);
                setResponses(response.data.questions.map(() => ""));
            } catch (error) {
                console.error("Error fetching form:", error);
            }
        };
        fetchForm();
    }, [formId]);

    const handleSubmit = async () => {
        try {
            const responsePayload = {
                userId: "user123", // Replace with actual user ID if needed
                answers: responses.map((answer, index) => ({
                    questionId: form.questions[index]._id,
                    answer,
                })),
            };
            await axios.post(`http://localhost:5000/api/forms/${formId}/submit`, responsePayload);
            alert("Form submitted successfully!");
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    if (!form) return <div>Loading...</div>;

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">{form.title}</h1>
            {form.headerImage && <img src={form.headerImage} alt="Header" className="my-4" />}
            {form.questions.map((question, index) => (
                <div key={index} className="mt-4">
                    <h2 className="text-lg font-semibold">{question.question}</h2>
                    {question.image && <img src={question.image} alt="Question" className="my-2" />}
                    <input
                        type="text"
                        placeholder="Your Answer"
                        value={responses[index]}
                        onChange={(e) => {
                            const updatedResponses = [...responses];
                            updatedResponses[index] = e.target.value;
                            setResponses(updatedResponses);
                        }}
                        className="border p-2 w-full"
                    />
                </div>
            ))}
            <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 mt-4">
                Submit
            </button>
        </div>
    );
};

export default FormFill;
