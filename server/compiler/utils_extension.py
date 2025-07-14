def get_extension(language):
    ext_map = {
        "python": "py",
        "javascript": "js",
        "c": "c",
        "cpp": "cpp",
        "java": "java",
        "sql": "sql"
    }
    return ext_map.get(language.lower(), "")
