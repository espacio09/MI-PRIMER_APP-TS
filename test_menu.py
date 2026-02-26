
from simple_term_menu import TerminalMenu

opciones = ["Uno", "Dos", "Tres"]

menu = TerminalMenu(opciones)
seleccion = menu.show()

print("Elegiste:", seleccion)

