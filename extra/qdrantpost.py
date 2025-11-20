import requests
import os

# --- ⚙️ CONFIGURATION ---
# The webhook URL has been filled in for you from our conversation.
WEBHOOK_URL = "https://honeywell232435643524.app.n8n.cloud/webhook/96ba3649-243e-4686-bc88-b14ceb5100ef"

# ❗ ACTION REQUIRED: Update this with the full path to YOUR PDF file.
#    Example for Mac/Linux: "/Users/yourname/Documents/research_paper.pdf"
#    Example for Windows: "C:\\Users\\yourname\\Documents\\research_paper.pdf"
PDF_FILE_PATH = "sridhar.pdf"
# --- END CONFIGURATION ---


def upload_pdf(url, file_path):
    """
    Sends a PDF file to the specified webhook URL.
    """
    # First, check if the file actually exists
    if not os.path.exists(file_path):
        print(f"❌ Error: File not found. Please double-check the path: '{file_path}'")
        return

    # The key 'data' is what n8n's Webhook node expects for binary files
    file_name = os.path.basename(file_path)
    files = {'data': (file_name, open(file_path, 'rb'), 'application/pdf')}

    print(f"🚀 Uploading '{file_name}' to your workflow...")

    try:
        # Make the POST request with the file and a 60-second timeout
        response = requests.post(url, files=files, timeout=60)
        
        # Raise an exception if the request returned an HTTP error (e.g., 404, 500)
        response.raise_for_status()

        print("✅ Success! Your workflow has received the file.")
        print("Response from webhook:", response.text)

    except requests.exceptions.RequestException as e:
        print(f"❌ An error occurred during the request: {e}")
    finally:
        # Ensure the file is closed after the request is complete
        if 'data' in files:
            files['data'][1].close()


if __name__ == "__main__":
    # A simple check to ensure the user has configured the script
    if "/path/to/your/document.pdf" in PDF_FILE_PATH:
        print("👋 Please open the script and update the PDF_FILE_PATH variable before running.")
    else:
        upload_pdf(WEBHOOK_URL, PDF_FILE_PATH)