import json
import os
from InquirerPy import inquirer

# =====================
# 🎨 COLORES ANSI
# =====================
RESET = "\033[0m"
BOLD = "\033[1m"
CYAN = "\033[36m"
YELLOW = "\033[33m"
GREEN = "\033[32m"
MAGENTA = "\033[35m"
BLUE = "\033[34m"
RED = "\033[31m"

ARCHIVO = "datos.json"

# =====================
# 🔄 LIMPIAR PANTALLA
# =====================
def limpiar_pantalla():
    print("\033c", end="")

# =====================
# 📁 CARGAR DATOS
# =====================
def cargar_datos():
    if os.path.exists(ARCHIVO):
        with open(ARCHIVO, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

# =====================
# 💾 GUARDAR DATOS
# =====================
def guardar_datos(mascotas):
    with open(ARCHIVO, "w", encoding="utf-8") as f:
        json.dump(mascotas, f, ensure_ascii=False, indent=4)

# =====================
# ✂️ UTIL: Cortar texto largo
# =====================
def cortar(texto, max_len):
    return texto[:max_len-3] + "..." if len(texto) > max_len else texto

# =====================
# 🐶 REGISTRAR MASCOTA
# =====================
def registrar_mascota(mascotas):
    limpiar_pantalla()
    print(BOLD + CYAN + "\n--- Registrar nueva mascota ---\n" + RESET)

    nombre = inquirer.text(message="Nombre:").execute()
    especie = inquirer.text(message="Especie:").execute()
    edad = int(inquirer.text(message="Edad:").execute())
    sexo = inquirer.select(message="Sexo:", choices=["macho", "hembra"]).execute()
    dueno = inquirer.text(message="Dueño:").execute()

    vacunas = inquirer.checkbox(
        message="Selecciona vacunas:",
        choices=["Rabia", "Parvo", "Moquillo", "Leptospirosis", "Ninguna"]
    ).execute()

    if "Ninguna" in vacunas:
        vacunas = []

    mascota = {
        "nombre": nombre,
        "especie": especie,
        "edad": edad,
        "sexo": sexo,
        "dueno": dueno,
        "vacunas": vacunas
    }

    mascotas.append(mascota)
    guardar_datos(mascotas)

    print(GREEN + "\nMascota registrada correctamente.\n" + RESET)
    input("Presiona ENTER para volver al menú...")

# =====================
# 📊 LISTAR MASCOTAS
# =====================
def listar_mascotas(mascotas):
    limpiar_pantalla()

    if not mascotas:
        print(RED + "\n🚫 No hay mascotas registradas.\n" + RESET)
        input("Presiona ENTER para volver...")
        return

    total = len(mascotas)

    print(BOLD + MAGENTA + f"🐾 LISTA DE MASCOTAS — Total: {total}\n" + RESET)
    print("=" * 90)

    print(
        f"{BOLD}{'N°':3} {'NOMBRE':15}{'ESPECIE':15}{'EDAD':5}"
        f"{'SEXO':10}{'DUEÑO':15}{'VACUNAS':15}{RESET}"
    )
    print("-" * 90)

    for i, m in enumerate(mascotas, 1):
        vacunas = ", ".join(m["vacunas"]) if m["vacunas"] else "Ninguna"
        nombre = cortar(m["nombre"], 15)
        especie = cortar(m["especie"], 15)
        dueno = cortar(m["dueno"], 15)
        vacc = cortar(vacunas, 15)

        print(
            f"{i:<3} {nombre:15}{especie:15}{str(m['edad']):5}"
            f"{m['sexo']:10}{dueno:15}{vacc:15}"
        )

    print("=" * 90 + "\n")
    input("Presiona ENTER para volver al menú...")

# =====================
# 🎯 MENÚ PRINCIPAL (INQUIRERPY)
# =====================
def menu_interactivo():
    opcion = inquirer.select(
        message="GESTOR DE MASCOTAS 🐾",
        choices=[
            "🐶 Registrar nueva mascota",
            "📋 Listar mascotas",
            "❌ Salir"
        ],
    ).execute()

    return opcion

# =====================
# ▶️ PROGRAMA PRINCIPAL
# =====================
def main():
    mascotas = cargar_datos()

    while True:
        limpiar_pantalla()
        seleccion = menu_interactivo()

        if seleccion == "🐶 Registrar nueva mascota":
            registrar_mascota(mascotas)

        elif seleccion == "📋 Listar mascotas":
            listar_mascotas(mascotas)

        elif seleccion == "❌ Salir":
            print("\nSaliendo del programa...")
            break

# =====================
# 🔌 ARRANQUE DEL PROGRAMA
# =====================
if __name__ == "__main__":
    main()

    