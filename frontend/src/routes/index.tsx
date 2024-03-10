import { useState, useMemo, useEffect, useRef } from "react";
import { App } from "../App";
import "../validate.css";
import "../App.css";

export default function validate() {
    async function validateCode() {
        console.log("Validating code...");
        window.location.href = '/chat';
    }

    return (
        <App title="Validate code">
            <div className="background-image"></div>
            <div className="divconteiner">
                <div className="py-5 mr-20 w-full">
                    <center>
                        <h1 className="text-2xl font-bold mb-1">Ingrese su código</h1>
                    </center>
                </div>
                <div className="d-flex mb-3">
                    <section className="bg-gray-100 rounded-lg p-1">
                        <input
                            type="text"
                            maxLength={7}
                            className="w-full rounded-l-lg p-2 outline-none"
                            placeholder={"Codigo..."}
                        />
                    </section>
                </div>
                <div className="d-flex mb-3">
                    <button style={{ width: "100%" }} className="bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => validateCode()}>Verificar Codigo</button>
                </div>
            </div>
        </App>
    )
}