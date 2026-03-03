
# utilidades.py

# Limpia la pantalla de forma compatible (Windows/macOS/Linux).
# Normaliza/limpia cadenas.
# Pausa la consola para que puedas leer mensajes.

import subprocess
import unicodedata
import platform

def normaliza_opcion(s: str) -> str:
    """Normaliza Unicode, recorta y colapsa espacios internos."""
    if s is None:
        return ""
    s = unicodedata.normalize("NFC", s)  # evita diferencias de Unicode
    s = s.strip()                        # quita espacios al inicio/fin y saltos de línea
    s = " ".join(s.split())              # colapsa múltiples espacios internos
    return s




def limpiar_pantalla():
    """Limpia la consola de forma compatible con Windows, macOS y Linux."""
    comando = "cls" if platform.system() == "Windows" else "clear"
    # subprocess es más moderno y suele dar menos avisos que os.system
    subprocess.call(comando, shell=True)

def pausar(msg: str = "\nPulsa Enter para continuar..."):
    try:
        input(msg)
    except EOFError:
        # Por si se ejecuta en algún entorno sin stdin interactivo
        pass
