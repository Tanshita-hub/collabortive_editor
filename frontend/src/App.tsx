import { useEffect, useState } from "react";

function App() {

    const [message, setMessage] = useState("");

    useEffect(() => {

        const params = new URLSearchParams(window.location.search);
        const status = params.get("status");

        if (status === "created") {
            setMessage("Account created successfully!");
        }

        if (status === "login") {
            setMessage("Login successful!");
        }

    }, []);

    const handleGoogleLogin = () => {
        window.location.href =
            "http://localhost:8080/oauth2/authorization/google";
    };

    return (
        <div>
            <h1>Collaborative Editor</h1>

            {!message ? (
                <>
                    <h2>Login</h2>

                    <button onClick={handleGoogleLogin}>
                        Continue with Google
                    </button>
                </>
            ) : (
                <>
                    <h2>{message}</h2>

                    <p>Welcome to Collaborative Editor!</p>
                </>
            )}
        </div>
    );
}

export default App;