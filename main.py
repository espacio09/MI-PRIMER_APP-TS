
# main.py
#___________________________________________________
# Bucle principal.
# Llama al menú y ejecuta la acción correspondiente.
# Aquí limpiamos la pantalla antes de mostrar el menú.
#
#
from utilidades import limpiar_pantalla
from menu import menu_interactivo, OPC_REGISTRAR, OPC_LISTAR, OPC_SALIR
from mascotas import cargar_datos, registrar_mascota, listar_mascotas

def main():
    mascotas = cargar_datos()

    while True:
        limpiar_pantalla()
        seleccion = menu_interactivo()

        if seleccion == OPC_REGISTRAR:
            registrar_mascota(mascotas)

        elif seleccion == OPC_LISTAR:
            listar_mascotas(mascotas)

        elif seleccion == OPC_SALIR:
            print("\nSaliendo del programa... ¡Hasta pronto! 👋")
            break

        else:
            print("\n⚠ Opción no válida. Intenta de nuevo.")
            input("Pulsa Enter para continuar...")

if __name__ == "__main__":
    main()

