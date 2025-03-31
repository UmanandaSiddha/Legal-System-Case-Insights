from flask import Flask, request, jsonify
from pdf2image import convert_from_bytes
import os
import pathlib
import PIL.Image as Image
import google.generativeai as genai
import io
from flask_cors import CORS 

app = Flask(__name__)
CORS(app) 
UPLOAD_FOLDER = "converted_pdfs"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

genai.configure(api_key="AIzaSyCnwSeY-bQ7oGRzGjPJk9ByEyIVs8ERuWE")
model = genai.GenerativeModel("gemini-1.5-flash")

@app.route("/upload-pdf", methods=["POST"])
def upload_pdf():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    if not file.filename.lower().endswith(".pdf"):
        return jsonify({"error": "Invalid file type. Only PDFs allowed."}), 400

    pdf_name = os.path.splitext(file.filename)[0]
    save_dir = os.path.join(UPLOAD_FOLDER, pdf_name)
    os.makedirs(save_dir, exist_ok=True)

    try:
        images = convert_from_bytes(file.read())
        gemini_parts = []

        for i, image in enumerate(images):
            image_path = os.path.join(save_dir, f"page_{i + 1}.jpg")
            image.save(image_path, "JPEG")

            # Open as PIL.Image for Gemini
            with open(image_path, "rb") as img_file:
                pil_img = Image.open(io.BytesIO(img_file.read()))
                pil_img.load()  # Ensure image is fully loaded
                gemini_parts.append(pil_img)

        prompt = "Create a summary of the all the images. All the images are related to one another so the sumamry would be like one big document with all the images combined. The images are legal documents."
        response = model.generate_content([prompt] + gemini_parts)

        return jsonify({
            "message": f"{len(images)} pages saved in {save_dir}",
            "gemini_response": response.text
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)