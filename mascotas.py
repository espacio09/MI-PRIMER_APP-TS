import json
import os


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




# ------------------------------
# Cargar datos al iniciar
# ------------------------------
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
# Registrar una nueva mascota
# ------------------------------
def registrar_mascota(mascotas):
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
    print(f"\nMascota '{nombre}' registrada correctamente.\n")


# ------------------------------
# Listar mascotas
# ------------------------------


def listar_mascotas(mascotas):
    limpiar_pantalla()

    if not mascotas:
        print("\n🚫 No hay mascotas registradas.\n")
        return

    print("\n🐾  LISTA DE MASCOTAS  🐾")
    print("=" * 40)

   
    for i, m in enumerate(mascotas, 1):
        print(f"\nMascota #{i}")
        print("-" * 40)
        print(f"Nombre : {m['nombre']}")
        print(f"Especie: {m['especie']}")
        print(f"Edad   : {m['edad']} años")
        print(f"Sexo   : {m['sexo']}")
        print(f"Dueño  : {m['dueno']}")
        print(f"Vacunas: {', '.join(m['vacunas']) if m['vacunas'] else 'Ninguna'}")

    print("\n" + "=" * 40 + "\n")

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


if __name__ == "__main__":
    main()

