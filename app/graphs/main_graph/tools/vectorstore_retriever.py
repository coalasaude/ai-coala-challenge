from pathlib import Path
from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.tools.retriever import create_retriever_tool
from langchain_core.documents import Document

from graphs.main_graph.tools.utils.document_splitter import document_splitter

# Global cache
retriever_tool = None


def retriever_tool_builder():
    global retriever_tool
    if retriever_tool is not None:
        return retriever_tool

    current_dir = Path(__file__).parent
    root_dir = current_dir.parent.parent.parent
    docs_dir = root_dir / "docs"
    persist_dir = root_dir / "chroma_db"
    persist_dir.mkdir(exist_ok=True)

    model_kwargs = {"device": "cpu"}
    embeddings = HuggingFaceEmbeddings(model_kwargs=model_kwargs)

    if list(persist_dir.glob("*")):
        vectorstore = Chroma(
            persist_directory=str(persist_dir),
            embedding_function=embeddings,
            collection_name="coala_twenty_crm",
        )
    else:
        business_info_file_path = docs_dir / "business_info.md"
        business_info_chunks = document_splitter(business_info_file_path)
        business_info_docs_with_metadata = [
            Document(
                page_content=chunk,
                metadata={
                    "source": "business_info.md",
                    "info": "Coala Twenty CRM Business Information",
                },
            )
            for chunk in business_info_chunks
        ]

        vectorstore = Chroma.from_documents(
            documents=business_info_docs_with_metadata,
            embedding=embeddings,
            collection_name="coala_twenty_crm",
            persist_directory=str(persist_dir),
        )

    vectorstore_retriever = vectorstore.as_retriever()
    retriever_tool = create_retriever_tool(
        retriever=vectorstore_retriever,
        name="retriever_tool",
        description="Busca e Retorna informacoes sobre como a estrutura do Twenty CRM da empresa Coala funciona.",
    )
    return retriever_tool
