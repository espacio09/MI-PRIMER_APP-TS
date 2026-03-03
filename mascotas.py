
# mascotas.py

# Carga/guarda datos en datos/mascotas.json.
# Registrar una mascota (pide datos por consola).
# Listar mascotas (tabla simple).

from pathlib import Path
from datetime import datetime
import json
import uuid

from utilidades import normaliza_texto, pausar

DATA_DIR = Path("datos")
DATA_FILE = DATA_DIR / "mascotas.json"

# -----------------------------
# Persistencia de datos
# -----------------------------
def _asegurar_directorio():
    DATA_DIR.mkdir(parents=True, exist_ok=True)

def cargar_datos() -> list[dict]:
    """Devuelve la lista de mascotas desde JSON. Si no existe, devuelve []."""
    _asegurar_directorio()
    if DATA_FILE.exists():
        try:
            with open(DATA_FILE, "r", encoding="utf-8") as f:
                data = json.load(f)
                if isinstance(data, list):
                    return data
        except json.JSONDecodeError:
            # Archivo corrupto o vacío → reiniciar
            pass
    return []

def guardar_datos(mascotas: list[dict]) -> None:
    """Guarda la lista de mascotas en JSON."""
    _asegurar_directorio()
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(mascotas, f, ensure_ascii=False, indent=2)

# -----------------------------
# Operaciones
# -----------------------------
def registrar_mascota(mascotas: list[dict]) -> None:
    """Pide datos por consola, añade la mascota y guarda."""
    print("\n--- Registrar nueva mascota ---")
    nombre = normaliza_texto(input("Nombre: "))
    especie = normaliza_texto(input("Especie (perro, gato, etc.): "))
    duenio = normaliza_texto(input("Nombre del dueño/a: "))

    # Edad como entero (con validación básica)
    while True:
        edad_str = normaliza_texto(input("Edad (en años, número): "))
        if edad_str.isdigit():
            edad = int(edad_str)
            break
        print("⚠ Introduce un número entero válido para la edad.")

    registro = {
        "id": str(uuid.uuid4()),
        "nombre": nombre,
        "especie": especie,
        "edad": edad,
        "duenio": duenio,
        "fecha_registro": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
    }

    mascotas.append(registro)
    guardar_datos(mascotas)
    print("\n✅ Mascota registrada correctamente.")
    pausar()

def listar_mascotas(mascotas: list[dict]) -> None:
    """Muestra un listado en forma de tabla simple."""
    print("\n--- Listado de mascotas ---")
    if not mascotas:
        print("No hay mascotas registradas todavía.")
        pausar()
        return

    # Calcular anchos para columnas (estético)
    cols = ["#", "Nombre", "Especie", "Edad", "Dueño/a", "Registro"]
    filas = []
    for i, m in enumerate(mascotas, start=1):
        filas.append([
            str(i),
            m.get("nombre", ""),
            m.get("especie", ""),
            str(m.get("edad", "")),
            m.get("duenio", ""),
            m.get("fecha_registro", ""),
        ])

    # Ancho por columna
    anchos = [len(c) for c in cols]
    for fila in filas:
        for idx, celda in enumerate(fila):
            anchos[idx] = max(anchos[idx], len(celda))

    # Función para formatear una fila
    def fmt(fila):
        return " | ".join(celda.ljust(anchos[idx]) for idx, celda in enumerate(fila))

    # Encabezado
    print(fmt(cols))
    print("-" * (sum(anchos) + 3 * (len(cols) - 1)))

    # Cuerpo
    for fila in filas:
        print(fmt(fila))

    pausar()
