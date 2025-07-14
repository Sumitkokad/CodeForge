import subprocess
import tempfile
import os
import platform
import sqlite3
import threading
import os
import requests

def get_code_solution(prompt: str) -> dict:
    try:
        base_url = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")  
        response = requests.post(
            f'{base_url}/api/generate',
            json={"model": "phi", "prompt": prompt, "stream": False},
            timeout=1000
        )
        response.raise_for_status()
        data = response.json()
        return {"success": True, "response": data.get("response", "No response")}
    except requests.exceptions.RequestException as e:
        return {"success": False, "error": str(e)}
    except Exception as ex:
        return {"success": False, "error": f"Unexpected error: {str(ex)}"}
# end ollama 

def run_code_with_timeout(cmd, timeout=5, input_data=None):
    try:
        proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, stdin=subprocess.PIPE)
        timer = threading.Timer(timeout, proc.kill)
        try:
            timer.start()
            stdout, stderr = proc.communicate(input=input_data.encode() if input_data else None)
        finally:
            timer.cancel()
        return stdout.decode(), stderr.decode()
    except Exception as e:
        return "", str(e)

def execute_sql(code):
    conn = sqlite3.connect(":memory:")
    cursor = conn.cursor()
    output = ""
    try:
        statements = [stmt.strip() for stmt in code.strip().split(";") if stmt.strip()]
        for stmt in statements:
            try:
                cursor.execute(stmt)
                if stmt.lower().startswith("select"):
                    rows = cursor.fetchall()
                    output += "\n".join(str(row) for row in rows) + "\n"
                else:
                    output += f"Executed: {stmt}\n"
            except sqlite3.Error as e:
                output += f"Error in statement '{stmt}': {e}\n"
        conn.commit()
        return {"output": output.strip()}
    except Exception as e:
        return {"error": str(e)}
    finally:
        conn.close()

def execute_code(language, code, input_data=None):
    with tempfile.TemporaryDirectory() as tmpdir:
        file_path = os.path.join(tmpdir, "Main")
        ext_map = {"python": "py", "javascript": "js", "c": "c", "cpp": "cpp", "java": "java"}

        if language == "sql":
            return execute_sql(code)
        elif language not in ext_map:
            return {"error": "Unsupported language"}

        file_path += f".{ext_map[language]}"
        with open(file_path, "w") as f:
            f.write(code)

        try:
            if language == "python":
                python_cmd = "python" if platform.system() == "Windows" else "python3"
                cmd = [python_cmd, file_path]
            elif language == "javascript":
                cmd = ["node", file_path]
            elif language == "c":
                exe = os.path.join(tmpdir, "a.exe" if os.name == "nt" else "a.out")
                subprocess.run(["gcc", file_path, "-o", exe], check=True)
                cmd = [exe]
            elif language == "cpp":
                exe = os.path.join(tmpdir, "a.exe" if os.name == "nt" else "a.out")
                subprocess.run(["g++", file_path, "-o", exe], check=True)
                cmd = [exe]
            elif language == "java":
                subprocess.run(["javac", file_path], check=True)
                cmd = ["java", "-cp", tmpdir, "Main"]

            stdout, stderr = run_code_with_timeout(cmd, timeout=5, input_data=input_data)
            output = stdout.strip() or stderr.strip() or "No output"
            return {"output": output}
        except subprocess.CalledProcessError as e:
            return {"error": e.stderr.decode() if hasattr(e, 'stderr') and e.stderr else str(e)}
        except FileNotFoundError as e:
            return {"error": f"Command not found: {e}"}
        except Exception as e:
            return {"error": str(e)}




