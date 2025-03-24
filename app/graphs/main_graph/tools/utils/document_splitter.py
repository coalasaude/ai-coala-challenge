from langchain.text_splitter import RecursiveCharacterTextSplitter


def document_splitter(file_path: str):
    with open(file_path, "r", encoding="utf-8") as f:
        full_text = f.read()

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50,
        separators=["#", "##", "###", "<br/>"],
    )

    chunks = splitter.split_text(full_text)

    return chunks
