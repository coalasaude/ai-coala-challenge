import unicodedata


def normalize_string(s: str) -> str:
    # Normalize the string to NFD (decomposed) form and remove accents
    return (
        unicodedata.normalize("NFD", s)
        .encode("ascii", "ignore")
        .decode("ascii")
        .lower()
    )
