export default async function handler(req, res) {
    if (req.method === "PATCH") {
      console.log("Request received:", req.body); // Depuración
      console.log(req.headers.authorization)
      try {
        const response = await fetch("http://localhost:9090/users/update", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: req.headers.authorization || "",
          },
          body: JSON.stringify(req.body),
        });
  
        if (!response.ok) {
          const error = await response.json();
          console.error("Backend error:", error); // Depuración
          return res.status(response.status).json({ error });
        }
  
        const data = await response.json();
        console.log("Backend response:", data); // Depuración
        res.status(200).json(data);
      } catch (error) {
        console.error("Server error:", error); // Depuración
        res.status(500).json({ error: "Error interno del servidor" });
      }
    } else {
      res.setHeader("Allow", ["PATCH"]);
      res.status(405).json({ error: `Método ${req.method} no permitido` });
    }
  }
  