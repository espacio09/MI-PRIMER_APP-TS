import json
import os
import msvcrt
from simple_term_menu import TerminalMenu


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


## sistema para limpiar la pantalla (funciona en Windows y Unix)
# =====================
# 🔄 LIMPIAR PANTALLA
# =====================
def limpiar_pantalla():
    print("\033c", end="")


# =====================
# 🎮 MENÚ INTERACTIVO   
# ===================== 


def menu_interactivo(opciones):
    indice = 0

    while True:
        limpiar_pantalla()
        print(BOLD + CYAN + "===== GESTOR DE MASCOTAS =====" + RESET)
        print("Usa ↑ ↓ y ENTER para seleccionar:\n")

        for i, opcion in enumerate(opciones):
            if i == indice:
                print(GREEN + f"> {opcion}" + RESET)
            else:
                print(f"  {opcion}")

        # Esperar tecla
        tecla = msvcrt.getch()

        # Flechas: empiezan con 224
        if tecla == b'\xe0':
            flecha = msvcrt.getch()

            # Flecha arriba
            if flecha == b'H':
                indice = (indice - 1) % len(opciones)

            # Flecha abajo
            elif flecha == b'P':
                indice = (indice + 1) % len(opciones)

        # ENTER
        elif tecla == b'\r':
            return indice



# ------------------------------
# Cargar datos al iniciar
# ------------------------------
def main():
    mascotas = cargar_datos()

    opciones = [
        "Registrar nueva mascota", 
        "Listar mascotas", 
        "Salir"
        ]
    
    while True:
        indice = menu_interactivo(opciones)
        if indice == 0:
            registrar_mascota(mascotas)
        elif indice == 1:
            listar_mascotas(mascotas)
        elif indice == 2:
            print("Saliendo del programa...")
            break


def cargar_datos():
    if os.path.exists(ARCHIVO):
        with open(ARCHIVO, "r", encoding="utf-8") as f:
            return json.load(f)
    return []


# ------------------------------
# Guardar datos en JSON
# ------------------------------
def guardar_datos(mascotas):
    with open(ARCHIVO, "w", encoding="utf-8") as f:
        json.dump(mascotas, f, ensure_ascii=False, indent=4)


# ------------------------------
# Función auxiliar para cortar texto
# ------------------------------
def cortar(texto, longitud):
    """Trunca un texto a una longitud máxima"""
    texto_str = str(texto)
    if len(texto_str) > longitud:
        return texto_str[:longitud - 3] + "..."
    return texto_str


# ------------------------------
# Registrar una nueva mascota
# ------------------------------
def registrar_mascota(mascotas):
    
    limpiar_pantalla()
    print(BOLD + CYAN + "\n--- Registrar nueva mascota ---\n" + RESET)

    print("\n--- Registrar nueva mascota ---")
    nombre = input("Nombre: ")
    especie = input("Especie (perro, gato…): ")
    edad = int(input("Edad: "))
    sexo = input("Sexo (macho / hembra): ")
    dueno = input("Nombre del dueño: ")

    print("Introduce las vacunas separadas por coma (ej: rabia, parvo):")
    vacunas_input = input("Vacunas: ")
    vacunas = [v.strip() for v in vacunas_input.split(",")] if vacunas_input else []

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


# ------------------------------
# Listar mascotas
# ------------------------------


def listar_mascotas(mascotas):
    limpiar_pantalla()

    if not mascotas:
        
        print(RED + "\n🚫 No hay mascotas registradas.\n" + RESET)
        input("Presiona ENTER para volver...")
        return
    
    total: int = len(mascotas)

    print(BOLD + MAGENTA + "🐾 LISTA DE MASCOTAS 🐾\n" + RESET)
    print("=" * 90)


 # ------    Cabecera de tabla
    print(
        f"{BOLD}{'N°':3} {'NOMBRE':15}{'ESPECIE':15}{'EDAD':5}"
        f"{'SEXO':10}{'DUEÑO':15}{'VACUNAS':15}{RESET}"
    )
    print("-" * 90)

# ------    Filas
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




# ------------------------------
# Menú interactivo
# ------------------------------
def mostrar_menu():
    print("===== GESTOR DE MASCOTAS =====")
    print("1. Registrar nueva mascota")
    print("2. Listar mascotas")
    print("3. Salir")
    return input("Elige una opción: ")


# ------------------------------
# Programa principal
# ------------------------------
def main():
    mascotas = cargar_datos()

    while True:
        opcion = mostrar_menu()
        if opcion == "1":
            registrar_mascota(mascotas)
        elif opcion == "2":
            listar_mascotas(mascotas)
        elif opcion == "3":
            print("Saliendo del programa...")
            break
        else:
            print("Opción no válida. Intenta de nuevo.")

# -------------   Punto de entrada del programa
if __name__ == "__main__":
    main()

