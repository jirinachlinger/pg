def je_tah_mozny(figurka, cilova_pozice, obsazene_pozice):

    pozice = figurka["pozice"]
    x,y = pozice
    cil_x, cil_y = cilova_pozice
    #pesec
    if cilova_pozice in obsazene_pozice:
        return False 
    
    if figurka["typ"] == "pěšec":
        if y == cil_y:
            if cil_x == x + 1:  # Tah o jedno pole dopředu
                return True
        elif x == 2 and cil_x == x + 2:  # Tah o dvě pole dopředu z výchozí pozice
            return True
        
    #jezdec
    elif figurka["typ"] == "jezdec":
        # Zkontroluje tah pro jezdce (možnosti: 2+1)
        if (abs(cil_x - x) == 2 and abs(cil_y - y) == 1) or (abs(cil_x - x) == 1 and abs(cil_y - y) == 2):
            return True

    #vez
    elif figurka["typ"] == "věž":
        # Zkontroluj tah pro věž
        if cil_x == x:  # Pohyb vertikálně
            for vy in range(min(y, cil_y) + 1, max(y, cil_y)):
                if (x, vy) in obsazene_pozice:  # Kontrola obsazení polí
                    return False
            return True
        elif cil_y == y:  # Pohyb horizontálně
            for vx in range(min(x, cil_x) + 1, max(x, cil_x)):
                if (vx, y) in obsazene_pozice:  # Kontrola obsazení polí
                    return False
            return True
    #strelec
    elif figurka["typ"] == "střelec":
        # Zkontroluj tah pro střelce (diagonálně)
        if abs(cil_x - x) == abs(cil_y - y):  # Kontrola diagonálního pohybu
            step_x = 1 if cil_x > x else -1
            step_y = 1 if cil_y > y else -1
            current_x, current_y = x + step_x, y + step_y
            
            while (current_x, current_y) != (cil_x, cil_y):
                if (current_x, current_y) in obsazene_pozice:  # Kontrola obsazení polí
                    return False
                current_x += step_x
                current_y += step_y
            return True
    #dama
    elif figurka["typ"] == "dáma":
        # Zkontroluj tah pro dámu (kombinace věže a střelce)
        if cil_x == x:  # Pohyb vertikálně
            for vy in range(min(y, cil_y) + 1, max(y, cil_y)):
                if (x, vy) in obsazene_pozice:
                    return False
            return True
        elif cil_y == y:  # horizontálně
            for vx in range(min(x, cil_x) + 1, max(x, cil_x)):
                if (vx, y) in obsazene_pozice:
                    return False
            return True
        elif abs(cil_x - x) == abs(cil_y - y):  # diagonálně
            step_x = 1 if cil_x > x else -1
            step_y = 1 if cil_y > y else -1
            current_x, current_y = x + step_x, y + step_y
            
            while (current_x, current_y) != (cil_x, cil_y):
                if (current_x, current_y) in obsazene_pozice:
                    return False
                current_x += step_x
                current_y += step_y
            return True
    #kral 
    if max(abs(cil_x - x), abs(cil_y - y)) == 1:
            return True
    return False


    
    
    
if __name__ == "__main__":
    pesec = {"typ": "pěšec", "pozice": (2, 2)}
    jezdec = {"typ": "jezdec", "pozice": (3, 3)}
    vez = {"typ": "věž", "pozice": (8, 8)}
    strelec = {"typ": "střelec", "pozice": (6, 3)}
    dama = {"typ": "dáma", "pozice": (8, 3)}
    kral = {"typ": "král", "pozice": (1, 4)}
    obsazene_pozice = {(2, 2), (8, 2), (3, 3), (5, 4), (8, 3), (8, 8), (6, 3), (1, 4)}

    
    print(je_tah_mozny(pesec, (3, 2), obsazene_pozice))  # True
    print(je_tah_mozny(jezdec, (1, 2), obsazene_pozice)) # True
    print(je_tah_mozny(vez, (8, 5), obsazene_pozice))  # True
    print(je_tah_mozny(strelec, (5, 4), obsazene_pozice))  # False
    print(je_tah_mozny(strelec, (7, 2), obsazene_pozice))  # True
    print(je_tah_mozny(dama, (8, 4), obsazene_pozice))  # True
    print(je_tah_mozny(dama, (7, 2), obsazene_pozice))  # True
    print(je_tah_mozny(dama, (8, 2), obsazene_pozice))  # False 
    print(je_tah_mozny(kral, (1, 5), obsazene_pozice))  # True
    print(je_tah_mozny(kral, (2, 4), obsazene_pozice))  # True
    print(je_tah_mozny(kral, (1, 6), obsazene_pozice))  # False 