
# menu.py

# Muestra un menú bonito con emojis.
# Devuelve claves internas estables (no el texto con emoji),
# #  para evitar problemas por espacios/acentos.


from utilidades import normaliza_texto

# Claves internas (estables)
OPC_REGISTRAR = "REGISTRAR"
OPC_LISTAR    = "LISTAR"
OPC_SALIR     = "SALIR"

def menu_interactivo() -> str:
    """Muestra el menú y devuelve una clave interna de opción."""
    print("=======================================")
    print("   🐾  Registro de Mascotas  🐾")
    print("=======================================")
    print("1) 🐶 Registrar nueva mascota")
    print("2) 📋 Listar mascotas")
    print("0) ❌ Salir")
    print("---------------------------------------")
    op = input("Elige una opción (0-2): ")

    # Limpieza básica por si hay espacios o saltos
    op = normaliza_texto(op)

    mapa = {
        "1": OPC_REGISTRAR,
        "2": OPC_LISTAR,
        "0": OPC_SALIR,
    }
    return mapa.get(op, "")  # "" para opción no válida
